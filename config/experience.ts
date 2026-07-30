import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "tern",
    position: "Founder & Developer",
    company: "Tern",
    location: "Gyeonggi, South Korea",
    startDate: new Date("2026-03-01"),
    endDate: "Present",
    description: [
      "Built Tern (flytern.site), a flight booking web app using Next.js, the Duffel API, and React Three Fiber.",
      "Designed and implemented \"Civil Twilight,\" a custom glassmorphism design system.",
      "Migrated 3D visualizations from raw Three.js to React Three Fiber with GSAP ScrollTrigger for smoother scroll interactions.",
    ],
    achievements: [
      "Integrated real-time airport weather, layover badges, and airline logo overlays.",
      "Added English/Korean internationalization via next-intl.",
      "Conducted user research through Instagram Story polls to guide feature prioritization.",
    ],
    skills: ["Next.js", "Typescript", "React Three Fiber", "GSAP", "APIs"],
    companyUrl: "https://flytern.site",
    logo: "",
  },
  {
    id: "mechanics-club",
    position: "Vice President",
    company: "Mechanics Club",
    location: "Qingdao Daewon School",
    startDate: new Date("2026-03-01"),
    endDate: "Present",
    description: [
      "Designed and built a 4-bit Ripple Carry Adder from scratch — researched binary arithmetic, logic gates (AND/OR/XOR), and half-/full-adder theory, then implemented and verified the circuit on a breadboard with logic gate ICs and LED indicators.",
      "Conceived and am building SmartFlight, a flight booking web app (Next.js 16, React 19, Firebase, Three.js) with flight search, seat selection, and reservation features, using AI-assisted development workflows while maintaining engineering rigor.",
    ],
    achievements: [
      "Combined circuit-level hardware understanding with software engineering, bridging low-level digital logic and applied product development.",
    ],
    skills: ["Digital Logic", "Next.js", "React", "Firebase", "Three.js"],
    companyUrl: "",
    logo: "",
  },
  {
    id: "cosmos",
    position: "Founder & President",
    company: "COSMOS (Aero-Engineering Club)",
    location: "Qingdao Daewon School",
    startDate: new Date("2025-09-01"),
    endDate: "Present",
    description: [
      "Founded and led a 10-member aerospace engineering club through full theory to design to fabrication to test-validation project cycles.",
      "Directed the Solid Propellant Rocket Thrust Test Stand project: two static-fire test iterations, diagnosed and resolved a data-logging failure between tests.",
      "Analyzed thrust-time data to derive peak thrust (190N), total impulse (270.6 N·s), and specific impulse (95.2s), cross-validated against theoretical predictions from a solid rocket internal ballistics simulator.",
    ],
    achievements: [
      "Directed Project AEROVIEW, an open-circuit suction wind tunnel: parametric CAD design (FreeCAD, OpenSCAD) to compare airflow over NACA 0012/2412/4412 airfoils.",
      "Identified and corrected a design-to-fabrication dimensional error through direct measurement and recalculation.",
      "Computed blockage ratios (1.4%–14% across angle of attack) to redesign support structures for improved flow accuracy; directed physical assembly across a 6-week build cycle.",
    ],
    skills: ["FreeCAD", "OpenSCAD", "Arduino", "System Architecture"],
    companyUrl: "https://github.com/COSMOS-Aero-Engineering",
    logo: "",
  },
  {
    id: "shandong-university",
    position: "Workshop Participant",
    company: "Shandong University",
    location: "Weihai, Shandong, China",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-08-01"),
    description: [
      "Participated in a cultural immersion workshop focused on Chinese language and culture.",
      "Engaged in daily Mandarin practice sessions and cultural activities alongside an international cohort, including students from Russia.",
    ],
    achievements: [
      "Built cross-cultural communication skills and expanded HSK vocabulary in a real-world setting.",
    ],
    skills: [],
    companyUrl: "",
    logo: "",
  },
];
