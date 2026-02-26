import CardSwap, { Card } from '../components/CardSwap.jsx';
import aicer from '../assets/certificate/AI.jpg';
import ccnaNetwork from '../assets/certificate/CCNANetwork.jpg';
import connectProtect from '../assets/certificate/connectprotect.jpg';
import cybersecurity from '../assets/certificate/cybersecurity.jpg';
import hackathon from '../assets/certificate/hackathon.jpg';
import playItSafe from '../assets/certificate/playitsafe.jpg';
import toolsOfTrade from '../assets/certificate/toolsoftrade.jpg';

export default function Achive() {
    const achievementData = [
        {
            id: 1,
            name: 'Google AI ',
            description: 'AI fundamentals, how to use generative AI tools, write effective prompts, maximize productivity, and apply AI responsibly in the workplace.',
            certificateImage: aicer,
        },
        {
            id: 2,
            name: 'CCNA Networking',
            description: 'networking fundamentals, including OSI/TCP/IP models, IP addressing (IPv4/IPv6), subnetting, Ethernet, router and switch configuration, network security basics, and troubleshooting connectivity in small networks.',
            certificateImage: ccnaNetwork,
        },
        {
            id: 3,
            name: 'Google network ',
            description: 'It focuses on securing networks and protecting data from cyber threats. The course covers network architecture, protocols (including TCP/IP), intrusion tactics, firewalls, virtual private networks (VPNs), and system hardening.',
            certificateImage: connectProtect,
        },
        {
            id: 4,
            name: 'Google cybersecurity',
            description: 'Cybersecurity fundamentals, including the CIA triad, security frameworks, risk mitigation, ethical practices, common threats, and tools like SIEM and network analyzers used by analysts.',
            certificateImage: cybersecurity,
        },
        {
            id: 5,
            name: 'Hackathon',
            description: 'I have participated in a hackathon where I developed a web application using PHP and MySQL, showcasing my ability to rapidly prototype and implement full-stack solutions under time constraints.',
            certificateImage: hackathon,
        },
        {
            id: 6,
            name: 'Google play it safe',
            description: 'Manage Security Risks course, you will learn to identify threats, risks, and vulnerabilities, apply security frameworks like NIST and CIA triad, analyze SIEM data, use incident response playbooks, and conduct security audits.',
            certificateImage: playItSafe,
        },
        {
            id: 7,
            name: 'Google tools of trade',
            description: 'I have learned Linux commands, SQL queries, and how to navigate file systems and databases using Bash shell for cybersecurity tasks',
            certificateImage: toolsOfTrade,
        },
    ];

    return (
        <div className='achive h-auto md:h-screen flex flex-col md:flex-row content-center justify-center justify-items-center w-full px-4 md:px-8 py-12 md:py-20' style={{
            background: 'linear-gradient(to bottom, #080807 0%, #1a1a16 100% )',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Header Section */}
            <div className='text-center flex items-start flex-col w-full mb-8 md:mb-12 content-center justify-center justify-items-center items-center'>
                <h1 style={{
                    fontSize: '5rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #d2d2d2 0%, #9b9b9b 50%, #717171 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    letterSpacing: '2px',
                    textAlign: 'left',
                }}>
                    Leveling Up
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#b0bec5',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.8',
                    fontFamily: "'Quicksand', sans-serif",
                    textAlign: 'left',
                }}>
                    Documenting my evolution from a curious builder to a dedicated engineer. This log tracks my certifications, successful deployments, and the technical benchmarks I've cleared along the way.
                </p>
            </div>

            {/* Cards Section */}
            <div className='flex justify-center w-full  items-center'>
                <CardSwap
                    cardDistance={80}
                    verticalDistance={80}
                    delay={100}
                    pauseOnHover={true}
                >
                    {achievementData.map((item) => (
                        <Card key={item.id}>
                            <div style={{

                                display: 'flex',
                                flexDirection: 'column',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '24px',
                                paddingTop : '0px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                overflow: 'hidden',
                            }} 
                            >
                                

                                {/* Certificate Name */}
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: 'bold',
                                    color: '#64b5f6',
                                    marginBottom: '12px',
                                    lineHeight: '1.4',
                                }}>
                                    {item.name}
                                </h3>

                                <div style={{
                                    width: '100%',
                                    height: '220px',
                                    marginBottom: '16px',
                                    background: 'linear-gradient(135deg, #424242 0%, #303030 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    color: 'rgba(255, 255, 255, 0.2)',
                                    fontWeight: 'bold',
                                    border: '2px dashed rgba(66, 165, 245, 0.3)',
                                }}>
                                    <img src={item.certificateImage} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'fill', borderRadius: '12px' }} />
                                </div>

                                {/* Description */}
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#b0bec5',
                                    lineHeight: '1.6',
                                    flex: 1,
                                    fontFamily: "'Quicksand', sans-serif",
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </CardSwap>
            </div>
        </div>
    );
}