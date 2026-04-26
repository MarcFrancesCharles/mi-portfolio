export default function Footer() {
  return (
    <footer className="border-t border-surface py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
        <p className="font-mono">
          Diseñado y construido con <span className="text-primary">Next.js</span> por Marc Frances Charles
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/MarcFrancesCharles" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/MarcFrancesCharles" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="mailto:mfrancescharles@gmail.com" className="hover:text-primary transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}