import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
    // featuredDescription: string;
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: "Home",
      description: "Minchan Kim's portfolio website.",
    },
  },
  skills: {
    title: "Skills",
    description: "Tools I use across AI-related work, software development, and engineering projects.",
    metadata: {
      title: "Skills",
      description:
        "Minchan Kim's key skills that define his professional identity.",
    },
  },
  projects: {
    title: "Projects",
    description: "Selected work in AI, software, and engineering, with ongoing development and completed contributions shown separately.",
    metadata: {
      title: "Projects",
      description:
        "Minchan Kim's selected AI, software, and engineering projects, including current development and completed team contributions.",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    metadata: {
      title: "Contact",
      description: "Contact Minchan Kim.",
    },
  },
  contributions: {
    title: "Contributions",
    description: "Open-source projects and community involvement.",
    metadata: {
      title: "Contributions",
      description: "Minchan Kim's open-source projects and community involvement.",
    },
  },
  resume: {
    title: "Resume",
    description: "Minchan Kim's resume.",
    metadata: {
      title: "Resume",
      description: "Minchan Kim's resume.",
    },
  },
  blogs: {
    title: "Blogs",
    description:
      "Devlogs on building Tern and other engineering projects.",
    metadata: {
      title: "Blogs",
      description:
        "Minchan Kim's devlogs — building Tern and other engineering projects.",
    },
  },
  experience: {
    title: "Experience",
    description: "Internships, team contributions, and engineering leadership behind my interest in AI.",
    metadata: {
      title: "Experience",
      description:
        "Minchan Kim's internships, software contributions, and engineering leadership.",
    },
  },
  community: {
    title: "Community & Leadership",
    description:
      "Student council, peer support, and school community involvement beyond engineering.",
    metadata: {
      title: "Community & Leadership",
      description:
        "Minchan Kim's leadership and community involvement at Qingdao Daewon School.",
    },
  },
};
