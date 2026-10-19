export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
}

export const contributionsUnsorted: contributionsInterface[] = [
  {
    repo: "COSMOS-TVC-Hopper",
    contibutionDescription: "Ongoing COSMOS team project connecting reinforcement-learning control, simulation, avionics, and an EDF test platform. Physical validation remains in progress.",
    repoOwner: "COSMOS-Aero-Engineering",
    link: "https://github.com/COSMOS-Aero-Engineering/COSMOS-TVC-Hopper",
  },
  {
    repo: "jsl-project",
    contibutionDescription: "Ongoing internship work on a logistics platform with AI-assisted support and inspection tools, operational workflows, and website development.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/jsl-project",
  },
  {
    repo: "housing-base",
    contibutionDescription: "Supporting engineering archive: laptop base-cover CAD, measurements, research, and verification records.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/housing-base",
  },
  {
    repo: "Rocket-Thrust-Test-Stand",
    contibutionDescription:
      "Led design, fabrication, and testing of a solid propellant rocket motor thrust test stand as COSMOS club president.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/Rocket-Thrust-Test-Stand",
  },
  {
    repo: "COSMOS-Aeroview-Windtunnel",
    contibutionDescription:
      "Directed CAD design and fabrication of an open-circuit suction wind tunnel to compare NACA airfoil profiles.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/COSMOS-Aeroview-Windtunnel",
  },
  {
    repo: "Tern",
    contibutionDescription:
      "Flight booking web app comparing fares, routes, and delay risk — built with Next.js, the Duffel API, and React Three Fiber.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/Tern",
  },
  {
    repo: "CIWS-drone-tracking-turret",
    contibutionDescription:
      "Built an automated dual-turret system that detects and tracks moving drone targets using YOLOv5 and Arduino-driven servos.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/CIWS-drone-tracking-turret",
  },
  {
    repo: "my-portfolio",
    contibutionDescription:
      "This AI and engineering portfolio, built with Next.js, TypeScript, and Tailwind CSS.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/my-portfolio",
  },
  {
    repo: "Ndless",
    contibutionDescription:
      "Personal exploration of Ndless, an open-source native development toolchain for TI-Nspire calculators.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/Ndless",
  },
  {
    repo: "DAEMUN-III",
    contibutionDescription:
      "Built the first Roger AI assistant with FAQ retrieval and Q&A logs, admin editing screens, and versioned delegate submissions with committee-level publishing in DAEMUN III's shared Next.js/Hono/Postgres codebase.",
    repoOwner: "junwonkim07",
    link: "https://github.com/junwonkim07/DAEMUN-III",
  },
];

export const featuredContributions = ["COSMOS-TVC-Hopper", "jsl-project", "DAEMUN-III"].map(
  (repo) => contributionsUnsorted.find((item) => item.repo === repo)!
);
