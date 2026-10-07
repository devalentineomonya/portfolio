export interface WorkProject {
  title: string;
  category: string;
  description: string;
  /** Desktop screenshot, shown inside the browser frame. */
  image?: string;
  /** Mobile screenshot, shown inside the phone frame. Falls back to `image`. */
  mobileImage?: string;
  url: string;
  technologies: string[];
  year?: string;
  /** Footer label, e.g. "Live", "Open Source", "Under NDA". Defaults to "Live". */
  status?: string;
  /** Spans the full row of the grid with a taller preview stage. */
  featured?: boolean;
  archived?: boolean;
}

export const workProjects: WorkProject[] = [
  {
    title: "Nine Hertz",
    category: "Personal",
    description:
      "An AI powered health care system with features like appointment scheduling, patient record management, reminders, medical insights.",
    image: "/work/nine-hertz-desktop.webp",
    mobileImage: "/work/nine-hertz-mobile.webp",
    url: "https://medic.devalentine.com",
    technologies: ["react", "nestjs", "docker"],
    featured: true,
  },
  {
    title: "Studio",
    category: "Brand",
    description:
      "A dedicated brand website meticulously crafted to showcase my premium client work, technical case studies, and professional services.",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    mobileImage: "/work/studio-mobile.webp",
    url: "https://studio.devalentine.com",
    technologies: ["next.js", "react"],
  },
  {
    title: "lazyDLP",
    category: "Personal",
    description:
      "A powerful, interactive command-line wrapper for yt-dlp, making it incredibly easy to download media without memorizing complex flags.",
    image: "/work/lazydlp-desktop.webp",
    mobileImage: "/work/lazydlp-mobile.webp",
    url: "https://github.com/devalentineomonya/lazydlp",
    technologies: ["react", "ink tui"],
    status: "Open Source",
  },
  {
    title: "Journaling",
    category: "Personal",
    description:
      "A privacy-first personal finance app that parses M-Pesa SMS messages natively to log transactions, track budgets, and provide AI spending insights.",
    image: "/work/journaling-desktop.webp",
    mobileImage: "/work/journaling-mobile.webp",
    url: "https://journauling.devalentine.com/",
    technologies: ["react native", "expo", "ai"],
    featured: true,
  },
  {
    title: "University Computer Society",
    category: "Volunteer",
    description:
      "The official web platform for a university computer society, serving as a central hub for members, events, and tech community resources.",
    image: "/work/computer-society-desktop.webp",
    mobileImage: "/work/computer-society-mobile.webp",
    url: "https://computersocietyofkirinyaga.org",
    technologies: ["next.js", "tailwind"],
  },
  {
    title: "Tekobliss",
    category: "Client",
    description:
      "A sleek, highly performant corporate website for Tekobliss, designed with a focus on modern branding and driving client conversions.",
    image: "/work/tekobliss-desktop.webp",
    mobileImage: "/work/tekobliss-mobile.webp",
    url: "https://tekobliss.com/",
    technologies: ["react", "branding"],
  },
  {
    title: "PBQ Simulator",
    category: "Client",
    description:
      "An interactive Performance-Based Questions (PBQ) Simulator engineered to help students prepare for complex, hands-on IT certification exams.",
    image: "/work/pbq-simulator-desktop.webp",
    mobileImage: "/work/pbq-simulator-mobile.webp",
    url: "https://pbqsimulator.com/",
    technologies: ["react", "nestjs"],
  },
  {
    title: "Arorwet Secondary",
    category: "Client",
    description:
      "A modern, accessible digital presence and school management portal for Arorwet Secondary School, streamlining information access.",
    image: "/work/arorwet-desktop.webp",
    mobileImage: "/work/arorwet-mobile.webp",
    url: "https://www.arorwetsecondary.sc.ke/",
    technologies: ["next.js", "cms"],
  },
  {
    title: "Shopping Cart",
    category: "Archived",
    description: "A frontend e-commerce shopping cart implementation.",
    url: "https://shoppingcart.devalentine.com/",
    technologies: [],
    archived: true,
  },
  {
    title: "DevalExpenses",
    category: "Archived",
    description: "A legacy financial tracking and budgeting web application.",
    url: "https://expenses.devalentine.com",
    technologies: [],
    archived: true,
  },
  {
    title: "PHP Job Portal",
    category: "Archived",
    description:
      "A university class project for managing job applications, built with PHP.",
    url: "https://php-job-management-portal.onrender.com/",
    technologies: [],
    archived: true,
  },
  {
    title: "DevalRide",
    category: "Archived",
    description: "A legacy ride-hailing platform prototype interface.",
    url: "https://ride.devalentine.com",
    technologies: [],
    archived: true,
  },
];

export const getProject = (title: string): WorkProject => {
  const project = workProjects.find((p) => p.title === title);
  if (!project) throw new Error(`Unknown project: ${title}`);
  return project;
};

export const getHost = (url: string) =>
  new URL(url).hostname.replace(/^www\./, "");
