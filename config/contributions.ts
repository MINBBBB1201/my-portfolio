export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
}

export const contributionsUnsorted: contributionsInterface[] = [
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
      "This personal engineering portfolio, built with Next.js, TypeScript, and Tailwind CSS.",
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
];

export const featuredContributions: contributionsInterface[] =
  contributionsUnsorted.slice(0, 3);
