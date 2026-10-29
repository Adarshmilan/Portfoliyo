// Shown in place of a project video until one is added to src/assets/project/
export default function ProjectPlaceholder({ name, className = '' }) {
    return (
        <div
            className={`w-full aspect-video rounded-lg border border-white/10 flex flex-col items-center justify-center gap-2 text-center px-4 ${className}`}
            style={{ background: 'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 80% 90%, rgba(59,130,246,0.18), transparent 55%), #0d0d0c' }}
        >
            <span className="text-2xl md:text-4xl font-bold text-white/90" style={{ fontFamily: "'Lora', serif" }}>{name}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[3px] text-gray-400">Demo video coming soon</span>
        </div>
    );
}
