import { useState, useEffect, useMemo, useCallback } from "react";
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
    "Backend": ["node.js", "spring", "fastapi", "apache", "apachetomcat"],
    "Databases": ["mysql", "postgresql", "mongodb", "supabase"],
    "Version Control": ["git", "github", "gnubash", "linux"],
    "Design & UI": ["figma", "photopea", "notion"],
    "Data Science": ["pandas", "numpy"],
    "Deployment": ["render", "netlify", "vercel", "railway"],
    "Other Tools": ["apachenetbeanside", "cisco"],
};

export default function Skills() {
    const [iclouddiss, setIclouddiss] = useState(0);
    const [skillstranslatepx, setSkillstranslatepx] = useState(0);
    const [selectedSkill, setSelectedSkillState] = useState(skillsDataArray[0]);
    const [bgColor, setBgColor] = useState('#061921');
    
    const images = useMemo(() => Object.values(iconMap), []);
    const memoizedSkillsData = useMemo(() => skillsDataArray, []);
    
    const setSelectedSkill = useCallback((skill) => {
        setSelectedSkillState(skill);
    }, []);
    
    useEffect(() => {
        const handleScroll = () => {
            const iconcloud = ((window.scrollY > window.innerHeight*3.5) && (window.scrollY < window.innerHeight*6.5)) 
                ? ((window.scrollY > window.innerHeight*5.5) ? 2 : ((window.scrollY - window.innerHeight*3.5) / window.innerHeight) )
                : ((window.scrollY > window.innerHeight*5.5) ? 1 : 0);
            setIclouddiss((iconcloud) * window.innerWidth);
            
            let scrollProgress = 0;
            if (window.scrollY > window.innerHeight*3.5 && window.scrollY < window.innerHeight*5.5) {
                scrollProgress = (window.scrollY - window.innerHeight*2.5) / (window.innerHeight*3);
            } else if (window.scrollY >= window.innerHeight*5.5) {
                scrollProgress = 1;
            }
            
            const r = Math.round(6 + (8 - 6) * scrollProgress);
            const g = Math.round(25 + (8 - 25) * scrollProgress);
            const b = Math.round(33 + (7 - 33) * scrollProgress);
            
            const color = `rgb(${r}, ${g}, ${b})`;
            setBgColor(color);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const SkillCard = ({ skill }) => (
        <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg hover:bg-blue-900 hover:bg-opacity-30 transition-all duration-300">
            <img 
                src={iconMap[skill]} 
                alt={skill}
                className="w-12 h-12 object-contain"
            />
            <span className="text-xs text-gray-300 text-center capitalize">
                {skill.replace(/-/g, ' ').replace('-dot-js', '.js').replace(/-dot-/g, '.')}
            </span>
        </div>
    );

    return(
        <div className="w-full min-h-screen sticky  top-0 overflow-hidden relative"
        style={{backgroundColor: bgColor,

        }}
        >
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
                <Particles
                    particleColors={["#ffffff"]}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>

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
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-0">
                        {Object.entries(skillsCategoryData).map(([category, skills]) => (
                            <div key={category} className="flex flex-col">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4 pb-2 border-b border-cyan-400 border-opacity-30">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-4 gap-4">
                                    {skills.map((skill) => (
                                        <SkillCard key={skill} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
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