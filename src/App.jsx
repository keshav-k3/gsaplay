import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './App.css'

function App() {
  const lettersRef = useRef([])

  useEffect(() => {
    // Staggered animation for each letter
    gsap.fromTo(
      lettersRef.current,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
        scale: 0.5
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
      }
    )
  }, [])

  const name = 'Keshav Kk'

  return (
    <div className="container">
      <h1>
        {name.split('').map((char, index) => (
          <span
            key={index}
            className={char === ' ' ? 'space' : 'letter'}
            ref={(el) => (lettersRef.current[index] = el)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default App
