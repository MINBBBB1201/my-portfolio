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
    description: "Key skills that define my professional identity.",
    metadata: {
      title: "Skills",
      description:
        "Minchan Kim's key skills that define his professional identity.",
    },
  },
  projects: {
    title: "Projects",
    description: "Showcasing impactful projects and technical achievements.",
    metadata: {
      title: "Projects",
      description:
        "Minchan Kim's projects spanning web development and aerospace engineering.",
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
    description: "Journey across software and aerospace engineering.",
    metadata: {
      title: "Experience",
      description:
        "Minchan Kim's journey across software and aerospace engineering.",
    },
  },
};
