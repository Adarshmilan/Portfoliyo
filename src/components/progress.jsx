import React from 'react';
import { CoolMode } from "./ui/cool-mode.tsx";
import { AnimatedCircularProgressBar } from "./ui/animated-circular-progress-bar.tsx";

export default function Progress({ skillsData, selectedSkill, setSelectedSkill }) {
    return (
        <div className="w-screen  h-full flex flex-row item-center content-center justify-around gap-8">
            <div className="progressbuttons w-[40vw] flex-1 flex flex-col item-center justify-center content-center gap-4">
                <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto max-h-96">
                    {skillsData.map((skill) => (
                        <CoolMode 
                            key={skill.name}
                            options={{ particleCount: 8 }}
                        >
                            <button 
                                onClick={() => setSelectedSkill(skill)}
                                style={{ 
                                    pointerEvents: 'auto', 
                                    border: 'none', 
                                    background: 'transparent',
                                    color: 'white',
                                    width: '100%',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                                type="button"
                            >
                                {skill.name}
                            </button>
                        </CoolMode>
                    ))}
                </div>
            </div>

            <div className="progress flex-1 flex flex-col items-center content-center justify-center gap-8">
                <h2 className="text-2xl font-bold text-white">Proficiency</h2>
                <div className="flex flex-wrap gap-8 justify-center items-center">
                    <AnimatedCircularProgressBar 
                        max={100}
                        value={selectedSkill.progress}
                        gaugePrimaryColor="#3b82f6"
                        gaugeSecondaryColor="#01245c"
                    />
                    <div className="flex flex-col justify-center gap-4 text-white">
                        <h3 className="text-3xl font-bold text-white">{selectedSkill.name}</h3>
                        <p className="text-lg text-white">
                            Proficiency: <span className="font-bold text-white">{selectedSkill.progress}%</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}