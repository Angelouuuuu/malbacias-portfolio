import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/pages/Hero";
import About from "./components/pages/About";


function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
