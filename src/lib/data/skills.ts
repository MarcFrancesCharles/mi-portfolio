export type SkillCategory = {
  id: string;
  title: string;
  icon: string; // emoji o texto corto
  description: string;
  technologies: {
    name: string;
    level: string; // tooltip descriptivo
  }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "🎨",
    description: "Interfaces modernas, accesibles y de alto rendimiento.",
    technologies: [
      { name: "React", level: "Uso diario en proyectos reales" },
      { name: "Next.js", level: "SSR, SSG, ISR, API Routes" },
      { name: "TypeScript", level: "Tipado avanzado y genéricos" },
      { name: "Tailwind CSS", level: "Diseño utility-first, temas" },
      { name: "Framer Motion", level: "Animaciones declarativas" },
      { name: "Angular", level: "Proyectos empresariales" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "⚙️",
    description: "APIs robustas, modelado de datos y lógica de negocio.",
    technologies: [
      { name: "Node.js", level: "REST, GraphQL, WebSockets" },
      { name: "Next.js API", level: "Server Actions, Route Handlers" },
      { name: "Express", level: "Middleware, autenticación JWT" },
      { name: "Laravel", level: "Eloquent, MVC, Artisan" },
      { name: "Prisma ORM", level: "Migraciones, relaciones complejas" },
      { name: "PostgreSQL", level: "Consultas avanzadas, optimización" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: "🛠️",
    description: "Flujos de trabajo eficientes y despliegues automatizados.",
    technologies: [
      { name: "Git & GitHub", level: "CI/CD, code reviews" },
      { name: "Docker", level: "Contenedores para desarrollo" },
      { name: "Vercel", level: "Despliegue continuo, serverless" },
      { name: "Testing", level: "Vitest, Playwright, Jest" },
      { name: "Figma", level: "Colaboración con diseño UX/UI" },
    ],
  },
];