import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Next.js",
    description:
      "Build pages, server routes, and shared layouts for Tern, DAEMUN III, and this portfolio.",
    rating: 5,
    icon: Icons.nextjs,
  },
  {
    name: "TypeScript",
    description:
      "Define data types and check the interfaces between pages, APIs, and shared packages.",
    rating: 5,
    icon: Icons.typescript,
  },
  {
    name: "React",
    description:
      "Build reusable components for search results, dashboards, forms, and chat interfaces.",
    rating: 4,
    icon: Icons.react,
  },
  {
    name: "React Three Fiber",
    description:
      "Create Tern's 3D landing-page scenes inside the React component tree.",
    rating: 4,
    icon: Icons.threejs,
  },
  {
    name: "GSAP",
    description:
      "Coordinate scroll-based camera movement and transitions in Tern's landing page.",
    rating: 3,
    icon: Icons.gsap,
  },
  {
    name: "Python",
    description:
      "Work with computer-vision tracking scripts, engineering data analysis, and the COSMOS reinforcement-learning project.",
    rating: 3,
    icon: Icons.python,
  },
  {
    name: "System Architecture",
    description:
      "Connect web applications, APIs, databases, and the sensing and control parts of engineering projects.",
    rating: 3,
    icon: Icons.settings,
  },
  {
    name: "APIs",
    description:
      "Connect flight search, weather, AI providers, and document workflows to web interfaces.",
    rating: 4,
    icon: Icons.link,
  },
  {
    name: "Tailwind CSS",
    description:
      "Style responsive pages and reusable components across my web projects.",
    rating: 4,
    icon: Icons.tailwindcss,
  },
  {
    name: "Arduino",
    description:
      "Translate camera-based tracking into servo movement and collect sensor data for physical experiments.",
    rating: 3,
    icon: Icons.arduino,
  },
  {
    name: "FreeCAD",
    description:
      "Model wind-tunnel components and mechanical parts with dimensions that can be revised before fabrication.",
    rating: 3,
    icon: Icons.freecad,
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = ["Python", "APIs", "System Architecture", "Arduino", "Next.js", "TypeScript"].map(
  (name) => skills.find((skill) => skill.name === name)!
);
