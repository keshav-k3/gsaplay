import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './App.css'

function App() {
  const pokemonRef = useRef(null)
  const pokeballRef = useRef(null)
  const particlesRef = useRef([])
  const textRef = useRef(null)
  const shineRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Pokeball entrance - bounces in
    tl.fromTo(
      pokeballRef.current,
      { y: -500, rotation: 0, scale: 0.5 },
      {
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'bounce.out',
      }
    )
    // Pokeball shake
    .to(pokeballRef.current, {
      rotation: 15,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut'
    })
    // Pokeball opens (splits)
    .to(pokeballRef.current, {
      scale: 1.2,
      duration: 0.2,
      ease: 'power2.out'
    })
    // Pokemon appears with flash
    .to(shineRef.current, {
      opacity: 1,
      scale: 3,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(shineRef.current, {
      opacity: 0,
      duration: 0.2
    }, '-=0.1')
    .fromTo(
      pokemonRef.current,
      { scale: 0, rotation: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)'
      },
      '-=0.3'
    )
    // Pokemon bounce and rotate
    .to(pokemonRef.current, {
      y: -30,
      rotation: 360,
      duration: 0.8,
      ease: 'power2.out'
    })
    .to(pokemonRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'bounce.out'
    })
    // Particles burst
    .to(particlesRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 360,
      x: (i) => Math.cos(i * 45 * Math.PI / 180) * 150,
      y: (i) => Math.sin(i * 45 * Math.PI / 180) * 150,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.05
    }, '-=1.2')
    .to(particlesRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.5
    })
    // Text appears
    .fromTo(
      textRef.current,
      { y: 50, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      }
    )
    // Pokemon idle animation (continuous)
    .to(pokemonRef.current, {
      y: -15,
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    })

  }, [])

  return (
    <div className="container">
      <div className="shine" ref={shineRef}></div>

      <div className="pokeball" ref={pokeballRef}>
        <div className="pokeball-top"></div>
        <div className="pokeball-center"></div>
        <div className="pokeball-bottom"></div>
      </div>

      <div className="pokemon" ref={pokemonRef}>
        ⚡
      </div>

      <div className="particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            ref={(el) => (particlesRef.current[i] = el)}
          >
            ✨
          </div>
        ))}
      </div>

      <h1 ref={textRef} className="pokemon-text">
        PIKACHU!
      </h1>
    </div>
  )
}

export default App
