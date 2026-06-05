import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '@/sections/Hero'
import Video from '@/sections/Video'
import Metrics from '@/sections/Metrics'
import Benefits from '@/sections/Benefits'
import Audience from '@/sections/Audience'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <Video />
      <Metrics />
      <Benefits />
      <Audience />
      <CTA />
      <Footer />
    </main>
  )
}
