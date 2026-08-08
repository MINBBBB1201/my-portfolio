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
    id: "kau-aerospace-camp",
    position: "Aerospace & Space Camp Participant",
    company: "Korea Aerospace University",
    location: "Goyang, South Korea",
    startDate: new Date("2026-08-01"),
    endDate: new Date("2026-08-31"),
    description: [
      "Participated in an intensive aerospace program covering flight simulation (FTD), air traffic control (ATC), cube satellite design, and autonomous drone systems.",
      "Recognized for strong performance in the FTD and ATC simulation exercises.",
    ],
    achievements: [
      "Visited Korean Air and Asiana Airlines headquarters, touring aircraft hangars and completing evacuation slide and safety training.",
      "Gained hands-on exposure to how AI and autonomous systems are integrated into modern aerospace engineering and urban air mobility (UAM).",
    ],
    skills: [],
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
      "Directed the Solid Propellant Rocket Thrust Test Stand project: two static-fire test iterations, diagnosing and resolving a data-logging failure between tests, then deriving peak thrust (190N), total impulse (270.6 N·s), and specific impulse (95.2s) from the results.",
      "Directed Project AEROVIEW, an open-circuit suction wind tunnel: parametric CAD design (FreeCAD, OpenSCAD) to compare airflow over NACA 0012/2412/4412 airfoils.",
    ],
    achievements: [
      "Cross-validated rocket thrust-stand results against theoretical predictions from a solid rocket internal ballistics simulator.",
      "Identified and corrected a design-to-fabrication dimensional error in the wind tunnel through direct measurement and recalculation.",
      "Computed blockage ratios (1.4%–14% across angle of attack) to redesign the wind tunnel's support structures for improved flow accuracy; directing fabrication and assembly, with final integration and airflow testing planned for next semester.",
    ],
    skills: ["FreeCAD", "OpenSCAD", "Arduino", "System Architecture"],
    companyUrl: "https://github.com/COSMOS-Aero-Engineering",
    logo: "",
  },
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
      "Conceived the initial concept for a flight-booking web app within the club, which I later took further and built independently as Tern (see the Tern project).",
    ],
    achievements: [
      "Combined circuit-level hardware understanding with software engineering, bridging low-level digital logic and applied product development.",
    ],
    skills: ["Digital Logic", "Next.js", "React"],
    companyUrl: "",
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
