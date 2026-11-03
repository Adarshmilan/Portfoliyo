import { useState, useEffect, useRef } from 'react';
import './Projects.css';
import ProjectPlaceholder from '../components/ProjectPlaceholder.jsx';

// Every .mp4 in src/assets/project/, looked up by file name (e.g. 'cyborg.mp4').
// To add a demo, drop a video with the name listed in projectsData below.
const videoFiles = import.meta.glob('../assets/project/*.mp4', { eager: true, query: '?url', import: 'default' });
const videoFor = (file) => (file ? videoFiles[`../assets/project/${file}`] : undefined);

import Projectleft from '../components/Projectleft';
import Projectright from '../components/Projectright';
import useIsMobile from '../lib/useIsMobile.js';
import { RainbowButton } from '../components/ui/rainbow-button.tsx';
import DecryptedText from '../components/DecryptedText.jsx';

export default function Projects() {

  const projectsData = [
    {
      name: 'Cyborg City',
      tech: 'React · Node.js · Express · Supabase · Razorpay · PWA',
      description: 'A full-stack Free Fire esports tournament platform used by 200+ players. Teams and squad invites, match registration, Razorpay payments, a live leaderboard and match reports. REST API in Node.js/Express with JWT auth, role-based admin middleware and a PostgreSQL (Supabase) database with realtime updates. Shipped as an installable PWA on Vercel and Render.',
      video: 'cyborg.mp4',
      link: 'https://github.com/Adarshmilan/Cyborg',
      live: 'https://cyborgcity.vercel.app/',
    },
    {
      name: 'UniCart',
      tech: 'Android app · Campus marketplace · Google Play',
      description: 'A campus delivery marketplace app where students post requests and other students deliver them for a fee. It is live on Google Play with 200+ real users and is still growing.',
      video: 'unicart.mp4',
      link: 'https://github.com/Adarshmilan/unideli',
      live: 'https://play.google.com/store/apps/details?id=com.hex.uncart',
      liveLabel: 'Play Store',
    },
    {
      name: 'PhoneShark',
      tech: 'Kotlin · Android VpnService · Java NIO',
      description: 'A Wireshark-style packet analyzer for Android that captures all of a phone\'s traffic without root, using a local VPN and a user-space TCP/UDP forwarding engine. Decodes IPv4/IPv6, TCP, UDP, ICMP, DNS, HTTP, TLS (SNI, ALPN) and QUIC, maps traffic to apps, flags unencrypted connections and exports .pcap files for Wireshark.',
      video: 'phoneshark.mp4',
      link: 'https://github.com/Adarshmilan/PhoneShark',
    },
    {
      name: 'ZomHex',
      tech: 'Godot 4 · GDScript · Shaders · Android',
      description: 'A merge tower-defense game for Android with a drag-and-merge turret grid, boss waves and endless, data-driven difficulty. 3D turret models are rendered inside a 2D game with custom toon and outline shaders. Includes haptics, a portrait layout for any screen and a JSON save system. Coming to Google Play under the 2Hex developer account.',
      video: 'zomhex.mp4',
      link: 'https://github.com/Adarshmilan/GateBreak',
      status: 'In testing',
    },
    {
      name: 'CalcAI',
      tech: 'Python · FastAPI · Gemini · React · TypeScript',
      description: 'A drawing-canvas app that sends hand-drawn equations to a vision LLM. It solves expressions, systems of equations, variable assignments and diagram word problems, and renders the answers with MathJax. A FastAPI service with a structured prompt and parser turns the model\'s output into JSON results.',
      video: 'calcai.mp4',
      link: 'https://github.com/Adarshmilan/CalcAI',
    },
    {
      name: 'Multi-Level Inventory & Supply Chain',
      tech: 'Java · Servlets · JSP · MySQL · Docker',
      description: 'A role-based web app for Admins, Warehouse Managers and Suppliers, built on MVC with Servlets, DAOs and JSP/JSTL views. Purchase orders and inter-warehouse stock transfers run as atomic database transactions with commit and rollback. Containerized with a multi-stage Docker build on Tomcat.',
      video: 'mli.mp4',
      link: 'https://github.com/Adarshmilan/miltilevelinventory',
    },
    {
      name: 'ShareLive & Walkie-Talkie',
      tech: 'Node.js · Express · Socket.IO · React',
      description: 'Two real-time apps. ShareLive shares text across devices with 6-character room codes, live sync over Socket.IO and rooms that expire after 2 hours. The walkie-talkie backend is a push-to-talk server that relays audio chunks to channel members, with presence events and crash-safe handlers.',
      video: 'sharelive.mp4',
      link: 'https://github.com/Adarshmilan/sharelive',
      live: 'https://sharelive.onrender.com/',
    },    
    {
      name: 'Deep Learning Experiments',
      tech: 'PyTorch · CUDA · Scikit-learn',
      description: 'Neural networks built from scratch. A CNN with convolution, max-pooling and dropout reaching 99.01% test accuracy on MNIST; a Wide & Deep network for California Housing price regression (R² 0.766); and a Fashion-MNIST MLP with about 89% validation accuracy.',
      video: 'deeplearning.mp4',
      link: 'https://github.com/Adarshmilan/firstCNN',
    },
    {
      name: 'Voice2Note',
      tech: 'HTML · CSS · JavaScript · Web Audio API',
      description: 'A web app for singers that detects pitch in real time and shows the notes on a virtual piano. Building it taught me the Web Audio API, signal processing and responsive design.',
      video: 'Voice2notere.mp4',
      link: 'https://github.com/Adarshmilan/Voice2Note',
      live: 'https://adarshmilan.github.io/Voice2Note/',
    },
    {
      name: 'Know Your Bharm',
      tech: 'HTML · CSS · JavaScript · Puter API',
      description: 'A learning app for curious kids with interactive flip cards loaded from JSON, plus a chatbot built with the Puter API and prompt engineering that answers questions in a way kids can understand.',
      video: 'knowyourbharmre.mp4',
      link: 'https://github.com/Adarshmilan/Knowyourbhram',
      live: 'https://adarshmilan.github.io/Knowyourbhram/',
    },
  ].map((p, i) => ({ ...p, id: i + 1, video: videoFor(p.video) }));

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
            className='min-h-screen flex items-center justify-center py-16'
          >
            <Projectright 
              id={project.id} 
              name={project.name} 
              description={project.description} 
              link={project.link} 
              live={project.live}
              tech={project.tech}
              status={project.status}
              liveLabel={project.liveLabel}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileProjects({ projects }) {
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);
  const [page, setPage] = useState(0);
  const [drag, setDrag] = useState(0); // px the finger has moved sideways
  const pageRef = useRef(0);
  const count = projects.length;

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

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

  // Sideways swipe: scroll the page to the next/previous project's position,
  // so swiping and vertical scrolling always agree on which project is shown.
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    let startX = 0, startY = 0, mode = null; // mode: 'x' (swiping) | 'y' (scrolling) | null

    const goTo = (target) => {
      const wrapper = wrapperRef.current;
      const top = wrapper.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + target * window.innerHeight, behavior: 'smooth' });
    };

    const onStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      mode = null;
    };

    const onMove = (e) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (!mode && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        mode = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
      if (mode !== 'x') return;
      e.preventDefault(); // keep the page still while swiping sideways
      const atEdge = (dx > 0 && pageRef.current === 0) || (dx < 0 && pageRef.current === count - 1);
      setDrag(atEdge ? dx * 0.25 : dx); // resist at the first/last project
    };

    const onEnd = (e) => {
      if (mode === 'x') {
        const dx = e.changedTouches[0].clientX - startX;
        const threshold = Math.min(80, window.innerWidth * 0.2);
        const current = pageRef.current;
        if (dx < -threshold && current < count - 1) goTo(current + 1);
        else if (dx > threshold && current > 0) goTo(current - 1);
      }
      mode = null;
      setDrag(0);
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd);
    el.addEventListener('touchcancel', onEnd);
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, [count]);

  return (
    // One screen of scrolling per project
    <div ref={wrapperRef} className="relative w-full" style={{ height: `${count * 100}svh`, backgroundColor: '#080807' }}>
      <div ref={sliderRef} className="sticky top-0 w-full overflow-hidden" style={{ height: '100svh', touchAction: 'pan-y' }}>
        <div
          className="flex h-full"
          style={{
            width: `${count * 100}vw`,
            transform: `translateX(calc(-${page * 100}vw + ${drag}px))`,
            transition: drag ? 'none' : 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
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

              {project.video
                ? <Projectvideo video={project.video} active={i === page} />
                : <ProjectPlaceholder name={project.name} className="max-h-[28svh]" />}

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

              <p className="text-[11px] uppercase tracking-[2px] text-cyan-300/80 -mt-2">{project.tech}</p>

              <p className="text-[0.85rem] leading-relaxed text-gray-300">{project.description}</p>

              <div className="flex justify-between gap-3 mt-1">
                <RainbowButton variant="outline" onClick={() => project.live && window.open(project.live, '_blank')}>
                  {project.live ? (project.liveLabel || 'Live') : (project.status || 'Not deployed')}
                </RainbowButton>
                {project.link && (
                  <RainbowButton variant="outline" onClick={() => window.open(project.link, '_blank')}>
                    Github
                  </RainbowButton>
                )}
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
