import Image from 'next/image'

const Noise = () => (
  <div className="pointer-events-none fixed inset-0 z-noise mix-blend-screen">
    <Image
      alt=""
      className="object-cover"
      fill={true}
      src="/images/noise.webp"
    />
  </div>
)

export { Noise }
