import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  videoArr?: string[];
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
  paperLink?: string;
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
    companyLogoImg: "/projects/cosmos-rocket-thrust-stand/01-hero-static-fire.png",
    pagesInfoArr: [
      {
        title: "Design & Assembly",
        description:
          "Parametric CAD design of the thrust stand and load cell mount, followed by physical assembly of the aluminum extrusion frame.",
        imgArr: [
          "/projects/cosmos-rocket-thrust-stand/02-cad-propellant-mix.png",
          "/projects/cosmos-rocket-thrust-stand/03-assembled-stand.png",
          "/projects/cosmos-rocket-thrust-stand/04-stand-side-view.png",
          "/projects/cosmos-rocket-thrust-stand/05-stand-frame-top.png",
        ],
      },
      {
        title: "Propellant Casting & Instrumentation",
        description:
          "Hand-cast solid propellant grains (KNO3/sorbitol-based) and wired the load cell + microcontroller data-logging chain used to capture thrust during static fire.",
        imgArr: [
          "/projects/cosmos-rocket-thrust-stand/06-propellant-mixing.png",
          "/projects/cosmos-rocket-thrust-stand/07-component-kit.png",
          "/projects/cosmos-rocket-thrust-stand/08-component-array.png",
          "/projects/cosmos-rocket-thrust-stand/09-loadcell-wiring-diagram.png",
        ],
      },
      {
        title: "Static-Fire Test & Results",
        description:
          "Live static-fire footage alongside the thrust-time curve logged during the test, from which peak thrust, total impulse, and specific impulse were derived.",
        imgArr: [
          "/projects/cosmos-rocket-thrust-stand/10-ready-for-test.png",
          "/projects/cosmos-rocket-thrust-stand/11-thrust-time-graph.png",
        ],
        videoArr: ["/projects/cosmos-rocket-thrust-stand/12-static-fire-test.mp4"],
      },
    ],
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
      "Directing the parametric CAD design and fabrication of an open-circuit suction wind tunnel to compare airflow over multiple NACA airfoil profiles — in progress, continuing next semester.",
    githubLink:
      "https://github.com/COSMOS-Aero-Engineering/COSMOS-Aeroview-Windtunnel",
    techStack: ["FreeCAD", "OpenSCAD", "System Architecture"],
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-12-01"), // 다음 학기(2학기)에 이어서 진행 예정 — 아직 미완성
    companyLogoImg: "/projects/cosmos-aeroview-windtunnel/01-hero-full-assembly.jpg",
    pagesInfoArr: [
      {
        title: "Parametric CAD Design",
        description:
          "Modeled every subsystem parametrically — fan box, wing/airfoil mount, and flow-straightener honeycomb panel — in FreeCAD and OpenSCAD before fabrication.",
        imgArr: [
          "/projects/cosmos-aeroview-windtunnel/02-cad-full-assembly-render.png",
          "/projects/cosmos-aeroview-windtunnel/03-cad-fan-box.png",
          "/projects/cosmos-aeroview-windtunnel/04-cad-wing-mount.png",
          "/projects/cosmos-aeroview-windtunnel/05-cad-flow-straightener.png",
        ],
      },
      {
        title: "Fabrication & Assembly",
        description:
          "Built the plywood fan box and diffuser/nozzle sections from the CAD drawings, mounting a 4-fan intake array to drive suction airflow.",
        imgArr: [
          "/projects/cosmos-aeroview-windtunnel/06-fan-box-assembly.jpg",
          "/projects/cosmos-aeroview-windtunnel/07-frame-construction.jpg",
          "/projects/cosmos-aeroview-windtunnel/08-fan-array-closeup.jpg",
          "/projects/cosmos-aeroview-windtunnel/09-fan-box-open.jpg",
        ],
      },
      {
        title: "Flow Visualization & Current Status",
        description:
          "Set up a fog-machine flow visualization rig and built the clear acrylic test section for airfoil comparison. The tunnel is still under construction — final assembly and airflow testing are planned for next semester.",
        imgArr: [
          "/projects/cosmos-aeroview-windtunnel/10-smoke-flow-visualization-setup.jpg",
          "/projects/cosmos-aeroview-windtunnel/11-test-section.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Directed the parametric CAD design (FreeCAD, OpenSCAD) and fabrication of an open-circuit suction wind tunnel to compare airflow over NACA 0012, 2412, and 4412 airfoils.",
        "Managed the project across a six-week physical build cycle, from structural design through final assembly. The tunnel is still under construction as of this writing — final assembly and airflow data collection are planned for next semester.",
      ],
      bullets: [
        "Identified and corrected a design-to-fabrication dimensional error through direct measurement and recalculation.",
        "Computed blockage ratios (1.4%–14% across angle of attack) to redesign support structures for improved flow accuracy.",
        "Directing fabrication and assembly of the fan box, diffuser, and flow-visualization test section, with final integration and airflow testing planned for next semester.",
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
    companyLogoImg:
      "/projects/ciws-drone-tracking-turret/09-dual-turret-assembly.jpg",
    pagesInfoArr: [
      {
        title: "Components & Circuit Design",
        description:
          "Sourced servos, a camera module, and control electronics, and prototyped the pan-tilt control circuit before physical assembly.",
        imgArr: [
          "/projects/ciws-drone-tracking-turret/01-parts-kit.jpg",
          "/projects/ciws-drone-tracking-turret/02-circuit-diagram.jpg",
          "/projects/ciws-drone-tracking-turret/03-servo-bracket.jpg",
          "/projects/ciws-drone-tracking-turret/05-servo-mount-closeup.jpg",
        ],
      },
      {
        title: "Assembly",
        description:
          "Built up a single-axis pan-tilt prototype first, then integrated the camera module and status LED indicator before scaling to a dual-turret setup.",
        imgArr: [
          "/projects/ciws-drone-tracking-turret/04-single-axis-build.jpg",
          "/projects/ciws-drone-tracking-turret/06-led-power-module.jpg",
          "/projects/ciws-drone-tracking-turret/07-camera-servo-assembled.jpg",
          "/projects/ciws-drone-tracking-turret/08-camera-module-closeup.jpg",
        ],
      },
      {
        title: "Dual-Turret Tracking Demo",
        description:
          "Final dual-turret rig with battery power, running a live OpenCV/YOLO-based tracking script that follows a target in real time and drives both turrets' servo angles.",
        imgArr: [
          "/projects/ciws-drone-tracking-turret/09-dual-turret-assembly.jpg",
          "/projects/ciws-drone-tracking-turret/10-dual-turret-battery.jpg",
          "/projects/ciws-drone-tracking-turret/11-live-tracking-demo.jpg",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Designed and engineered an automated turret system inspired by Close-In Weapon Systems (CIWS), built to autonomously detect and follow moving drone targets.",
        "Built up from a single-servo pan-tilt prototype to a dual-turret rig, driven by an OpenCV/YOLO-based Python vision pipeline running on an Arduino-controlled servo mount.",
      ],
      bullets: [
        "Developed real-time tracking algorithms and targeting logic using OpenCV and a YOLO object-detection model.",
        "Integrated hardware control systems with an Arduino microcontroller to process real-time positioning data and drive dual pan-tilt turrets.",
        "Debugged environment and dependency issues (PyTorch model loading, missing packages) to get the vision pipeline running reliably end-to-end.",
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
    companyLogoImg: "/projects/wind-tunnel-rc-aircraft/01-hero-aircraft-topdown.jpg",
    paperLink: "/projects/wind-tunnel-rc-aircraft/research-paper.pdf",
    pagesInfoArr: [
      {
        title: "The Test Aircraft",
        description:
          "A hand-built, hand-painted foam-board test article — not a scale showpiece, but a functional platform for gathering real flight data. Motors, control surfaces, and wiring are all scratch-built.",
        imgArr: [
          "/projects/wind-tunnel-rc-aircraft/01-hero-aircraft-topdown.jpg",
          "/projects/wind-tunnel-rc-aircraft/02-aircraft-build-detail.jpg",
        ],
      },
      {
        title: "Flight Test",
        description:
          "Outdoor flight test used to validate the design predictions from wind tunnel data against real flight behavior.",
        imgArr: [],
        videoArr: ["/projects/wind-tunnel-rc-aircraft/03-flight-test.mp4"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Built a functional wind tunnel to run empirical aerodynamic testing and flow visualization, then applied fundamental principles of flight and fluid dynamics to design, manufacture, and flight-test a custom F-22-inspired RC aircraft.",
        "The aircraft itself is a hand-built foam-board test article — built for generating real flight data to validate against wind tunnel predictions, not as a polished scale model.",
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
