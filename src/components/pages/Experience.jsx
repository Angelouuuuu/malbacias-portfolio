import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";   
import { FaDownload, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode, FaProjectDiagram, FaChalkboardTeacher } from "react-icons/fa";
import aboutImage from '../../assets/images/profile.jpg';


const Experience = () => {
    const personalInfo = [
        { id: 1, label: "Name", value: "Necole Angelou G. Malbacias", icon: <FaUser /> },
        { id: 2, label: "Email", value: "angelounecole@gmail.com", icon: <FaEnvelope /> },
        { id: 3, label: "Phone", value: "+63 935 389 0040", icon: <FaPhone /> },
        { id: 4, label: "Location", value: "Zamboanga City, Philippines", icon: <FaMapMarkerAlt /> }
    ];
    const stats = [
        {
          id: 1,
          label: "Years of Experience",
          value: "2 Years",
          icon: <FaCode />,
          to: "/experience",
        },
        {
          id: 2,
          label: "Projects Completed",
          value: "10 Projects",
          icon: <FaProjectDiagram />,
          to: "/projects",
        },
        {
          id: 3,
          label: "Seminars Attended",
          value: "5 Seminars",
          icon: <FaChalkboardTeacher />,
          to: "/seminars",
        }
      ];

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const onScroll = () => {
        const section = document.getElementById("about");
        if (section) {
          const top = section.getBoundingClientRect().top;
          setIsVisible(top < window.innerHeight - 100); // Trigger near viewport
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

return (
    <main className={styles.main_container}>
    <section id="about" className={`${styles.section} ${isVisible ? styles.visible : ""}`}>
        <h2 className={styles.section_title}>About Me</h2>

        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.info_section}>
                    <h3>Personal Infos</h3>
                    <div className={styles.info_grid}>
                        {personalInfo.map((info, index) => (
                            <div key={index} className={styles.info_item}>
                                <span className={styles.info_label}>{info.label}:</span>
                                <span className={styles.info_value}>{info.value}</span>
                            </div>
                        ))}
                    </div>

                    <a href="/cv.pdf" className={styles.button}>
                    Download CV
                    <span className={styles.button_icon}>
                        <FaDownload />
                    </span>
                    </a>
                </div>

                <div className={styles.stats}>
      {stats.map((stat) => (
        stat.scrollTo ? (
          <ScrollLink 
            key={stat.id}
            to={stat.scrollTo}
            smooth={true}
            duration={500}
            className={styles.statItem}
          >
            {stat.icon}
            <h4>{stat.label}</h4>
            <p>{stat.value}</p>
          </ScrollLink>
        ) : (
          <div 
            key={stat.id}
            onClick={() => navigate(stat.path)}
            className={styles.statItem}
            style={{ cursor: 'pointer' }}
          >
            {stat.icon}
            <h4>{stat.label}</h4>
            <p>{stat.value}</p>
          </div>
        )
      ))}
    </div>
            </div>
        </div>
        

    </section>
    <div className={styles.separator}></div>
    <div className={styles.card_container}>
    <div className={styles.card}>
        <div className={styles.card_content}>
            <h3 className={styles.card_title}>Who Am I?</h3>
            <p className={styles.card_text}>
                A graduating IT student with two years of experience in coding, primarily using PHP and MySQL
                for backend development. Also experienced in frontend technologies, including HTML, CSS, Bootstrap, and Tailwind,
                to create responsive and user-friendly interfaces. In addition to development, its responsibility for quality assurance, 
                ensures that projects meet high standards of functionality, security, and performance. With a passion
                for problem-solving and continuous learning, strives to create efficient and reliable software solutions.
            </p>
        </div>
    </div>
    <img className={styles.aboutImage} src={aboutImage} alt="Profile Image" />
</div>


    
</main>
  );
};

export default Experience


