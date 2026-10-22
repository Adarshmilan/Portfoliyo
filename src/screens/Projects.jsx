  import { useState, useEffect, useRef } from 'react';
import './Projects.css';
import portfoliyoVideo from '../assets/project/portfoliyo.mp4';
import js30Video from '../assets/project/js30.mp4';
import mli from '../assets/project/mli.mp4';
import knowyourBharmVideo from '../assets/project/knowyourbharmre.mp4';
import voice2NoteVideo from '../assets/project/Voice2notere.mp4';
import swatchsahayakVideo from '../assets/project/swatchsahayak.mp4';
import cyborgVideo from '../assets/project/cyborg.mp4';
import calcaiVideo from '../assets/project/calcai.mp4';
import Projectleft from '../components/Projectleft';
import Projectright from '../components/Projectright';
import useIsMobile from '../lib/useIsMobile.js';
import { RainbowButton } from '../components/ui/rainbow-button.tsx';
import DecryptedText from '../components/DecryptedText.jsx';

export default function Projects() {

  const projectsData = [
    {
      id: 1,
      name: 'First Portfoliyo ',
      description: 'This is my foundational portfolio website built with HTML and CSS. Highlight that it was your first project, emphasizing my journey into development, it laid the groundwork for my learning in web development. It includes features like a navigation bar, sidebar with social links, and multiple sections (About, Skills, Education, Contact).',
      video: portfoliyoVideo,
      link: 'https://github.com/Adarshmilan/firstproject',
      live: 'https://adarshmilan.github.io/firstproject/',
  
    },
    {
      id: 2,
      name: 'Javascript super30',
      description: 'This project showcases my skills in HTML, CSS, and JavaScript by creating interactive web features like checkboxes, video players, and webcam integration. Building it deepened my understanding of DOM manipulation, event handling, and multimedia APIs, enhancing my frontend development expertise.',
      video: js30Video,
      link: 'https://github.com/Adarshmilan/Javascriptprojects',
      live: 'https://adarshmilan.github.io/Javascriptprojects/showcase.html',

    },
    {
      id: 3,
      name: 'Know Your Bharm',
      description: 'This is my real word project which is for kids that have curiosity about anything and everything but they don\'t have answers to their questions. I learned how to fetch and display JSON data, create interactive flip cards, and design a responsive UI. It helped me improve my skills in DOM manipulation, event handling and i have used Puter API to make a chatbot that can answer questions as kid can understand using my prompt engineering skills.',
      video: knowyourBharmVideo,
      link: 'https://github.com/Adarshmilan/Knowyourbhram',
      live: 'https://adarshmilan.github.io/Knowyourbhram/',

    },
    {
      id: 4,
      name: 'Voice2Note',
      description: 'This is also a real world problem solving project it\'s name is Voice2Note is a responsive web app I built using HTML, CSS, and JavaScript, focusing on real-time pitch detection and visualizing notes on a virtual piano. Through this project, I learned Web Audio API, signal processing, and responsive design, enhancing my skills in frontend development and audio analysis. and many singers who is starting their journey in singing can use this app to know about their pitch and they can improve their singing skills.',
      video: voice2NoteVideo,
      link: 'https://github.com/Adarshmilan/Voice2Note',
      live: 'https://adarshmilan.github.io/Voice2Note/'

    },
    {
      id: 5,
      name: 'MultiLevel Inventory Management System',
      description: 'This project is a comprehensive SCM system built with Java servlets, DAO pattern, and JSP for the frontend. I learned how to manage user roles, handle database transactions, and implement core features like inventory, purchase orders, and dashboards. Building this enhanced my understanding of web application architecture, session management, and integrating different components to create a functional, role-based supply chain management platform.',
      video: mli,
      link: 'https://github.com/Adarshmilan/miltilevelinventory',
    },
    {
      id: 6,
      name: 'Swachhta Sahayak',
      description: 'This project is a waste management tool I built to streamline waste collection and tracking. I used HTML, CSS, and JavaScript for the frontend, creating multiple dashboards for admins, citizens, and workers. Through this, I learned how to organize complex UI components, manage user roles, and improve my skills in web development, especially in designing user-friendly interfaces and handling data flow across different sections of the app.This is a group project which we have prepared for the SIH 2024.',
      video: swatchsahayakVideo,
      link: 'https://github.com/Bharath-574/Swachhta-Sahayak',
    },
    {
      id: 7,
      name: 'Cyborg City',
      description: 'This project is a dynamic web app built with React, Tailwind CSS, and React Router, focusing on esports and gaming communities. I learned to implement responsive design, manage state with context, and organize complex routing. Building this enhanced my skills in frontend development, component structuring, and user experience. It reflects my growth in creating engaging, scalable interfaces and understanding how to integrate design with functionality for a seamless user journey.',
      video: cyborgVideo,
      link: 'https://github.com/Bharath-574/Swachhta-Sahayak',
      live: 'https://cyborgcity.vercel.app/',
    },
    {
      id: 8,
      name: 'CalcAI',
      description: 'This project is a web-based calculator that leverages FastAPI for the backend and integrates Google Generative AI to analyze images with mathematical expressions. I learned how to build REST APIs, handle image processing, and communicate with AI models. Working on this enhanced my understanding of API design, image decoding, and prompt engineering for AI. It’s been a valuable experience in combining AI with web development to create intelligent, interactive tools.',
      video: calcaiVideo,
      link: 'https://github.com/Adarshmilan/CalcAI',
    },

  ];

  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const isMobile = useIsMobile();
  const projectRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setActiveProject(projectsData[index]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile]);

  // Phones: the section pins to the screen and each project is its own full-screen page.
  // Scrolling down slides to the next page sideways (scrolling up slides back).
  if (isMobile) {
    return <MobileProjects projects={projectsData} />;
  }

  return (
    <div className="projects-section flex flex-col md:flex-row relative">
      {/* Left sticky side */}
      <div className="projects-left w-full md:w-[50vw] sticky top-0 h-auto md:h-screen flex items-center justify-center py-12 md:py-0">
        <Projectleft id={activeProject.id} name={activeProject.name} video={activeProject.video} />
      </div>

      {/* Bumpy Divider - Hidden on mobile */}
      <svg 
        className="absolute left-1/2 top-0 h-full transform -translate-x-1/2 hidden md:block" 
        width="40" 
        viewBox="0 0 40 1200" 
        preserveAspectRatio="none"
      >
        <path 
          d="M 20 0 Q 10 100, 20 200 Q 30 300, 20 400 Q 10 500, 20 600 Q 30 700, 20 800 Q 10 900, 20 1000 Q 30 1100, 20 1200" 
          stroke="rgba(255, 255, 255, 0.2)" 
          strokeWidth="2" 
          fill="none"
        />
        <circle cx="20" cy="300" r="3" fill="rgba(59, 130, 246, 0.4)" />
        <circle cx="20" cy="600" r="3" fill="rgba(59, 130, 246, 0.4)" />
        <circle cx="20" cy="900" r="3" fill="rgba(59, 130, 246, 0.4)" />
      </svg>

      {/* Right scrollable side */}
      <div className="projects-right w-full  md:w-[50vw]">
        {projectsData.map((project, index) => (
          <div 
            key={project.id}
            ref={(el) => projectRefs.current[index] = el}
            className='h-auto  flex items-center justify-center my-12 md:py-0'
          >
            <Projectright 
              id={project.id} 
              name={project.name} 
              description={project.description} 
              link={project.link} 
              live={project.live}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileProjects({ projects }) {
  const wrapperRef = useRef(null);
  const [page, setPage] = useState(0);
  const count = projects.length;

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      // How many screens we've scrolled into the section (0 .. count-1)
      const passed = -el.getBoundingClientRect().top / vh;
      const next = Math.min(count - 1, Math.max(0, Math.round(passed)));
      setPage(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count]);

  return (
    // One screen of scrolling per project
    <div ref={wrapperRef} className="relative w-full" style={{ height: `${count * 100}svh`, backgroundColor: '#080807' }}>
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100svh' }}>
        <div
          className="flex h-full"
          style={{
            width: `${count * 100}vw`,
            transform: `translateX(-${page * 100}vw)`,
            transition: 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {projects.map((project, i) => (
            <section
              key={project.id}
              className="w-screen h-full flex-shrink-0 flex flex-col justify-center gap-4 px-6 pt-14 pb-16"
            >
              <div className="flex items-end justify-between">
                <span className="text-6xl font-bold text-white leading-none">{project.id}</span>
                <span className="text-xs tracking-[3px] text-gray-400 uppercase">Projects</span>
              </div>

              <Projectvideo video={project.video} active={i === page} />

              <h3 className="text-2xl font-bold text-white">
                {i === page ? (
                  <DecryptedText
                    text={project.name}
                    speed={60}
                    maxIterations={10}
                    characters="ABCD1234!?"
                    animateOn="view"
                  />
                ) : project.name}
              </h3>

              <p className="text-[0.9rem] leading-relaxed text-gray-300">{project.description}</p>

              <div className="flex justify-between gap-3 mt-1">
                <RainbowButton variant="outline" onClick={() => project.live && window.open(project.live, '_blank')}>
                  {project.live ? 'Live' : 'Not deployed'}
                </RainbowButton>
                <RainbowButton variant="outline" onClick={() => window.open(project.link, '_blank')}>
                  Github
                </RainbowButton>
              </div>
            </section>
          ))}
        </div>

        {/* Page dots */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center gap-2 pointer-events-none">
          {projects.map((p, i) => (
            <span
              key={p.id}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: i === page ? 22 : 6, backgroundColor: i === page ? '#ffffff' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Plays only while its page is on screen
function Projectvideo({ video, active }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);
  return (
    <video
      ref={ref}
      src={video}
      loop
      muted
      playsInline
      preload="metadata"
      className="w-full rounded-lg border border-white/10 max-h-[28svh] object-cover bg-black"
    />
  );
}
