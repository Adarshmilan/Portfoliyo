import { useRef, useEffect, useState } from 'react';

export default function Projectleft({ id,name ,video }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video && isVisible) {
            video.play().catch(() => {
                // Fallback if autoplay fails
            });
        } else if (video && !isVisible) {
            video.pause();
        }
    }, [isVisible, video]);

    return(
        <div ref={containerRef} className="projectleft md:sticky h-auto md:h-screen w-full md:w-[40vw] flex flex-col justify-around gap-3 md:gap-0" >
            <h1 className="basis-[15%] text-6xl md:text-9xl font-bold text-white" >{id}</h1>
            <div><video 
                ref={videoRef}
                src={video} 
                loop 
                muted 
                preload="metadata"
                playsInline
                className="project-video basis-[70%] w-full rounded-lg" 
            /></div>
            <div className=" basis-[15%] hidden md:flex justify-end-safe w-full "><h2 className="text-2xl md:text-4xl font-bold text-white text-right" >{name}</h2></div>
        </div>
    )
}