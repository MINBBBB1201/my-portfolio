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
    description: "AI, software, and engineering projects by Minchan Kim.",
    metadata: {
      title: "Home",
      description: "Minchan Kim's projects, internships, and school activities.",
    },
  },
  skills: {
    title: "Skills",
    description: "The tools I use and how I use them in my projects.",
    metadata: {
      title: "Skills",
      description:
        "Tools Minchan Kim uses for AI projects, web development, and engineering.",
    },
  },
  projects: {
    title: "Projects",
    description: "AI experiments, web applications, and engineering builds. Each project includes its current status and my role.",
    metadata: {
      title: "Projects",
      description:
        "Minchan Kim's selected AI, software, and engineering projects, including current development and completed team contributions.",
    },
  },
  contact: {
    title: "Contact",
    description: "Have a question about a project or want to work together? Send me a message.",
    metadata: {
      title: "Contact",
      description: "Contact Minchan Kim.",
    },
  },
  contributions: {
    title: "Contributions",
    description: "Repositories I build, contribute to, or explore. Each entry describes my involvement.",
    metadata: {
      title: "Contributions",
      description: "Minchan Kim's software and engineering repositories, with his role in each.",
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
        "Minchan Kim's development notes on Tern, AI integrations, and engineering projects.",
    },
  },
  experience: {
    title: "Experience",
    description: "My work in internships, school clubs, and software teams.",
    metadata: {
      title: "Experience",
      description:
        "Minchan Kim's internships, software contributions, and engineering leadership.",
    },
  },
  community: {
    title: "Community & Leadership",
    description:
      "Student council, peer support, Model UN, and activities outside my technical projects.",
    metadata: {
      title: "Community & Leadership",
      description:
        "Minchan Kim's leadership and community involvement at Qingdao Daewon School.",
    },
  },
};
