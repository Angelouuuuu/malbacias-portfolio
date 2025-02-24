import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import menuIcon from "../assets/nav/menu.png"
import closeIcon from "../assets/nav/close.png"

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <Link className={styles.title} to="/">Portfolio</Link>
            <div className={styles.menu}>
                <img className={styles.menuBtn} src={menuOpen ? (closeIcon) :(menuIcon)} alt="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}/>

                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
};
