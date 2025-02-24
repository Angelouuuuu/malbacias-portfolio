import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import heroImg from "../../assets/images/me.jpg"
import icon1 from "../../assets/icons/css.png";
import icon2 from "../../assets/icons/html.png";
import icon3 from "../../assets/icons/php.png";
import icon4 from "../../assets/icons/tailwind.png";

export const Hero = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 1000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => { clearInterval(ticker)};
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting){
            setDelta(50);
        }

        if (!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(period);
        }else if(isDeleting && updatedText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(300);
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi, I'm a <span className={styles.spanning}>{text}</span></h1>
                <p className={styles.desc}>My name is Nec and I have a 2 years experience in web development. Reach out if you'd like to know more!</p>
                <Link className={styles.contact} to="/contact">Let's Connect!</Link>
                
                <div className={styles.techStack}>
                    <hr className={styles.line} />
                    <div className={styles.stackContainer}>
                        <span className={styles.techText}>My tech stack</span>
                        <img src={icon1} alt="" />
                        <img src={icon2} alt="" />
                        <img src={icon3} alt="" />
                        <img src={icon4} alt="" />
                    </div>
                    <hr className={styles.line} />
                </div>
            </div>
            <img className={styles.heroImg} src={heroImg} alt="HeroImage" />
            <div className={styles.topBlur}></div>
            <div className={styles.bottomBlur}></div>

        </section>
    );
};
