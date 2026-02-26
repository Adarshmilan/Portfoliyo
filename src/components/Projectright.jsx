import DecryptedText from './DecryptedText.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import { RainbowButton } from './ui/rainbow-button.tsx';


export default function Projectright({ id,name ,description,technologies,link,live }) {

    return(
        <div className='flex w-[40vw] justify-around h-screen content-center flex-col ' >
            <div className="name basis-[20%] text-6xl font-bold text-white" >
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
            <div  className="link basis-[10%] flex flex-row justify-between pr-8 mt-4" >
                <RainbowButton 
                    variant="outline"
                    onClick={() => window.open(live, '_blank')}
                >
                    {live ? 'Live' : "Not deployed"}
                </RainbowButton>
                <RainbowButton 
                    variant="outline"
                    onClick={() => window.open(link, '_blank')}
                >
                    Github
                </RainbowButton>
            </div>
        </div>
    );
}