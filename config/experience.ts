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
      "Developing staff tools and the public website for JSL Logistics during an ongoing software internship.",
      "Work includes a document-based support chatbot, photo-assisted damage review, a 3D cargo-loading planner, and shipment and trade-document interfaces. The chatbot retrieves source documents for its answers; inspection suggestions remain subject to staff review.",
    ],
    achievements: [],
    skills: ["Next.js", "Typescript", "Node.js", "MongoDB", "APIs"],
    companyUrl: "https://github.com/MINBBBB1201/jsl-project",
  },
  {
    id: "mintech",
    position: "Intern",
    company: "Mintech",
    location: "Asan, South Korea",
    endDate: "Completed",
    description: [
      "Completed an internship with the manufacturing technology team at Mintech's Asan plant, learning the structure and process flow of sputtering thin-film deposition equipment.",
      "Assisted with dimensional checks using vernier calipers and micrometers, equipment checks, and workplace organization. Onboarding covered manufacturing-quality fundamentals (4M), 3-jeong/5S, and workplace safety.",
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
      "Completed a camp program covering flight training devices (FTD), air traffic control (ATC), CubeSat design, and autonomous drone systems.",
      "Recognized for strong performance in the FTD and ATC simulation exercises.",
    ],
    achievements: [
      "Visited Korean Air and Asiana Airlines headquarters, touring aircraft hangars and completing evacuation slide and safety training.",
      "Took part in sessions on autonomous systems and urban air mobility (UAM).",
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
      "Founded COSMOS and led a 10-member team working on rocket instrumentation, wind-tunnel construction, and control experiments.",
      "Led the rocket thrust-stand project through two static-fire tests. After the first test failed to save its data, we corrected the recording sequence and captured a continuous thrust record in the second test.",
      "Directed Project AEROVIEW, an open-circuit suction wind tunnel: parametric CAD design (FreeCAD, OpenSCAD) to compare airflow over NACA 0012/2412/4412 airfoils.",
      "Coordinate the ongoing TVC-Hopper project, connecting reinforcement-learning simulations with avionics and mechanical design. Calibration and physical validation are still in progress.",
    ],
    achievements: [
      "Analyzed the second test's thrust curve, which reached about 190 N and a reported total impulse of 270.6 N·s, and compared it with an internal-ballistics simulation.",
      "Identified and corrected a design-to-fabrication dimensional error in the wind tunnel through direct measurement and recalculation.",
      "Used wind-tunnel blockage calculations of 1.4% to 14% across angles of attack to revise the support design. Final integration and airflow measurements remain pending.",
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
      "Designed Civil Twilight, a shared visual system of translucent panels, gradients, and reusable styles.",
      "Moved the landing-page 3D scenes from raw Three.js to React Three Fiber and coordinated scrolling with GSAP ScrollTrigger.",
    ],
    achievements: [
      "Integrated real-time airport weather, layover badges, and airline logo overlays.",
      "Added language-specific routes with next-intl; the app now supports English, Korean, Japanese, and Chinese.",
      "Used informal Instagram Story polls to help decide which flight-search features to prioritize.",
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
      "Co-developed DAEMUN III with Junwon Kim as Deputy Head of Technology. Our platform connected the public conference site, Roger AI assistant, organizer dashboard, and delegate submissions.",
      "Reworked Roger from keyword FAQ retrieval to answering with public conference data in context. Added streamed replies, a fallback provider route, evaluation questions, and Q&A logs for organizers.",
      "Built shared data models and validation, separate organizer and delegate permissions, and editing screens that update the public site without a code deployment.",
    ],
    achievements: [
      "Built document submissions with version history, team notifications, direct file uploads, and committee-level publishing. Expanded the FAQ seed document to 103 entries.",
      "Moved the platform from a Docker-based VPS to Vercel with Neon and Blob, and added document diagnostics that distinguish link reachability from a successful download or viewer session.",
    ],
    skills: ["Next.js", "Typescript", "PostgreSQL", "APIs", "Vercel", "Docker", "CI/CD", "System Architecture"],
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
      "Designed and tested a 4-bit ripple-carry adder on a breadboard using logic-gate ICs and LED indicators. Studied binary arithmetic and half- and full-adder circuits before connecting the four stages.",
      "Conceived the initial concept for a flight-booking web app within the club, which I later took further and built independently as Tern (see the Tern project).",
    ],
    achievements: [
      "Verified addition of 4-bit inputs with the breadboard circuit and its LED outputs.",
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
      "Attended a Chinese language and culture workshop at Shandong University in Weihai.",
      "Practiced Mandarin daily and joined cultural activities with an international group, including students from Russia.",
    ],
    achievements: [
      "Used Mandarin in daily conversations and practiced vocabulary outside the classroom.",
    ],
    skills: [],
    companyUrl: "",
    logo: "",
  },
];

const featuredExperienceIds = ["jsl-logistics", "cosmos", "daemun-iii"];
export const featuredExperiences = featuredExperienceIds.map((id) => experiences.find((experience) => experience.id === id)!);
