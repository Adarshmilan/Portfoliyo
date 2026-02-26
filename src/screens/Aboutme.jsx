import { useEffect, useState } from "react";
import abphoto from '../assets/aboutmenew.jpg';
import gifbg from '../assets/space_bg.gif';
import ProfileCard from '../components/ProfileCard.jsx';
import ScrambledText from '../components/ScrambledText.jsx';


export default function Aboutme() {


    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setRotation(scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const element = document.querySelector('.aboutmemain::after');
        if (element) {
            element.style.transform = `translate(-50%, 0%) rotate(${rotation}deg)`;
        }
    }, [rotation]);



    return(
        <div className="flex justify-around items-center flex-col md:flex-row w-full"
        style={{
            backgroundImage: `url(${gifbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'auto',
            minHeight: '105vh',
            borderBottomLeftRadius: '100px',
            borderBottomRightRadius: '100px',
            position: 'relative',
            zIndex: '0',
            '--rotation': `${rotation/2}deg`,
            
        }}>
            <div className="aboutmemain pl-0 md:pl-50 w-full md:w-1/2 px-4 md:px-0 py-8 md:py-0">
                <ProfileCard
                name="Adarsh Milan"
                title="Software Engineer"
                handle=""
                status="Online"
                contactText="Contact Me"
                avatarUrl={abphoto}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={true}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                iconUrl="/assets/demo/iconpattern.png"
                behindGlowEnabled
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                />
            </div>

            <div className="w-full md:w-1/1.7 px-4 md:px-0 py-8 md:py-0">
                <ScrambledText
                className="scrambled-text-demo"
                radius={100}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
                >
                    Adarsh Milan, currently in his Second year pursuing a Bachelor's in Computer Science and Engineering at Marwadi University, Gujrat, originates from the dynamic Bokaro Steel City in Jharkhand. Commencing his academic journey at Guru Gobind Singh Public School, adarsh has cultivated a deep passion for programming, fronted developer, cybersecurity and enthusiastic problem solver, evident in various front-end development projects that have enriched his coding skills. Not content to settle, adarsh is currently exploring the realms of backend development, driven not only by languages and frameworks but by a profound understanding of the core principles of computer science.
                </ScrambledText>

            </div>


        </div>
    );
}