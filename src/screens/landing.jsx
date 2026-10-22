import { useState, useEffect } from 'react';
import mainheadshot from '../assets/longmain.jpg';
import {Highlighter} from '../components/Highlignt.jsx';
import useIsMobile from '../lib/useIsMobile.js';



export default function Landing() {
    const [scrollY, setScrollY] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setViewportWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            const scrollyvh = (window.scrollY / viewportHeight) * 100;
            setScrollY(scrollyvh > 100 ? 100 : scrollyvh);
            
            
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scale = isMobile ? 1 + scrollY * 0.002 : 1.1 + scrollY * 0.004;
    const translateY = isMobile ? 0 : ((scrollY * 0.095)/100) * viewportHeight;
    const translateX = isMobile ? 0 : ((scrollY * 0.325)/100) * viewportHeight;

    const maintexbgtx = ((scrollY * 1.9)/100) * viewportHeight;
    const maintextx = scrollY >  30 ? (((scrollY - 30) * 2.4)/100) * viewportHeight : 0;

    const smallaboutmetx3 = scrollY >  90 ? Math.max(0, viewportWidth - (scrollY*(viewportWidth/100))) : viewportWidth;
    const smallaboutmetx2 = scrollY >  75 ? Math.max(0, viewportWidth - (scrollY*(viewportWidth/100))) : viewportWidth;
    const smallaboutmetx1 = scrollY >  60 ? Math.max(0, viewportWidth - (scrollY*(viewportWidth/100))) : viewportWidth;



    return(
        <div className="relative  w-full overflow-hidden">
            {/* Black Frame */}
            <div
                style={{
                    position: 'fixed',
                    top: isMobile ? '10px' : '20px',
                    left: isMobile ? '10px' : '20px',
                    right: isMobile ? '10px' : '20px',
                    bottom: isMobile ? '10px' : '20px',
                    border: '2px solid #000000',
                    borderRadius: isMobile ? '14px' : '20px',
                    pointerEvents: 'none',
                    zIndex: 0,
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
                }}
            />

            
            <div className="fixed -z-10 inset-0 "
                style={{
                    backgroundImage: `url(${mainheadshot})`,
                    backgroundSize: isMobile ? 'cover' : '100% ',
                    backgroundPosition: isMobile ? '50% top' : undefined,
                    backgroundRepeat: 'no-repeat',
                    transform: `scale(${scale}) translateX(${translateX}px) translateY(-${translateY}px)`,
                    transformOrigin: 'top',
                    transition: 'transform 0.4s ease-out',
                }}
            />
            

            <div className=" z-20 min-h-screen w-full flex justify-center items-end pb-20 md:pb-40 pointer-events-none" >
                <div className="fixed w-full px-4 md:px-0">
                    <h1
                        className="text-3xl md:text-6xl tracking-[3px] left-0 w-full text-center font-bold absolute"
                        style={{
                        fontSize: 'clamp(2rem, 8vw, 7rem)',
                        color: '#000000',
                        fontFamily: "'Lora', serif",
                        transform: `translateX(-${maintexbgtx}px) `,
                        transition: '0.4s ease-out',
                        }}
                    >
                        ADARSH MILAN
                    </h1>
                    <h1
                        className="text-3xl md:text-6xl text-center font-bold relative"
                        style={{
                        fontSize: 'clamp(2rem, 8vw, 7rem)',
                        color: '#d6d6d6',
                        fontFamily: "'Lora', serif",
                        transform: `translateX(-${maintextx}px) `,
                        transition: '0.5s ease-out',
                        }}
                    >
                        ADARSH MILAN
                    </h1>
                </div>
            </div>


            <div className=' pt-[60vh] md:pt-100 fixed top-0 left-0 w-full smallaboutme px-6 md:px-10'
                style={{ textShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.85)' : undefined }}
            >
                <p
                style={{
                    fontSize:'clamp(1rem, 4vw, 1.5rem)',
                    fontFamily:"'Quicksand', sans-serif",
                    color:'#ffffff',
                    transform: `translateX(${smallaboutmetx1}px)`,
                    transition: '0.2s ease-out',
                }}
                >{"  "}
                <Highlighter action="underline" color="#FF9800">
                    Engineering student
                </Highlighter>{" "}
                with a project-first mindset.
                 
                </p> <br /> 
                 
                <p
                style={{
                    fontSize:'clamp(1rem, 4vw, 1.5rem)',
                    fontFamily:"'Quicksand', sans-serif",
                    color:'#ffffff',
                    transform: `translateX(${smallaboutmetx2}px)`,
                    transition: '0.8s ease-out',
                }}
                >I don't just{" "}
                <Highlighter action="highlight" color="#87CEFA">
                    learn tech
                </Highlighter>{" "}
                I build with it. Merging a{" "}{!isMobile && <br />}
                
                </p> <br/>

                <p
                style={{
                    fontSize:'clamp(1rem, 4vw, 1.5rem)',
                    fontFamily:"'Quicksand', sans-serif",
                    color:'#ffffff',
                    transform: `translateX(${smallaboutmetx3}px)`,
                    transition: '0.8s ease-out',
                }}
                >
                passion for music with a{" "} 
                <Highlighter action="highlight" color="#FFD700">
                    deep dive 
                </Highlighter>{ " "}into emerging systems. <br />
                </p>
            </div>


        </div>
    );
}