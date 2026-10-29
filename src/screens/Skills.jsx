import { useState, useEffect, useMemo, useRef } from "react";
import useIsMobile from "../lib/useIsMobile.js";
import { IconCloud } from "../components/ui/icon-cloud";
import Particles from "../components/Particles.jsx"

import typescriptIcon from '../assets/icons/typescript.svg';
import cIcon from '../assets/icons/c.svg';
import html5Icon from '../assets/icons/html5.svg';
import css3Icon from '../assets/icons/css3.svg';
import javascriptIcon from '../assets/icons/javascript.svg';
import reactIcon from '../assets/icons/react.svg';
import nodeIcon from '../assets/icons/node-dot-js.svg';
import pythonIcon from '../assets/icons/python.svg';
import linuxIcon from '../assets/icons/linux.svg';
import gitIcon from '../assets/icons/git.svg';
import bashIcon from '../assets/icons/gnubash.svg';
import githubIcon from '../assets/icons/github.svg';
import mysqlIcon from '../assets/icons/mysql.svg';
import postgresIcon from '../assets/icons/postgresql.svg';
import supabaseIcon from '../assets/icons/supabase.svg';
import mongoIcon from '../assets/icons/mongodb.svg';
import photpeaIcon from '../assets/icons/photopea.svg';
import figmaIcon from '../assets/icons/figma.svg';
import pandasIcon from '../assets/icons/pandas.svg';
import numpyIcon from '../assets/icons/numpy.svg';
import renderIcon from '../assets/icons/render.svg';
import netlifyIcon from '../assets/icons/netlify.svg';
import vercelIcon from '../assets/icons/vercel.svg';
import bootstrapIcon from '../assets/icons/bootstrap.svg';
import tailwindIcon from '../assets/icons/tailwindcss.svg';
import netbeansIcon from '../assets/icons/apachenetbeanside.svg';
import springIcon from '../assets/icons/spring.svg';
import railwayIcon from '../assets/icons/railway.svg';
import fastapiIcon from '../assets/icons/fastapi.svg';
import viteIcon from '../assets/icons/vite.svg';
import apacheIcon from '../assets/icons/apache.svg';
import tomcatIcon from '../assets/icons/apachetomcat.svg';
import notionIcon from '../assets/icons/notion.svg';
import ciscoIcon from '../assets/icons/cisco.svg';
import javaIcon from '../assets/icons/java.svg';

const iconMap = {
    typescript: typescriptIcon,
    c: cIcon,
    html5: html5Icon,
    css3: css3Icon,
    javascript: javascriptIcon,
    react: reactIcon,
    'node-dot-js': nodeIcon,
    python: pythonIcon,
    linux: linuxIcon,
    git: gitIcon,
    gnubash: bashIcon,
    github: githubIcon,
    mysql: mysqlIcon,
    postgresql: postgresIcon,
    supabase: supabaseIcon,
    mongodb: mongoIcon,
    photopea: photpeaIcon,
    figma: figmaIcon,
    pandas: pandasIcon,
    numpy: numpyIcon,
    render: renderIcon,
    netlify: netlifyIcon,
    vercel: vercelIcon,
    bootstrap: bootstrapIcon,
    tailwindcss: tailwindIcon,
    apachenetbeanside: netbeansIcon,
    spring: springIcon,
    railway: railwayIcon,
    fastapi: fastapiIcon,
    vite: viteIcon,
    apache: apacheIcon,
    apachetomcat: tomcatIcon,
    notion: notionIcon,
    cisco: ciscoIcon,
    java: javaIcon,
};

// How well I know each core skill (0-100), shown as bars
const proficiency = [
    { key: "html5", value: 95 },
    { key: "css3", value: 92 },
    { key: "mysql", value: 88 },
    { key: "tailwindcss", value: 88 },
    { key: "java", value: 85 },
    { key: "bootstrap", value: 81 },
    { key: "git", value: 80 },
    { key: "javascript", value: 75 },
    { key: "python", value: 75 },
    { key: "postgresql", value: 70 },
    { key: "react", value: 68 },
    { key: "figma", value: 65 },
    { key: "spring", value: 55 },
    { key: "mongodb", value: 52 },
    { key: "typescript", value: 40 },
    { key: "node-dot-js", value: 20 },
];

const categories = {
    "Languages": ["typescript", "javascript", "python", "java", "c"],
    "Frontend": ["html5", "css3", "react", "bootstrap", "tailwindcss", "vite"],
    "Backend": ["node-dot-js", "spring", "fastapi", "apache", "apachetomcat"],
    "Databases": ["mysql", "postgresql", "mongodb", "supabase"],
    "Tools & OS": ["git", "github", "gnubash", "linux", "apachenetbeanside", "cisco"],
    "Deployment": ["render", "netlify", "vercel", "railway"],
    "Design & Data": ["figma", "photopea", "notion", "pandas", "numpy"],
};

const labels = {
    typescript: "TypeScript", javascript: "JavaScript", python: "Python", java: "Java", c: "C",
    html5: "HTML5", css3: "CSS3", react: "React", bootstrap: "Bootstrap", tailwindcss: "Tailwind CSS", vite: "Vite",
    "node-dot-js": "Node.js", spring: "Spring", fastapi: "FastAPI", apache: "Apache", apachetomcat: "Tomcat",
    mysql: "MySQL", postgresql: "PostgreSQL", mongodb: "MongoDB", supabase: "Supabase",
    git: "Git", github: "GitHub", gnubash: "Bash", linux: "Linux", apachenetbeanside: "NetBeans", cisco: "Cisco",
    render: "Render", netlify: "Netlify", vercel: "Vercel", railway: "Railway",
    figma: "Figma", photopea: "Photopea", notion: "Notion", pandas: "Pandas", numpy: "NumPy",
};

// Black logos that would vanish on the dark background
const darkIcons = new Set(["github", "vercel", "notion", "railway", "render"]);

const levelOf = (v) => (v >= 85 ? "Advanced" : v >= 65 ? "Proficient" : v >= 45 ? "Intermediate" : "Learning");

// Icon with a letter badge fallback (a few icon files are empty)
function SkillIcon({ name, size = "w-7 h-7" }) {
    const [broken, setBroken] = useState(false);
    if (broken || !iconMap[name]) {
        return (
            <span className={`${size} rounded-md bg-cyan-400/15 text-cyan-300 text-[11px] font-bold flex items-center justify-center`}>
                {labels[name].slice(0, 2).toUpperCase()}
            </span>
        );
    }
    return (
        <img
            src={iconMap[name]}
            alt=""
            className={`${size} object-contain ${darkIcons.has(name) ? "invert opacity-90" : ""}`}
            onError={() => setBroken(true)}
        />
    );
}

const cardClass = "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm";

function ProficiencyCard() {
    return (
        <div className={`${cardClass} p-5 md:p-6 flex flex-col`}>
            <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold text-white">Proficiency</h3>
                <span className="text-[11px] uppercase tracking-[2px] text-gray-400">Core skills</span>
            </div>
            <ul className="flex flex-col gap-2.5">
                {proficiency.map(({ key, value }) => (
                    <li key={key} className="flex items-center gap-3">
                        <SkillIcon name={key} size="w-5 h-5" />
                        <span className="w-24 shrink-0 text-[13px] text-gray-200">{labels[key]}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{ width: `${value}%`, background: "linear-gradient(90deg, #22d3ee, #3b82f6)" }}
                            />
                        </div>
                        <span className="w-20 shrink-0 text-right text-[11px] text-gray-400">{levelOf(value)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ToolboxCard() {
    const [active, setActive] = useState("All");
    const shown = active === "All"
        ? Object.values(categories).flat()
        : categories[active];

    return (
        <div className={`${cardClass} p-5 md:p-6 flex flex-col min-w-0`}>
            <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold text-white">Toolbox</h3>
                <span className="text-[11px] uppercase tracking-[2px] text-gray-400">{shown.length} tools</span>
            </div>

            {/* Category filter (scrolls sideways on small screens) */}
            <div className="flex md:flex-wrap gap-2 overflow-x-auto md:overflow-visible pb-2 mb-4 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                {["All", ...Object.keys(categories)].map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setActive(cat)}
                        className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                            active === cat
                                ? "bg-cyan-400 text-black border-cyan-400"
                                : "bg-transparent text-gray-300 border-white/15 hover:border-cyan-400/60"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                {shown.map((key) => (
                    <div
                        key={key}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-colors"
                    >
                        <SkillIcon name={key} />
                        <span className="text-[10px] md:text-[11px] text-gray-300 text-center leading-tight px-1">{labels[key]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SkillsOverview() {
    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-5 md:gap-6">
            <ProficiencyCard />
            <ToolboxCard />
        </div>
    );
}

export default function Skills() {
    const [slide, setSlide] = useState(0);
    const [bgColor, setBgColor] = useState('#061921');
    const rootRef = useRef(null);
    const isMobile = useIsMobile();

    const images = useMemo(() => Object.values(iconMap), []);

    // Desktop only: while this section is pinned, slide from the icon cloud to the overview.
    useEffect(() => {
        if (isMobile) return;
        const handleScroll = () => {
            const vh = window.innerHeight;
            const wrapper = rootRef.current?.parentElement;
            if (!wrapper) return;
            const passed = -wrapper.getBoundingClientRect().top / vh; // screens scrolled into this section

            setSlide(Math.min(1, Math.max(0, passed)) * window.innerWidth);

            const t = Math.min(1, Math.max(0, passed / 1.5));
            const r = Math.round(6 + (8 - 6) * t);
            const g = Math.round(25 + (8 - 25) * t);
            const b = Math.round(33 + (7 - 33) * t);
            setBgColor(`rgb(${r}, ${g}, ${b})`);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isMobile]);

    const particles = (
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
            <Particles
                particleColors={["#ffffff"]}
                particleCount={isMobile ? 100 : 200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
            />
        </div>
    );

    const heading = (
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center" style={{ fontFamily: "'Lora', serif" }}>
            Skills
        </h2>
    );

    // Phones: simple vertical stack
    if (isMobile) {
        return (
            <div ref={rootRef} className="w-full relative overflow-hidden"
                style={{ background: 'linear-gradient(to bottom, #061921 0%, #080807 100%)' }}
            >
                {particles}
                <div className="relative z-10 flex flex-col gap-10 py-16 px-4">
                    {heading}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-[420px] flex justify-center">
                            <IconCloud images={images} />
                        </div>
                    </div>
                    <SkillsOverview />
                </div>
            </div>
        );
    }

    return (
        <div ref={rootRef} className="w-full h-screen sticky top-0 overflow-hidden"
            style={{ backgroundColor: bgColor }}
        >
            {particles}

            <div
                className="relative z-10 flex flex-row h-full"
                style={{ transform: `translateX(-${slide}px)`, transition: 'transform 0.5s ease-out' }}
            >
                {/* Icon cloud */}
                <div className="w-screen h-full flex-shrink-0 flex justify-center items-center">
                    <div className="w-[80vw] flex justify-center">
                        <IconCloud images={images} />
                    </div>
                </div>

                {/* Proficiency + toolbox */}
                <div className="w-screen h-full flex-shrink-0 flex flex-col justify-center gap-8 px-10">
                    {heading}
                    <SkillsOverview />
                </div>
            </div>
        </div>
    );
}
