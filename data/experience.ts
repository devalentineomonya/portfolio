export interface Role {
  title: string;
  type: string;
  dateRange: string;
  isCurrent?: boolean;
  description: string;
  technologies?: string[];
}

export interface Experience {
  company: string;
  location: string;
  roles: Role[];
}

export const experiences: Experience[] = [
  {
    company: "Freelance & Client Systems",
    location: "Nairobi, Kenya / Remote",
    roles: [
      {
        title: "Freelance Full-Stack Engineer",
        type: "Direct Client Work",
        dateRange: "2024 - Present",
        isCurrent: true,
        description:
          "Partnering with businesses to build high-converting Next.js websites and custom NestJS business software (POS, ERP, CRM). Engineered for maximum page speed, Google visibility, M-Pesa payment integration, and converting visitors into paying customers.",
        technologies: ["next.js", "nestjs", "pos", "erp", "crm", "seo", "m-pesa", "docker"],
      },
    ],
  },
  {
    company: "Transcom Media",
    location: "Nairobi, Kenya",
    roles: [
      {
        title: "Full-Stack Engineer & Consultant",
        type: "Client Systems",
        dateRange: "May 2024 - Present",
        isCurrent: true,
        description:
          "Architecting custom business websites, automation tools, and content management platforms for corporate clients to streamline operations and enhance digital presence.",
        technologies: ["php", "codeigniter", "wordpress", "mysql", "javascript"],
      },
    ],
  },
  {
    company: "University Computer Society",
    location: "Kenya",
    roles: [
      {
        title: "Lead Platform Architect & Vice Chair",
        type: "Product & Growth",
        dateRange: "Sep 2023 - Present",
        isCurrent: true,
        description:
          "Led development of the organization's community platform with NestJS and Next.js, integrating automated M-Pesa payments and member dashboards. Active users grew by 40% under my technical direction.",
        technologies: ["next.js", "nestjs", "m-pesa", "community", "mentorship"],
      },
    ],
  },
  {
    company: "Nine Hertz (Clinic Management)",
    location: "Nairobi, Kenya",
    roles: [
      {
        title: "Full-Stack Product Engineer",
        type: "Healthcare SaaS",
        dateRange: "2024",
        description:
          "Engineered a comprehensive clinic management and booking platform handling patient medical records, appointment scheduling, SMS reminders, and operational cashflow insights.",
        technologies: ["react", "nestjs", "docker", "postgresql"],
      },
    ],
  },
];
