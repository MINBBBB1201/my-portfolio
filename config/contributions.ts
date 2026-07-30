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
    repoOwner: "COSMOS-Aero-Engineering",
    link: "https://github.com/COSMOS-Aero-Engineering/Rocket-Thrust-Test-Stand",
  },
  {
    repo: "COSMOS-Aeroview-Windtunnel",
    contibutionDescription:
      "Directed CAD design and fabrication of an open-circuit suction wind tunnel to compare NACA airfoil profiles.",
    repoOwner: "COSMOS-Aero-Engineering",
    link: "https://github.com/COSMOS-Aero-Engineering/COSMOS-Aeroview-Windtunnel",
  },
];

export const featuredContributions: contributionsInterface[] =
  contributionsUnsorted.slice(0, 3);
