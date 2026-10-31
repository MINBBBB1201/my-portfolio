export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
}

export const contributionsUnsorted: contributionsInterface[] = [
  {
    repo: "COSMOS-TVC-Hopper",
    contibutionDescription: "Coordinate an ongoing COSMOS team project comparing learned and conventional control for an EDF hopper. Simulation calibration and physical validation are in progress.",
    repoOwner: "COSMOS-Aero-Engineering",
    link: "https://github.com/COSMOS-Aero-Engineering/COSMOS-TVC-Hopper",
  },
  {
    repo: "jsl-project",
    contibutionDescription: "Develop logistics staff tools during my internship: document-based AI support, photo-assisted inspection, cargo-loading visualization, and shipment interfaces.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/jsl-project",
  },
  {
    repo: "ae",
    contibutionDescription:
      "Contribute to Agent Device, the Orchestrators team's palm-sized companion device for AI agents: v0.3 keyring-board order review and a pad-and-pin audit tool with regression tests. The board is designed but not yet assembled.",
    repoOwner: "FiveOchestrators",
    link: "https://github.com/FiveOchestrators/ae",
  },
  {
    repo: "daesik",
    contibutionDescription:
      "Submitted a researcher and creator workflow for the Orchestrators team's Slack agent (pull request under review).",
    repoOwner: "FiveOchestrators",
    link: "https://github.com/FiveOchestrators/daesik",
  },
  {
    repo: "Rocket-Thrust-Test-Stand",
    contibutionDescription:
      "Co-led design, fabrication, and testing of a solid propellant rocket motor thrust test stand as COSMOS club president.",
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
      "Build Tern, a flight-search and booking app with fare comparisons, route details, and a rule-based schedule-risk score.",
    repoOwner: "MINBBBB1201",
    link: "https://github.com/MINBBBB1201/Tern",
  },
  {
    repo: "CIWS-drone-tracking-turret",
    contibutionDescription:
      "Built a camera-and-servo tracking rig with YOLOv5 experiments and a separate color-tracking dual-turret demonstration.",
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
      "Co-developed DAEMUN III with Junwon Kim, including Roger AI support, conference pages, organizer tools, versioned submissions, and deployment.",
    repoOwner: "junwonkim07",
    link: "https://github.com/junwonkim07/DAEMUN-III",
  },
];

export const featuredContributions = ["COSMOS-TVC-Hopper", "jsl-project", "DAEMUN-III"].map(
  (repo) => contributionsUnsorted.find((item) => item.repo === repo)!
);
