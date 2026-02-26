import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Landing from "./screens/landing";
import CustomCursor from "./components/Customcursor.jsx";
import Aboutme from "./screens/Aboutme.jsx";
import Skills from "./screens/Skills.jsx";
import Projects from "./screens/Projects.jsx";
import Achive from './screens/Achive.jsx';
import Contact from './screens/contact.jsx';






function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScroll = documentHeight - windowHeight;
      const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      prevent: (node) => {
        // Prevent Lenis from interfering with clickable elements
        return node.tagName === 'BUTTON' ||
               node.tagName === 'A' ||
               node.tagName === 'INPUT' ||
               node.classList?.contains('no-smooth') ||
               node.closest('button') !== null
      }
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
  return (
    <div className="App" style={{ position: 'relative' }}>
      {/* Scroll Progress Bar - Left */}
      <div
        style={{
          position: 'fixed',
          left: '0',
          top: 0,
          width: '8px',
          height: `${scrollProgress}%`,
          backgroundColor: '#ffffff',
          zIndex: 999,
          transition: 'none',
        }}
      ></div>

      {/* Scroll Progress Bar - Right */}
      <div
        style={{
          position: 'fixed',
          right: '0',
          top: 0,
          width: '8px',
          height: `${scrollProgress}%`,
          backgroundColor: '#ffffff',
          zIndex: 999,
          transition: 'none',
        }}
      ></div>

      <CustomCursor />
      <div style={{ position: 'relative', height: '230vh' }}>
        <Landing />
      </div>
      <div className="z-10" style={{ 
        backgroundColor: '#061921',
        // backgroundImage: `url(${mainbg})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundAttachment: 'scroll',
        position: 'relative',
        height: '120vh',
      }}>
        <Aboutme />
      </div>
      <div style={{ position: 'relative', height: '300vh' }}>
        <Skills />
      </div>
      <div style={{ backgroundColor: '#080807 ', position: 'relative' }}>
        <Projects />
      </div>
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <Achive />
      </div>
      <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
        <Contact />
      </div>

    </div>
  );
}

export default App;