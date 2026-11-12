import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Observer } from 'gsap/Observer'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, CustomEase, Observer, SplitText)

const cubic = CustomEase.create('cubic', '.7,0,.3,1')

export { cubic, gsap, Observer, SplitText, useGSAP }
