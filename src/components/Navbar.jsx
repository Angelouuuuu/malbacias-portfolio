"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import menuIcon from "../assets/nav/menu.png"
import closeIcon from "../assets/nav/close.png"

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      
      // Determine if we're scrolling up or down
      const isScrollingDown = currentScrollPos > prevScrollPos
      
      // Add some threshold to avoid navbar flickering on small scroll movements
      const scrollDifference = Math.abs(currentScrollPos - prevScrollPos)
      
      // Set navbar visibility based on scroll direction and position
      if (currentScrollPos > 100) {
        // Only change visibility state if we've scrolled more than 5px
        if (scrollDifference > 5) {
          setVisible(!isScrollingDown)
        }
        setScrolled(true)
      } else {
        setVisible(true)
        setScrolled(currentScrollPos > 10)
      }
      
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.querySelector(`.${styles.menu}`)
      if (menuOpen && menu && !menu.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 830 && menuOpen) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [menuOpen])

  return (
    <nav 
      className={`
        ${styles.navbar} 
        ${scrolled ? styles.scrolled : ""} 
        ${!visible ? styles.hidden : ""}
      `}
    >
      <Link className={styles.title} to="/">
        Portfolio
      </Link>
      <div className={styles.menu}>
        <button
          className={styles.menuBtnContainer}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <img
            className={styles.menuBtn}
            src={menuOpen ? closeIcon : menuIcon}
            alt={menuOpen ? "Close menu" : "Open menu"}
          />
        </button>

        <ul className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
          <a
            href="https://malbacias-blog.netlify.app/blog"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </a>

          </li>
        </ul>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}
    </nav>
  )
}
