

export default function Projectleft({ id,name ,video }) {

    return(
        <div className="projectleft  sticky h-screen w-[40vw] flex flex-col justify-around content" >
            <h1 className="basis-[15%] text-9xl font-bold text-white" >{id}</h1>
            <div><video src={video} autoPlay loop muted className="project-video basis-[70%]" /></div>
            <div className=" basis-[15%] flex justify-end-safe w-full "><h2 className=" text-4xl font-bold text-white" >{name}</h2></div>
        </div>
    )
}