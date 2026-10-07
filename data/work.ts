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
      "A healthcare app for clinics. It handles bookings, patient records, reminders and helpful health insights, all in one place.",
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
      "Devaltech, my web studio for businesses. Client work, case studies and prices live here.",
    image: "/work/studio-desktop.webp",
    mobileImage: "/work/studio-mobile.webp",
    url: "https://www.devaltech.co.ke",
    technologies: ["next.js", "react"],
  },
  {
    title: "lazyDLP",
    category: "Personal",
    description:
      "A friendlier way to use yt-dlp. A terminal app that downloads videos and audio without making you memorize commands.",
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
      "A budgeting app that reads your M-Pesa messages and fills in your spending for you. It all stays private on your phone, with simple AI tips on top.",
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
      "The home of a university computer society, with members, events and tech resources in one place.",
    image: "/work/computer-society-desktop.webp",
    mobileImage: "/work/computer-society-mobile.webp",
    url: "https://computersocietyofkirinyaga.org",
    technologies: ["next.js", "tailwind"],
  },
  {
    title: "Tekobliss",
    category: "Client",
    description:
      "A fast, modern website for Tekobliss that shows off the brand and turns visitors into clients.",
    image: "/work/tekobliss-desktop.webp",
    mobileImage: "/work/tekobliss-mobile.webp",
    url: "https://tekobliss.com/",
    technologies: ["react", "branding"],
  },
  {
    title: "PBQ Simulator",
    category: "Client",
    description:
      "A practice tool that lets students try hands-on IT exam questions before the real test.",
    image: "/work/pbq-simulator-desktop.webp",
    mobileImage: "/work/pbq-simulator-mobile.webp",
    url: "https://pbqsimulator.com/",
    technologies: ["react", "nestjs"],
  },
  {
    title: "Arorwet Secondary",
    category: "Client",
    description:
      "A clear, easy-to-use website and portal for Arorwet Secondary School, so students and parents find what they need.",
    image: "/work/arorwet-desktop.webp",
    mobileImage: "/work/arorwet-mobile.webp",
    url: "https://www.arorwetsecondary.sc.ke/",
    technologies: ["next.js", "cms"],
  },
  {
    title: "Shopping Cart",
    category: "Archived",
    description: "A shopping cart I built to practice how online stores work.",
    url: "https://shoppingcart.devalentine.com/",
    technologies: [],
    archived: true,
  },
  {
    title: "DevalExpenses",
    category: "Archived",
    description: "An older expense tracker for keeping an eye on spending.",
    url: "https://expenses.devalentine.com",
    technologies: [],
    archived: true,
  },
  {
    title: "PHP Job Portal",
    category: "Archived",
    description:
      "A university class project where people post jobs and apply for them, built with PHP.",
    url: "https://php-job-management-portal.onrender.com/",
    technologies: [],
    archived: true,
  },
  {
    title: "DevalRide",
    category: "Archived",
    description: "An early prototype of a ride-hailing app.",
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
