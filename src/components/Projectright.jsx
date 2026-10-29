import DecryptedText from './DecryptedText.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import { RainbowButton } from './ui/rainbow-button.tsx';


export default function Projectright({ name, description, tech, link, live, status, liveLabel }) {

    return(
        <div className='flex w-full md:w-[40vw] justify-around h-auto content-center flex-col' >
            <div className="name basis-[20%] text-3xl md:text-6xl font-bold text-white" >
                <DecryptedText
                    text={name}
                    speed={100}
                    maxIterations={10}
                    characters="ABCD1234!?"
                    className="revealed"
                    parentClassName="all-letters"
                    encryptedClassName="encrypted"
                    animateOn="view"
                />
            </div>
            {tech && (
                <p className="text-xs md:text-sm uppercase tracking-[2px] text-cyan-300/80 mt-2 mb-1">{tech}</p>
            )}
            <div className="description basis-[70%] text-sm text-gray-300" >
                <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={8}
                blurStrength={4}
                >
                    {description}
                </ScrollReveal>
            </div >
            <div  className="link basis-[10%] flex flex-row justify-between gap-3 md:pr-8 mt-4" >
                <RainbowButton
                    variant="outline"
                    onClick={() => live && window.open(live, '_blank')}
                >
                    {live ? (liveLabel || 'Live') : (status || 'Not deployed')}
                </RainbowButton>
                {link && (
                    <RainbowButton
                        variant="outline"
                        onClick={() => window.open(link, '_blank')}
                    >
                        Github
                    </RainbowButton>
                )}
            </div>
        </div>
    );
}