import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useIsMobile from "../lib/useIsMobile.js";
import { IconCloud } from "../components/ui/icon-cloud";
import Progress from "../components/progress";
import background from '../assets/skillbg.jpg';
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

// Skills array for Progress component
const skillsDataArray = [
    { name: "TypeScript", progress: 40 },
    { name: "JavaScript", progress: 75 },
    { name: "React", progress: 68 },
    { name: "Node.js", progress: 20 },
    { name: "Python", progress: 75 },
    { name: "HTML5", progress: 95 },
    { name: "CSS3", progress: 92 },
    { name: "MySQL", progress: 88 },
    { name: "PostgreSQL", progress: 70 },
    { name: "MongoDB", progress: 52 },
    { name: "Git", progress: 80 },
    { name: "Figma", progress: 65 },
    { name: "Tailwind CSS", progress: 88 },
    { name: "Bootstrap", progress: 81 },
    { name: "Java", progress: 85 },
    { name: "Spring", progress: 55 },
];

// Skills object for displaying skills by category
const skillsCategoryData = {
    "Programming Languages": ["typescript", "javascript", "python", "java", "c"],
    "Frontend": ["html5", "css3", "react", "bootstrap", "tailwindcss", "vite"],
    "Backend": ["node-dot-js", "spring", "fastapi", "apache", "apachetomcat"],
    "Databases": ["mysql", "postgresql", "mongodb", "supabase"],
    "Version Control": ["git", "github", "gnubash", "linux"],
    "Design & UI": ["figma", "photopea", "notion"],
    "Data Science": ["pandas", "numpy"],
    "Deployment": ["render", "netlify", "vercel", "railway"],
    "Other Tools": ["apachenetbeanside", "cisco"],
};

const SkillCard = ({ skill }) => (
    <div className="flex flex-col items-center justify-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg hover:bg-blue-900 hover:bg-opacity-30 transition-all duration-300">
        <img
            src={iconMap[skill]}
            alt={skill}
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
        />
        <span className="text-[10px] md:text-xs text-gray-300 text-center capitalize">
            {skill.replace(/-dot-/g, '.').replace(/-/g, ' ')}
        </span>
    </div>
);

const SkillCategories = () => (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
        {Object.entries(skillsCategoryData).map(([category, skills]) => (
            <div key={category} className="flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-cyan-400 mb-3 md:mb-4 pb-2 border-b border-cyan-400 border-opacity-30">
                    {category}
                </h3>
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                    {skills.map((skill) => (
                        <SkillCard key={skill} skill={skill} />
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export default function Skills() {
    const [iclouddiss, setIclouddiss] = useState(0);
    const [selectedSkill, setSelectedSkillState] = useState(skillsDataArray[0]);
    const [bgColor, setBgColor] = useState('#061921');
    const rootRef = useRef(null);
    const isMobile = useIsMobile();

    const images = useMemo(() => Object.values(iconMap), []);
    const memoizedSkillsData = useMemo(() => skillsDataArray, []);

    const setSelectedSkill = useCallback((skill) => {
        setSelectedSkillState(skill);
    }, []);

    // Desktop only: slide the three panels sideways while the section is pinned.
    // Measured from where this section starts, so it stays in sync if sections above change height.
    useEffect(() => {
        if (isMobile) return;
        const handleScroll = () => {
            const vh = window.innerHeight;
            const wrapper = rootRef.current?.parentElement;
            const start = wrapper ? wrapper.offsetTop : vh * 3.5;
            const passed = (window.scrollY - start) / vh; // screens scrolled into this section

            const panel = Math.min(2, Math.max(0, passed));
            setIclouddiss(panel * window.innerWidth);

            const scrollProgress = passed <= 0 ? 0 : Math.min(1, (passed + 1) / 3);
            const r = Math.round(6 + (8 - 6) * scrollProgress);
            const g = Math.round(25 + (8 - 25) * scrollProgress);
            const b = Math.round(33 + (7 - 33) * scrollProgress);
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

    // Phones: simple vertical stack (cloud -> categories -> proficiency)
    if (isMobile) {
        return (
            <div ref={rootRef} className="w-full relative overflow-hidden"
                style={{ background: 'linear-gradient(to bottom, #061921 0%, #080807 100%)' }}
            >
                {particles}
                <div className="relative z-10 flex flex-col gap-12 py-16">
                    <h2 className="text-4xl font-bold text-white text-center" style={{ fontFamily: "'Lora', serif" }}>
                        Skills
                    </h2>
                    <div className="w-full flex justify-center px-4">
                        <div className="w-full max-w-[420px] flex justify-center">
                            <IconCloud images={images} />
                        </div>
                    </div>
                    <SkillCategories />
                    <div className="px-4">
                        <Progress
                            skillsData={memoizedSkillsData}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div ref={rootRef} className="w-full min-h-screen sticky  top-0 overflow-hidden relative"
        style={{backgroundColor: bgColor,

        }}
        >
            {particles}

            <div className="relative z-10 flex flex-row w-full overflow-x-hidden">
                {/* Icon Cloud Section */}
                <div className="icon-cloud w-screen min-h-screen flex justify-center items-center flex-shrink-0"
                style={{
                        transform: `translateX(-${iclouddiss}px)`,
                        transition: 'transform 0.5s ease-out',
                    }}>
                    <div className="w-[80vw] flex justify-center">
                        <IconCloud images={images} />
                    </div>
                </div>

                <div className="skillslist w-screen min-h-screen py-12 flex-shrink-0"
                    style={{
                        transform: `translateX(-${iclouddiss}px)`,
                        transition: 'transform 0.5s ease-out',
                    }}>
                    <SkillCategories />
                </div>

                {/* Progress/Proficiency Section */}
                <div className="expertpercentage w-screen flex flex-row px-35 py-12 content-center justify-center min-h-screen" 
                    style={{
                        transform: `translateX(-${iclouddiss}px)`,
                        transition: 'transform 0.5s ease-out',
                    }}>
                    <Progress 
                        skillsData={memoizedSkillsData}
                        selectedSkill={selectedSkill}
                        setSelectedSkill={setSelectedSkill}
                    />
                </div>
            </div>
        </div>
    );
}
