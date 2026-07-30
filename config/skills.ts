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
      "Effortlessly build dynamic apps with routing, layouts, loading UI, and API routes.",
    rating: 5,
    icon: Icons.nextjs,
  },
  {
    name: "TypeScript",
    description:
      "Enhance JavaScript with static types, making code more understandable and reliable.",
    rating: 5,
    icon: Icons.typescript,
  },
  {
    name: "React",
    description:
      "Craft interactive user interfaces using components, state, props, and virtual DOM.",
    rating: 4,
    icon: Icons.react,
  },
  {
    name: "React Three Fiber",
    description:
      "Build interactive 3D scenes and visualizations declaratively on top of Three.js and React.",
    rating: 4,
    icon: Icons.threejs,
  },
  {
    name: "GSAP",
    description:
      "Choreograph smooth scroll-driven and interactive animations with ScrollTrigger.",
    rating: 3,
    icon: Icons.gsap,
  },
  {
    name: "Python",
    description:
      "Analyze data, automate workflows, and prototype logic across engineering and software projects.",
    rating: 3,
    icon: Icons.python,
  },
  {
    name: "System Architecture",
    description:
      "Design maintainable, scalable structures for full-stack applications and hardware systems alike.",
    rating: 3,
    icon: Icons.settings,
  },
  {
    name: "APIs",
    description:
      "Integrate and design REST APIs to connect real-time data sources into applications.",
    rating: 4,
    icon: Icons.link,
  },
  {
    name: "Tailwind CSS",
    description:
      "Design beautiful, modern websites faster with a utility-first CSS framework.",
    rating: 4,
    icon: Icons.tailwindcss,
  },
  {
    name: "Arduino",
    description:
      "Prototype and control hardware systems with microcontrollers for real-time sensing and actuation.",
    rating: 3,
    icon: Icons.arduino,
  },
  {
    name: "FreeCAD",
    description:
      "Design parametric CAD models for fabrication, from wind tunnels to structural components.",
    rating: 3,
    icon: Icons.freecad,
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
