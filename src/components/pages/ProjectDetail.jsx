"use client"

import { useParams, Link } from "react-router-dom"
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa"
import styles from "./ProjectDetail.module.css"

// This is an alternative approach if you want dedicated project detail pages
// instead of modal popups

const ProjectDetail = ({ projects }) => {
  const { id } = useParams()
  const project = projects.find((p) => p.id === Number.parseInt(id))

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>Project not found</h2>
        <Link to="/projects" className={styles.backLink}>
          <FaArrowLeft /> Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.projectDetail}>
      <div className={styles.header}>
        <Link to="/projects" className={styles.backLink}>
          <FaArrowLeft /> Back to Projects
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
      </div>

      <div className={styles.imageContainer}>
        <img src={project.image || "/placeholder.svg"} alt={project.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.overview}>
          <h2>Project Overview</h2>
          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.techStack}>
          <h2>Technologies Used</h2>
          <div className={styles.techTags}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 ? (
          <div className={styles.gallerySection}>
            <h2>Project Gallery</h2>
            <div className={styles.galleryGrid}>
              {project.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Screenshot ${index + 1}`}
                  className={styles.galleryImage}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No gallery found.</p>
        )}


        {(project.githubUrl || project.liveUrl) && (
          <div className={styles.links}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <FaGithub /> View Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
