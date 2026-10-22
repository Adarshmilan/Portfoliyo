
import { useEffect, useRef, useState } from 'react';
import cursorImage from '../assets/moon.png'; 

const hasMouse = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function CustomCursor() {
  return hasMouse() ? <MoonCursor /> : null;
}

function MoonCursor() {
  const cursorRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half the cursor size to center it on mouse
      cursorRef.current.style.left = (e.clientX - 15) + 'px';
      cursorRef.current.style.top = (e.clientY - 15) + 'px';
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rotate cursor every second
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation((prev) => (prev + 360) % 360);
    }, 1000);

    return () => clearInterval(rotationInterval);
  }, []);

  // Hide default cursor globally
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '30px',
        height: '30px',
        backgroundImage: `url(${cursorImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 1s linear',
      }}
    />
  );
}