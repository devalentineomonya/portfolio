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
          "I build websites, online stores and business software (POS, ERP, CRM) for businesses, with M-Pesa payments built in. I handle the whole job: plan, build, launch and support.",
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
          "I build business websites, automation tools and content systems for corporate clients, so their teams spend less time on manual work.",
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
          "I lead the build of the society's community platform on Next.js and NestJS, with M-Pesa payments and member dashboards. Active users grew by 40% under my lead.",
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
          "Built a clinic platform for bookings, patient records, SMS reminders and cashflow reports, all in one place.",
        technologies: ["react", "nestjs", "docker", "postgresql"],
      },
    ],
  },
];
