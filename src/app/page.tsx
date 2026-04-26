import Terminal from "@/components/sections/Terminal";

export default function Home() {
  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2 text-center">
          Construyo aplicaciones web <span className="text-primary">completas</span>
        </h1>
        <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
          Full Stack Developer con formación DAW. Desde la arquitectura del servidor hasta el pixel perfect en el frontend.
        </p>
        <Terminal />
      </div>
    </div>
  );
}