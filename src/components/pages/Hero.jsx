"use client"

import { useState, useEffect } from "react"
import { Link } from "react-scroll"
import styles from "./Hero.module.css"
import heroImg from "../../assets/images/me.jpg"
import icon1 from "../../assets/icons/css.png"
import icon2 from "../../assets/icons/html.png"
import icon3 from "../../assets/icons/php.png"
import icon4 from "../../assets/icons/tailwind.png"

export const Hero = () => {
  const [loopNum, setLoopNum] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"]
  const [text, setText] = useState("")
  const [delta, setDelta] = useState(300 - Math.random() * 100)
  const period = 1000

  useEffect(() => {
    const ticker = setInterval(() => {
      tick()
    }, delta)
    return () => clearInterval(ticker)
  }, [text, delta])

  const tick = () => {
    const i = loopNum % toRotate.length
    const fullText = toRotate[i]
    const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setDelta(50) // Speed up when deleting
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setDelta(period)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setDelta(300)
    }
  }

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Hi, I'm Nec — <span className={styles.spanning}>{text}</span>
        </h1>
        <p className={styles.desc}>I have 2 years experience in web development. Reach out to know more!</p>
        <Link className={styles.contact} to="contact" smooth={true} duration={500}>
          Let's Connect!
        </Link>

        <div className={styles.techStack}>
          <hr className={styles.line} />
          <div className={styles.stackContainer}>
            <span className={styles.techText}>My tech stack</span>
            <img src={icon1 || "/placeholder.svg"} alt="CSS" />
            <img src={icon2 || "/placeholder.svg"} alt="HTML" />
            <img src={icon3 || "/placeholder.svg"} alt="PHP" />
            <img src={icon4 || "/placeholder.svg"} alt="Tailwind" />
          </div>
          <hr className={styles.line} />
        </div>
      </div>
      <img className={styles.heroImg} src={heroImg || "/placeholder.svg"} alt="Hero" />
      <div className={styles.topBlur}></div>
      <div className={styles.bottomBlur}></div>
    </section>
  )
}

export default Hero
