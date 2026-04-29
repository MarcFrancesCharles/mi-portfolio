export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Full Stack Developer",
    company: "Startup XYZ",
    period: "Enero 2024 – Presente",
    description:
      "Desarrollo de una plataforma SaaS con Next.js, Prisma y PostgreSQL. Responsable tanto del frontend como del diseño de la API REST y la base de datos.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "Vercel"],
  },
  {
    id: "2",
    role: "Desarrollador Web",
    company: "Agencia Digital Creativa",
    period: "Junio 2023 – Diciembre 2023",
    description:
      "Maquetación y desarrollo de sitios web interactivos y e-commerce para clientes del sector retail. Colaboración estrecha con diseño UX/UI.",
    technologies: ["React", "Tailwind", "Stripe", "Framer Motion", "Figma"],
  },
  {
    id: "3",
    role: "Técnico en Desarrollo de Aplicaciones Web (DAW)",
    company: "Formación Profesional",
    period: "Septiembre 2021 – Junio 2023",
    description:
      "Formación sólida en fundamentos de programación, bases de datos, desarrollo frontend y backend, despliegue de aplicaciones y metodologías ágiles.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "MySQL", "Git"],
  },
];