export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  link?: string;
  image?: string; // por si luego quieres añadir capturas
};

export const projects: Project[] = [
  {
    id: "ecommerce",
    title: "E‑commerce Full Stack",
    subtitle: "Tienda online con carrito, pagos y panel de administración",
    description:
      "Plataforma completa de venta de productos digitales, desde la navegación hasta la pasarela de pago.",
    problem:
      "El cliente necesitaba una tienda online rápida, segura y con capacidad de gestionar inventario y pedidos en tiempo real, sin depender de soluciones como Shopify.",
    solution:
      "Desarrollé una aplicación con Next.js (App Router) para el frontend y API Routes, Prisma ORM conectado a PostgreSQL, autenticación con NextAuth y pasarela de pagos con Stripe. El panel de administración permite gestionar productos, pedidos y usuarios.",
    impact:
      "Tiempos de carga inferiores a 2s, conversión del 3.2% en el primer mes y gestión autónoma por parte del cliente sin intervención técnica.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
      "Vercel",
    ],
    link: "https://ejemplo.com",
  },
  {
    id: "dashboard",
    title: "Dashboard de Analíticas",
    subtitle: "Visualización de datos en tiempo real para PYMEs",
    description:
      "Panel interactivo que transforma datos crudos en gráficos y métricas comprensibles.",
    problem:
      "La empresa manejaba grandes volúmenes de datos en hojas de cálculo y no podía tomar decisiones ágiles. Necesitaban una herramienta visual y actualizable automáticamente.",
    solution:
      "Construí un backend con Express y PostgreSQL para procesar datos, y un frontend con React, D3.js y WebSockets para actualizaciones en vivo. Implementé filtros dinámicos y exportación a PDF.",
    impact:
      "Reducción del 40% en tiempo de elaboración de informes y adopción inmediata por parte del equipo directivo.",
    technologies: [
      "React",
      "D3.js",
      "Express",
      "PostgreSQL",
      "WebSockets",
      "Docker",
    ],
    link: "https://ejemplo.com",
  },
  {
    id: "api-tareas",
    title: "API REST de Gestión de Tareas",
    subtitle: "Backend robusto con autenticación y documentación",
    description:
      "API lista para producción siguiendo principios RESTful y buenas prácticas de seguridad.",
    problem:
      "Un equipo de desarrollo necesitaba un backend escalable para su aplicación de productividad, con endpoints claros, roles de usuario y alta disponibilidad.",
    solution:
      "Diseñé una API con Node.js y Express, autenticación JWT, roles (admin/usuario), validación con Zod y documentación interactiva con Swagger. Base de datos MongoDB con Mongoose.",
    impact:
      "Reducción del 60% en tiempo de integración del frontend gracias a la documentación, y cero incidencias de seguridad en auditoría.",
    technologies: [
      "Node.js",
      "Express",
      "JWT",
      "MongoDB",
      "Mongoose",
      "Swagger",
      "Zod",
    ],
    link: "https://ejemplo.com",
  },
];