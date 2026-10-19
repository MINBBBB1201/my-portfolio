import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate?: Date;
  endDate: Date | "Present" | "Completed";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "jsl-logistics",
    position: "Intern",
    company: "JSL Logistics",
    location: "",
    endDate: "Present",
    description: [
      "Working on an ongoing logistics software project spanning AI-assisted tools, operational interfaces, and the public-facing website.",
      "The codebase includes retrieval-backed support, image-assisted damage inspection, shipment workflows, and trade-document tools. Current design work includes multilingual interfaces and a separate 3D motion prototype.",
    ],
    achievements: [],
    skills: ["Next.js", "Typescript", "Node.js", "MongoDB", "APIs"],
    companyUrl: "https://github.com/MINBBBB1201/jsl-project",
  },
  {
    id: "mintech",
    position: "Intern",
    company: "Mintech",
    location: "",
    endDate: "Completed",
    description: [
      "Completed an internship at Mintech.",
      "The onboarding material covered manufacturing-quality fundamentals (4M), workplace organization (5S), and workplace safety.",
    ],
    achievements: [],
    skills: [],
  },
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
      "Currently coordinating the TVC-Hopper project, bringing together reinforcement learning, conventional control, simulation, avionics, and mechanical design. Hardware integration and physical validation are ongoing.",
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
    id: "daemun-iii",
    position: "Deputy Head of Technology",
    company: "DAEMUN III (Daewon Model UN)",
    location: "Qingdao Daewon School",
    startDate: new Date("2026-08-01"),
    endDate: "Completed",
    description: [
      "Served as Deputy Head of Technology for DAEMUN III, building the first Roger AI assistant and admin/delegate workflows within the team's Next.js, Hono, and PostgreSQL codebase.",
      "Implemented FAQ retrieval, a Gemini chat endpoint, the website widget, and organizer-facing question-and-answer logs; documented retrieval limitations and evaluation questions.",
      "Built team assignment and lead-only submissions, upload version history, team notifications, and committee-level publishing controls.",
    ],
    achievements: [
      "Expanded the beginner-focused FAQ seed document to 103 entries and refined the chatbot's handling of greetings and missing information.",
      "Extended direct-to-storage uploads to delegates to handle files beyond the function request-body limit, and developed admin content-editing screens.",
    ],
    skills: ["Next.js", "Typescript", "PostgreSQL", "APIs"],
    companyUrl: "https://github.com/junwonkim07/DAEMUN-III",
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

const featuredExperienceIds = ["jsl-logistics", "cosmos", "daemun-iii"];
export const featuredExperiences = featuredExperienceIds.map((id) => experiences.find((experience) => experience.id === id)!);
