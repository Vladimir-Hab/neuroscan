import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from '@/components/Header'
import Hero from '@/sections/Hero'
import Benefits from '@/sections/Benefits'
import Pricing from '@/sections/Pricing'
import FAQ from '@/sections/FAQ'
import Guarantee from '@/sections/Guarantee'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'
import StickyCTA from '@/components/StickyCTA'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      <Header />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <Benefits />
        <Pricing />
        <Guarantee />
        <FAQ />
        <CTA />
        <Footer />
      </main>
      <StickyCTA />
    </>
  )
}