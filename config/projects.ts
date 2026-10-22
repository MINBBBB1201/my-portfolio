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
  demoLink?: string;
  context?: string;
  techStack: ValidSkills[];
  startDate?: Date;
  period?: string;
  endDate?: Date;
  status?: "In progress" | "Completed";
  role?: string;
  companyLogoImg?: string;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "cosmos-tvc-hopper",
    context: "COSMOS club project",
    companyLogoImg: "/projects/cosmos-tvc-hopper/preview_colored.png",
    companyName: "COSMOS TVC-Hopper: Reinforcement Learning & Control",
    type: "Personal",
    category: ["Reinforcement Learning", "Aerospace Engineering", "Hardware/Robotics"],
    status: "In progress",
    role: "COSMOS Founder & President; project coordination",
    shortDescription: "An ongoing COSMOS project comparing reinforcement learning with conventional attitude control for an electric-ducted-fan hopper. We are building the simulation and hardware; physical validation is still in progress.",
    githubLink: "https://github.com/COSMOS-Aero-Engineering/COSMOS-TVC-Hopper",
    techStack: ["Python", "PyTorch", "FreeCAD", "System Architecture"],
    pagesInfoArr: [{
      title: "CAD design preview",
      description: "Current design renders from the COSMOS repository: the hopper assembly and a close-up of the four-vane ring. These are CAD models; calibration, hardware integration and physical validation are still in progress.",
      imgArr: ["/projects/cosmos-tvc-hopper/preview_colored.png", "/projects/cosmos-tvc-hopper/vane_ring_closeup.png"],
    }],
    descriptionDetails: {
      paragraphs: [
        "I coordinate TVC-Hopper as founder and president of COSMOS. Our team is building a small electric-ducted-fan (EDF) hopper whose four exhaust vanes control its attitude. The project asks how a learned controller compares with conventional control on the same physical task.",
        "The main track combines a PPO reinforcement-learning pipeline, a simulation environment, avionics, and a web interface for comparing and replaying controller behavior. Planned comparisons with PID/LQR use common test conditions and measures such as recovery time, overshoot, and steady-state error.",
        "An extension explores policy networks with connectivity inspired by the fruit-fly connectome, alongside a shuffled-network control. Some simulator constants still need physical measurements. Calibration and hardware integration must come before conclusions about controller performance.",
      ],
      bullets: [
        "Coordinate the mechanical, avionics, simulation, and software work across the club team.",
        "Use shared evaluation code to compare controllers under the same disturbances and measurement definitions.",
        "Develop reproducible setup instructions and simulation checks so teammates can work with the same environment.",
      ],
    },
  },
  {
    id: "ciws-drone-tracking-turret",
    context: "School science-fair project",
    role: "Camera tracking and Arduino integration",
    status: "Completed",
    companyName: "Automated CIWS Drone Tracking Turret",
    type: "Personal",
    category: ["Computer Vision", "Hardware/Robotics"],
    shortDescription:
      "Built a science-fair tracking rig with a camera, Python, and Arduino-driven servos. The project includes YOLOv5 detection experiments and a color-tracking dual-turret demonstration.",
    githubLink: "https://github.com/MINBBBB1201/CIWS-drone-tracking-turret",
    techStack: ["Arduino", "Python", "System Architecture"],
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
          "The assembled dual-turret rig and its tracking demonstration. The color-tracking script drives one turret toward the detected position and the second toward a fixed offset, making the difference visible.",
        imgArr: [
          "/projects/ciws-drone-tracking-turret/09-dual-turret-assembly.jpg",
          "/projects/ciws-drone-tracking-turret/10-dual-turret-battery.jpg",
          "/projects/ciws-drone-tracking-turret/11-live-tracking-demo.jpg",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "I built a camera-based tracking system for a school science-fair project. Python turns a target's position in the image into pan and tilt angles, then sends them over serial to Arduino-controlled servos.",
        "The project grew from a single pan-tilt mount into a dual-turret demonstration. I worked with YOLOv5 object detection and a separate HSV color-tracking mode. In the dual color-tracking mode, one turret follows the detected position while the other follows a fixed offset; that offset demonstrates a leading target without estimating its future motion.",
      ],
      bullets: [
        "Used OpenCV to read camera frames, locate a target, and map image coordinates to servo angles.",
        "Connected Python tracking scripts to Arduino over serial and smoothed angle changes to reduce abrupt servo movement.",
        "Worked through Python environment and PyTorch model-loading issues; added scripts to log tracking coordinates and analyze error and frame rate.",
      ],
    },
  },
  {
    id: "jsl-logistics",
    context: "Internship project",
    demoLink: "/demos/cargo-planner",
    period: "Since August 2026",
    companyName: "JSL Logistics: AI Tools & Web Platform",
    type: "Professional",
    category: ["AI & Machine Learning", "Full Stack", "UI/UX"],
    status: "In progress",
    role: "Intern; website and software development",
    shortDescription: "Ongoing JSL internship work on a logistics platform: document-based AI support, photo-assisted damage review, a 3D cargo-loading planner, and shipment and trade-document tools.",
    githubLink: "https://github.com/MINBBBB1201/jsl-project",
    techStack: ["Next.js", "Typescript", "Node.js", "MongoDB"],
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "During my JSL internship, I am developing a logistics platform with a Next.js and TypeScript frontend and an Express and MongoDB backend. My work covers tools for staff as well as the public website. Development and integration are ongoing.",
        "For the support chatbot, the backend retrieves relevant knowledge-base documents, supplies them to the model, and asks it to cite the document titles. Korean query expansion handles common word endings, and marked sample documents are excluded from retrieval. When information is missing, the assistant is directed to refer the question to the responsible staff. A separate image-review workflow returns structured damage descriptions for human review.",
        "The 3D cargo planner places boxes within container dimensions while checking rotation, support, and payload constraints. It also checks the resulting center of gravity and flags imbalance; it does not optimize the load for balance. Other work includes shipment interfaces, versioned trade documents, and multilingual pages. The public-site redesign includes separate Blender motion studies of road, sea, and air transport.",
      ],
      bullets: [
        "Build staff interfaces that connect AI-assisted tools with shipment and document workflows.",
        "Keep retrieved documents and AI-generated inspection suggestions visible for staff to review.",
        "Develop cargo-loading visualization and public-site motion studies alongside the existing application.",
      ],
    },
  },
  {
    id: "daemun-iii",
    context: "School conference team project",
    companyName: "DAEMUN III: AI Support & Conference Operations",
    type: "Professional",
    category: ["AI & Machine Learning", "Full Stack", "Web Dev"],
    status: "Completed",
    role: "Deputy Head of Technology; co-developer with Junwon Kim",
    startDate: new Date("2026-08-01"),
    githubLink: "https://github.com/junwonkim07/DAEMUN-III",
    techStack: ["Next.js", "Typescript", "PostgreSQL", "APIs", "Vercel", "Docker", "CI/CD", "System Architecture"],
    companyLogoImg: "/projects/daemun-iii/01-conference-preview.webp",
    pagesInfoArr: [],
    shortDescription: "Co-developed DAEMUN III with Junwon Kim: a conference website, AI assistant using conference information, organizer dashboard, and delegate submission platform, from shared backend architecture to deployment and diagnostics.",
    descriptionDetails: {
      paragraphs: [
        "As Deputy Head of Technology, I co-developed the full DAEMUN III platform with Junwon Kim, working across the public website, Roger AI assistant, Hono API, PostgreSQL data model, organizer dashboard, and delegate submissions.",
        "We evolved Roger from keyword-based FAQ retrieval to public-site-data context, adding provider fallback, streaming responses, evaluation questions, and organizer-facing logs. The FAQ seed document contains 103 beginner-focused entries.",
      ],
      bullets: [
        "Co-developed shared validation and content APIs, account permissions, admin editing, cache revalidation, and responsive public pages.",
        "Built team assignment, lead-only submissions, version history, team notifications, direct-to-Blob uploads, and committee-level publishing together.",
        "Moved deployment from a Docker-based VPS to Vercel with Neon and Blob, and added document diagnostics and sanitized error-reporting infrastructure.",
      ],
    },
  },
  {
    id: "tern",
    context: "Independent project",
    role: "Independent developer",
    status: "In progress",
    companyName: "Tern",
    type: "Personal",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "A flight-search and booking app that compares fares and journey duration, with weather, layover details, and a rule-based schedule-risk score.",
    websiteLink: "https://flytern.site",
    githubLink: "https://github.com/MINBBBB1201/Tern",
    techStack: ["Next.js", "Typescript", "React Three Fiber", "GSAP", "APIs"],
    startDate: new Date("2026-03-01"),
    companyLogoImg: "/projects/tern/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "I started Tern as a flight-booking concept in Mechanics Club and continued it as a personal project. Duffel provides flight offers; the interface brings together price, duration, stops, and connection details so travelers can compare the trade-offs.",
        "I designed Civil Twilight, a visual system of translucent panels and shared styles, and moved the landing-page 3D scenes from raw Three.js into React Three Fiber. GSAP ScrollTrigger coordinates the scene with scrolling. The app now has English, Korean, Japanese, and Chinese locale routes.",
      ],
      bullets: [
        "Connect flight offers with airport weather, layover details, and airline information.",
        "Use next-intl for language-specific pages and preserve the selected language through the booking return flow.",
        "Used informal Instagram Story polls to help prioritize features. The schedule-risk score uses rules for stops, late departures, and short connections; it is not a measured probability of delay.",
      ],
    },
  },
  {
    id: "cosmos-rocket-thrust-stand",
    context: "COSMOS club project",
    role: "COSMOS Founder & President; team lead",
    status: "Completed",
    companyName: "Solid Propellant Rocket Thrust Test Stand",
    type: "Personal",
    category: ["Aerospace Engineering", "Hardware/Robotics"],
    shortDescription:
      "Led a 10-member COSMOS team to build a rocket thrust stand, recover from a recording failure, and analyze the second static-fire test.",
    githubLink:
      "https://github.com/MINBBBB1201/Rocket-Thrust-Test-Stand",
    techStack: ["Arduino", "System Architecture", "Python"],
    startDate: new Date("2025-09-01"),
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
          "Static-fire footage and the recorded thrust-time curve. The second test produced a peak of about 190 N and a reported total impulse of 270.6 N·s.",
        imgArr: [
          "/projects/cosmos-rocket-thrust-stand/10-ready-for-test.png",
          "/projects/cosmos-rocket-thrust-stand/11-thrust-time-graph.png",
        ],
        videoArr: ["/projects/cosmos-rocket-thrust-stand/12-static-fire-test.mp4"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "As founder and president of COSMOS, I led a 10-member team building a test stand for a solid-propellant rocket motor. We combined a mechanical frame, a load cell, and a microcontroller-based data logger to record force during a static-fire test.",
        "Before firing, we added and removed known loads to check the sensor response and its return to zero. The first test burned successfully but did not save the thrust data. We reviewed the recording sequence and storage logic, then captured a continuous record during the second test.",
      ],
      bullets: [
        "Led two static-fire tests and worked with the team to correct the recording failure between them.",
        "Converted load-cell readings to force and analyzed the thrust-time curve: about 190 N peak thrust and a reported total impulse of 270.6 N·s.",
        "Compared the experimental results with an internal-ballistics simulation and used the test record to review the measurement setup.",
      ],
    },
  },
  {
    id: "cosmos-aeroview-windtunnel",
    context: "COSMOS club project",
    role: "COSMOS Founder & President; design and fabrication lead",
    status: "In progress",
    companyName: "Project AEROVIEW: Open-Circuit Suction Wind Tunnel",
    type: "Personal",
    category: ["Aerospace Engineering", "Hardware/Robotics"],
    shortDescription:
      "An ongoing wind-tunnel build for comparing NACA airfoil profiles. I lead the parametric CAD design and fabrication; final integration and airflow measurements are still pending.",
    githubLink:
      "https://github.com/MINBBBB1201/COSMOS-Aeroview-Windtunnel",
    techStack: ["FreeCAD", "OpenSCAD", "System Architecture"],
    startDate: new Date("2025-09-01"),
    companyLogoImg: "/projects/cosmos-aeroview-windtunnel/01-hero-full-assembly.jpg",
    pagesInfoArr: [
      {
        title: "Parametric CAD Design",
        description:
          "Parametric FreeCAD and OpenSCAD models of the fan box, airfoil mount, and honeycomb flow straightener, prepared before fabrication.",
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
          "The fog-machine setup and clear acrylic test section prepared for flow visualization. Final integration and airflow measurements are still pending.",
        imgArr: [
          "/projects/cosmos-aeroview-windtunnel/10-smoke-flow-visualization-setup.jpg",
          "/projects/cosmos-aeroview-windtunnel/11-test-section.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Directed the parametric CAD design (FreeCAD, OpenSCAD) and fabrication of an open-circuit suction wind tunnel to compare airflow over NACA 0012, 2412, and 4412 airfoils.",
        "Over a six-week build period, we worked from CAD dimensions to the frame, fan box, and test-section components. A mismatch between the drawings and fabricated parts required direct measurement and recalculation. The tunnel remains under construction, with final integration and airflow data collection still pending.",
      ],
      bullets: [
        "Identified and corrected a design-to-fabrication dimensional error through direct measurement and recalculation.",
        "Calculated blockage ratios of 1.4% to 14% across angles of attack and used them to revise the support design. Airflow testing is needed to assess the change.",
        "Coordinate fabrication of the fan box, diffuser, and test section before final assembly and airflow measurements.",
      ],
    },
  },
  {
    id: "wind-tunnel-rc-aircraft",
    context: "School physics research",
    role: "Aircraft design, build, flight observations, and research paper",
    status: "Completed",
    companyName: "F-22-Inspired RC Aircraft: Aerodynamic Design & Flight Stability Research",
    type: "Personal",
    category: ["Aerospace Engineering", "Hardware/Robotics"],
    shortDescription:
      "Designed, built, and flight-tested an F-22-inspired foam-board RC aircraft. The accompanying paper on aerodynamic design and flight stability won first place in the school research competition's Physics Division.",
    techStack: ["FreeCAD", "System Architecture"],
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-01-31"),
    companyLogoImg: "/projects/wind-tunnel-rc-aircraft/01-hero-aircraft-topdown.jpg",
    paperLink: "/projects/wind-tunnel-rc-aircraft/research-paper.pdf",
    pagesInfoArr: [
      {
        title: "The Test Aircraft",
        description:
          "The foam-board aircraft I assembled and painted for the project, with its propulsion components, control surfaces, and wiring visible in the build photographs.",
        imgArr: [
          "/projects/wind-tunnel-rc-aircraft/01-hero-aircraft-topdown.jpg",
          "/projects/wind-tunnel-rc-aircraft/02-aircraft-build-detail.jpg",
        ],
      },
      {
        title: "Flight Test",
        description:
          "Outdoor flight-test footage used to observe the aircraft's stability and control response.",
        imgArr: [],
        videoArr: ["/projects/wind-tunnel-rc-aircraft/03-flight-test.mp4"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "For a school physics research project, I designed and built an F-22-inspired RC aircraft and studied how its structure and wing geometry affected flight behavior. Lift, drag, and stability calculations informed the design.",
        "I assembled the foam-board airframe, installed its components, and observed the finished aircraft in outdoor flight tests. The build photographs and video document the prototype and its flight behavior.",
        "Wrote this up as a research paper, \"Analysis of the Correlation Between Aerodynamic Design Variables and Flight Stability of an F-22-Based RC Aircraft,\" examining how structure and wing geometry choices shape flight characteristics through lift and drag.",
        "The paper won 1st place in the Physics Division of the school's research paper competition.",
      ],
      bullets: [
        "Used aerodynamic calculations and simulation references to guide wing geometry and structural choices.",
        "Modeled lift and drag characteristics to guide the design, stability, and control configuration of the RC aircraft.",
        "Recorded flight observations and documented the design and analysis in a research paper.",
      ],
    },
  },
  {
    id: "autopilot-mechanism-study",
    context: "School physics research",
    role: "Author; literature and patent analysis, with guidance from teacher Hyojun Lee",
    status: "Completed",
    companyName: "Mechanism of Autopilot: How an Aircraft Holds Stability and Hands Back Control",
    type: "Personal",
    category: ["Aerospace Engineering"],
    shortDescription:
      "A physics research paper on how an autopilot keeps an aircraft stable in turbulence and returns control to the pilot. It draws on a control-systems paper and an Airbus patent. The PID curves are illustrative, not flight or hardware data.",
    techStack: [],
    descriptionDetails: {
      paragraphs: [
        "During my RC aircraft project, a sudden gust flipped the plane I had built. That made me wonder how an airliner holds its attitude in strong turbulence. Most sources I found cover normal flight, so I focused on the moment the system reaches its limit and the pilot takes over.",
        "I used Donald McLean's overview of automatic flight control as the theoretical base. In the paper I describe the basic loop: pitot and static pressure give speed and altitude, a PID algorithm acts on the error, and the elevator, aileron, and rudder carry out the correction. I then analyzed Airbus patent US7990285, which sounds a staged audible alert when the autopilot disengages so the pilot regains awareness quickly.",
        "For the figures, I drew a flowchart of the transition from autopilot to manual control and built a comparison of P, PI, and PID error curves. I picked the parameter values myself rather than fitting them to a real aircraft, ran them through an open-source PID implementation, and put the results in a table and graph in Excel. The curves show how the three controllers differ in principle. They are not measurements from my aircraft or from any real flight.",
        "The paper argues that even a well-designed autopilot needs a clear handover to the pilot. It is a literature-based study with no flight or hardware testing.",
      ],
      bullets: [
        "Analyzed one control-systems paper and one Airbus patent on autopilot disengagement alerts.",
        "Drew a flowchart of the autopilot-to-manual transition logic.",
        "Compared P, PI, and PID error curves for illustrative parameter values, tabulated and plotted in Excel.",
        "Wrote the paper with guidance from my teacher.",
      ],
    },
    pagesInfoArr: [],
  },

];

const featuredProjectIds = ["daemun-iii", "cosmos-tvc-hopper", "jsl-logistics"];
export const featuredProjects = featuredProjectIds.map((id) => Projects.find((project) => project.id === id)!);
