import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "tern",
    companyName: "Tern",
    type: "Personal",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "Flight booking web app comparing lowest fares, fastest routes, and delay risk, built with Next.js, the Duffel API, and React Three Fiber.",
    websiteLink: "https://flytern.site",
    githubLink: "", // 저장소가 private(.env에 API 키 있음)이라 비워둠 — public으로 바뀌면 링크 추가
    techStack: ["Next.js", "Typescript", "React Three Fiber", "GSAP", "APIs"],
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-08-15"),
    companyLogoImg: "/projects/tern/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Tern is a flight booking platform that compares fares by more than just price — factoring in trip duration and delay risk — built with Next.js, the Duffel API, and React Three Fiber.",
        "Designed and implemented \"Civil Twilight,\" a custom glassmorphism design system, and migrated 3D visualizations from raw Three.js to React Three Fiber with GSAP ScrollTrigger for smoother scroll interactions.",
      ],
      bullets: [
        "Integrated real-time airport weather, layover badges, and airline logo overlays via third-party APIs.",
        "Added English/Korean internationalization support with next-intl.",
        "Conducted user research through Instagram Story polls to guide feature prioritization.",
      ],
    },
  },
  {
    id: "cosmos-rocket-thrust-stand",
    companyName: "Solid Propellant Rocket Thrust Test Stand",
    type: "Personal",
    category: ["Aerospace Engineering", "Hardware/Robotics"],
    shortDescription:
      "Led a 10-member team to design, build, and test a custom rocket motor thrust test stand, deriving peak thrust, total impulse, and specific impulse from live sensor data.",
    githubLink:
      "https://github.com/COSMOS-Aero-Engineering/Rocket-Thrust-Test-Stand",
    techStack: ["Arduino", "System Architecture", "Python"],
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-06-01"), // TODO: 정확한 완료 시점 확인
    companyLogoImg: "/logo.png", // TODO: 실제 프로젝트 로고/스크린샷으로 교체
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "As founder and president of COSMOS, the school's aero-engineering club, I led a 10-member team through a full theory to design to fabrication to test-validation cycle to build a solid/liquid rocket motor thrust test stand.",
        "The stand logs live thrust data during static-fire tests, enabling direct comparison between experimental results and theoretical predictions.",
      ],
      bullets: [
        "Directed two static-fire test iterations and diagnosed and resolved a data-logging failure between the first and second test.",
        "Analyzed thrust-time data to derive peak thrust (190N), total impulse (270.6 N·s), and specific impulse (95.2s).",
        "Cross-validated experimental results against theoretical predictions from a solid rocket internal ballistics simulator.",
      ],
    },
  },
  {
    id: "cosmos-aeroview-windtunnel",
    companyName: "Project AEROVIEW — Open-Circuit Suction Wind Tunnel",
    type: "Personal",
    category: ["Aerospace Engineering", "Hardware/Robotics"],
    shortDescription:
      "Directed the design, fabrication, and testing of an open-circuit suction wind tunnel used to compare airflow over multiple NACA airfoil profiles.",
    githubLink:
      "https://github.com/COSMOS-Aero-Engineering/COSMOS-Aeroview-Windtunnel",
    techStack: ["FreeCAD", "OpenSCAD", "System Architecture"],
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-06-01"), // TODO: 정확한 완료 시점 확인
    companyLogoImg: "/logo.png", // TODO: 실제 프로젝트 로고/스크린샷으로 교체
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Directed the parametric CAD design (FreeCAD, OpenSCAD) and fabrication of an open-circuit suction wind tunnel to compare airflow over NACA 0012, 2412, and 4412 airfoils.",
        "Managed the project across a six-week physical build cycle, from structural design through final assembly.",
      ],
      bullets: [
        "Identified and corrected a design-to-fabrication dimensional error through direct measurement and recalculation.",
        "Computed blockage ratios (1.4%–14% across angle of attack) to redesign support structures for improved flow accuracy.",
        "Directed physical assembly of the full wind tunnel structure.",
      ],
    },
  },
  {
    id: "ciws-drone-tracking-turret",
    companyName: "Automated CIWS Drone Tracking Turret",
    type: "Personal",
    category: ["Hardware/Robotics"],
    shortDescription:
      "Engineered an automated Close-In Weapon System (CIWS) style turret that autonomously detects and tracks moving drone targets.",
    techStack: ["Arduino", "Python", "System Architecture"],
    startDate: new Date("2025-01-01"), // TODO: 정확한 기간 확인
    endDate: new Date("2025-06-01"), // TODO: 정확한 기간 확인
    companyLogoImg: "/logo.png", // TODO: 실제 프로젝트 로고/스크린샷으로 교체
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Designed and engineered an automated turret system inspired by Close-In Weapon Systems (CIWS), built to autonomously detect and follow moving drone targets.",
      ],
      bullets: [
        "Developed real-time tracking algorithms and targeting logic.",
        "Integrated hardware control systems with an Arduino microcontroller to process real-time positioning data.",
      ],
    },
  },
  {
    id: "wind-tunnel-rc-aircraft",
    companyName: "F-22-Inspired RC Aircraft: Aerodynamic Design & Flight Stability Research",
    type: "Personal",
    category: ["Aerospace Engineering", "Hardware/Robotics"],
    shortDescription:
      "Designed, built, and flight-tested an F-22-inspired RC aircraft, then wrote a research paper on the correlation between its aerodynamic design variables and flight stability — 1st place, Physics Division, school research paper competition.",
    techStack: ["FreeCAD", "System Architecture"],
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-01-31"),
    companyLogoImg: "/logo.png", // TODO: 실제 프로젝트 로고/스크린샷으로 교체
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Built a functional wind tunnel to run empirical aerodynamic testing and flow visualization, then applied fundamental principles of flight and fluid dynamics to design, manufacture, and flight-test a custom F-22-inspired RC aircraft.",
        "Wrote this up as a research paper, \"Analysis of the Correlation Between Aerodynamic Design Variables and Flight Stability of an F-22-Based RC Aircraft,\" examining how structure and wing geometry choices shape flight characteristics through lift and drag.",
        "The paper won 1st place in the Physics Division of the school's research paper competition.",
      ],
      bullets: [
        "Analyzed lift and drag performance data from wind tunnel testing to optimize the design, stability, and control configuration of the RC aircraft.",
        "Optimized wingspan, wing profile, and structural stability based on empirical aerodynamic data.",
        "Flight-tested the finished aircraft to validate performance against design predictions and documented findings in a formal research paper.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
