import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import Hero from './components/pages/Hero';
import About from './components/pages/About';
import Experience from './components/pages/Experience';
import Projects from './components/pages/ProjectsPage';
import Blog from './components/pages/Blog';
import styles from './App.module.css';
import ProjectsPage from './components/pages/ProjectsPage';

function App() {
  return (
    <div className={styles.App}>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
   
    </Router>
    </div>
  );
}

export default App;
