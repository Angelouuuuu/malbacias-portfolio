"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaSearch } from "react-icons/fa"
import styles from "./ProjectsPage.module.css";
import sciCalImg from "../../assets/images/sci-cal.jpg";
import langHub from "../../assets/images/langhub.jpg";
import se from "../../assets/images/se.jpg";
import l2 from "../../assets/images/langhub2.jpg";
import l3 from "../../assets/images/langhub3.jpg";
import l4 from "../../assets/images/langhub4.jpg";
import l5 from "../../assets/images/langhub5.jpg";
import tour from "../../assets/images/tour.jpg";


const projectsData = [
  {
    id: 1,
    title: "Scientific Calculator",
    description:
      "A user-friendly scientific calculator that performs basic to advanced mathematical operations, built to assist students and professionals in solving complex calculations.",
    image: sciCalImg,
    category: "Full Stack",
    technologies: ["React"],
    gallery:[
      l2,l3,l4,l5,
    ],
    githubUrl: "https://github.com/Angelouuuuu/Scientific-Calculator",
    liveUrl: "https://malbacias-salburo.netlify.app",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A personal website that showcases our profiles, achievements, blogs, and tour experiences—designed to introduce ourselves professionally and creatively.",
    image: langHub,
    category: "Frontend",
    technologies: ["React", "CSS Modules", "Framer Motion"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://github.com/Angelouuuuu/malbacias-portfolio.git",
    featured: true,
  },
  {
    id: 3,
    title: "GDSC: Event Management System",
    description: "An event management system for the Google Developer Student Club (GDSC) that organizes, tracks, and manages club events, schedules, and participants efficiently.",
    image: se,
    category: "Frontend",
    technologies: ["JavaScript", "PhP"],
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://your-weather-app.com",
    featured: false,
  },
  {
    id: 4,
    title: "Foreman's Tour 2025",
    description: "A language translation system designed to translate words and sentences between Chinese Mandarin, Spanish, and English. It helps users learn and understand different languages more effectively.",
    image: tour,
    category: "Full Stack",
    technologies: ["React"],
    githubUrl: "https://github.com/Angelouuuuu/Blog.git",
    liveUrl: "https://lousblogg.netlify.app/",
    featured: true,
  },

]

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Get unique categories
  const categories = ["All", ...new Set(projectsData.map((project) => project.category))]

  // Filter projects based on category and search query
  useEffect(() => {
    let filtered = projectsData

    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(query)),
      )
    }

    setFilteredProjects(filtered)
  }, [selectedCategory, searchQuery])

  // Animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  // Close modal
  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className={styles.projectsContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className={styles.header}
      >
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>
          Explore my recent work and projects. Click on any project to view more details.
        </p>
      </motion.div>

      <div className={styles.filters}>
        <div className={styles.categoryFilters}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategory : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search projects..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className={styles.noProjects}>
          <h3>No projects found</h3>
          <p>Try changing your search criteria or category filter.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className={styles.projectsGrid}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.projectCard}
              onClick={() => handleProjectClick(project)}
            >
              <div className={styles.projectImageContainer}>
                <img src={project.image || "/placeholder.svg"} alt={project.title} className={styles.projectImage} />
                <div className={styles.projectOverlay}>
                  <button className={styles.viewButton}>View Project</button>
                </div>
                {project.featured && <div className={styles.featuredBadge}>Featured</div>}
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedProject.image || "/placeholder.svg"}
              alt={selectedProject.title}
              className={styles.modalImage}
            />
            <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
            <p className={styles.modalDescription}>{selectedProject.description}</p>

            <div className={styles.modalTechStack}>
              <h3>Technologies Used</h3>
              <div className={styles.modalTechTags}>
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className={styles.modalTechTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.modalLinks}>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalLink}
              >
                <FaGithub /> View Code
              </a>
              <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
