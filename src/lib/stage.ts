import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { ao } from 'three/addons/tsl/display/GTAONode.js'
import {
  distance,
  pass,
  rand,
  screenUV,
  smoothstep,
  time,
  vec3,
  vec4,
} from 'three/tsl'
import {
  ACESFilmicToneMapping,
  DirectionalLight,
  Group,
  Mesh,
  type MeshStandardMaterial,
  type Node,
  PerspectiveCamera,
  RenderPipeline,
  Scene,
  SpotLight,
  WebGPURenderer,
} from 'three/webgpu'
import type { Step } from '@/data/steps.ts'
import { cubic, gsap } from '@/lib/gsap.ts'

// r141 legacy lights had no PI factor and no distance falloff
const LEGACY = Math.PI
const MOBILE_WIDTH = 768
const AO_MIN_WIDTH = 1024
const MAX_DPR = 2

const createLights = (target: Group) => {
  const back = new DirectionalLight('#96EC3E', 0)
  back.position.set(0, 10, -70)
  back.target = target
  const front = new DirectionalLight('#ffffff', 1.5 * LEGACY)
  front.position.set(-5, 1, 3)
  front.target = target
  const inner = new SpotLight('#96EC3E', 0, 0, 0.14, 1, 0)
  inner.position.set(0, 1, -10)
  return { back, front, inner }
}

const loadModel = async () => {
  const draco = new DRACOLoader().setDecoderPath('/draco/')
  const gltf = await new GLTFLoader()
    .setDRACOLoader(draco)
    .loadAsync('/model/xbox.glb')
  draco.dispose()
  // Geometries only, node transforms ignored like the original scene
  const model = new Group()
  model.scale.setScalar(0.01)
  gltf.scene.traverse((child) => {
    if (child instanceof Mesh) {
      model.add(new Mesh(child.geometry, child.material))
    }
  })
  const caseMaterial = model.children[0] as Mesh<never, MeshStandardMaterial>
  caseMaterial.material.roughness = 1
  return model
}

const createPipeline = (
  renderer: WebGPURenderer,
  scene: Scene,
  camera: PerspectiveCamera
) => {
  const scenePass = pass(scene, camera)
  const color = scenePass.getTextureNode()
  const aoNode = ao(
    scenePass.getTextureNode('depth'),
    // normals reconstructed from depth when null (typed as non-nullable)
    null as unknown as Node,
    camera
  )
  aoNode.scale.value = 0.5
  aoNode.resolutionScale = 0.5

  const grade = (useAo: boolean) => {
    const base = useAo ? color.rgb.mul(aoNode.r) : color.rgb
    const noise = base.mul(vec3(rand(screenUV.mul(time))))
    const screened = base.add(noise).sub(base.mul(noise))
    const vignette = smoothstep(
      0.0799,
      0.8,
      distance(screenUV, 0.5).mul(1.1)
    ).oneMinus()
    return vec4(screened.mul(vignette), color.a)
  }

  const pipeline = new RenderPipeline(renderer)
  let withAo: boolean | undefined
  const setAo = (enabled: boolean) => {
    if (enabled !== withAo) {
      withAo = enabled
      pipeline.outputNode = grade(enabled)
      pipeline.needsUpdate = true
    }
  }
  return { pipeline, setAo }
}

const createStage = async (canvas: HTMLCanvasElement) => {
  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.setClearColor(0x00_00_00, 0)
  await renderer.init()

  const scene = new Scene()
  const camera = new PerspectiveCamera(20, 1, 0.1, 1000)
  const model = await loadModel()
  const lights = createLights(model)
  scene.add(model, lights.back, lights.front, lights.inner)

  const { pipeline, setAo } = createPipeline(renderer, scene, camera)

  const resize = () => {
    const { innerWidth: w, innerHeight: h } = globalThis
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, MAX_DPR))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.position.z = w < MOBILE_WIDTH ? 9 : 5
    camera.updateProjectionMatrix()
    setAo(w >= AO_MIN_WIDTH)
  }
  resize()
  globalThis.addEventListener('resize', resize)
  renderer.setAnimationLoop(() => pipeline.render())

  const goTo = (step: Step, reduced: boolean) => {
    const ease = cubic
    const duration = reduced ? 0 : 1.8
    gsap.to(model.position, { ...step.meshPosition, duration, ease })
    gsap.to(model.rotation, { ...step.meshRotation, duration, ease })
    gsap.to(lights.front.position, {
      ...step.cinematicMainFront,
      duration,
      ease,
    })
    const { intensity: backIntensity, ...back } = step.cinematicMainBack
    gsap.to(lights.back.position, { ...back, duration, ease })
    gsap.to(lights.back, {
      intensity: backIntensity * LEGACY,
      duration: reduced ? 0 : 1.5,
      ease,
    })
    const { intensity, angle, ...inner } = step.innerLight
    gsap.to(lights.inner.position, { ...inner, duration, ease })
    gsap.to(lights.inner, {
      intensity: intensity * LEGACY,
      angle,
      duration,
      ease,
    })
  }

  const dispose = () => {
    globalThis.removeEventListener('resize', resize)
    gsap.killTweensOf([
      model.position,
      model.rotation,
      lights.front.position,
      lights.back.position,
      lights.back,
      lights.inner.position,
      lights.inner,
    ])
    renderer.setAnimationLoop(null)
    pipeline.dispose()
    renderer.dispose()
  }

  return { goTo, dispose }
}

export { createStage }
