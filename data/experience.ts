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
    company: "Transcom Media",
    location: "Nairobi, Kenya",
    roles: [
      {
        title: "Software Engineering Attaché",
        type: "Attachment",
        dateRange: "May 2026 - Present",
        isCurrent: true,
        description:
          "I build custom websites and tools for business clients using PHP, CodeIgniter and WordPress, so their day-to-day work runs more smoothly.",
        technologies: [
          "php",
          "codeigniter",
          "wordpress",
          "mysql",
          "javascript",
        ],
      },
    ],
  },
  {
    company: "University Computer Society",
    location: "Kenya",
    roles: [
      {
        title: "Vice Chairperson",
        type: "Leadership",
        dateRange: "May 2026 - Present",
        isCurrent: true,
        description:
          "I help run the society day to day: organising workshops, supporting members and planning what we do next, so more students get into tech.",
        technologies: ["leadership", "teamwork", "community", "mentorship"],
      },
      {
        title: "Development Lead",
        type: "Core",
        dateRange: "Sep 2025 - Present",
        description:
          "I led both the front-end and back-end teams and built much of the front end myself. We delivered the society's platform with AI features and M-Pesa payments, and active users grew by 40%.",
        technologies: ["nestjs", "docker", "openai", "stripe", "rabbitmq"],
      },
    ],
  },
  {
    company: "Teach2Give",
    location: "On-Site Attachment",
    roles: [
      {
        title: "Software Engineering Attaché",
        type: "Attachment",
        dateRange: "May 2025 - Jul 2025",
        description:
          "I worked on real projects with React and NestJS, learned Docker and Azure DevOps for automated releases, and got better at leading, teamwork and writing things down clearly.",
        technologies: [
          "react",
          "nestjs",
          "docker",
          "typescript",
          "git",
          "github",
        ],
      },
    ],
  },
  {
    company: "Godan Info",
    location: "Remote Internship",
    roles: [
      {
        title: "Frontend Web Developer",
        type: "Internship",
        dateRange: "Jan 2025 - Apr 2025",
        description:
          "I built parts of a customer dashboard with React and Ant Design, working with the team on screens that adapt to each user's role and make their daily work easier.",
        technologies: ["react", "antdesign", "javascript", "ui/ux", "frontend"],
      },
    ],
  },
];
