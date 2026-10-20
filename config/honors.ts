export const academicStats = {
  school: "Qingdao Daewon School",
  gpa: "3.984 / 4.0",
  gpaType: "Unweighted",
  gradeLevel: "Senior",
  expectedGraduation: "2027",
  major: "Artificial Intelligence and related fields",
};

export interface HonorInterface {
  title: string;
  issuer: string;
  date: string;
  type: "Award" | "Certification" | "Leadership" | "Research";
}

export const honors: HonorInterface[] = [
  {
    title: "Aerospace Work Experience with Airbus",
    issuer: "Springpod",
    date: "March 2026",
    type: "Certification",
  },
  {
    title: "Claude Development & AI Fluency",
    issuer: "Anthropic",
    date: "July 2026",
    type: "Certification",
  },
  {
    title: "1st Place, School Science Fair",
    issuer: "Qingdao Daewon School",
    date: "2025 to 2026",
    type: "Award",
  },
  {
    title:
      '1st Place (Physics Division), School Research Paper Competition: "Analysis of the Correlation Between Aerodynamic Design Variables and Flight Stability of an F-22-Based RC Aircraft"',
    issuer: "Qingdao Daewon School",
    date: "G11, 2025 to 2026",
    type: "Research",
  },
  {
    title: "Planning Department Vice President, Student Council",
    issuer: "Qingdao Daewon School",
    date: "2025 to March 2026",
    type: "Leadership",
  },
  {
    title:
      '2nd Place, School-wide Writing Contest: Top Excellence Award, prose essay on "What I\'d Want to Tell My 8-Year-Old Self"',
    issuer: "Qingdao Daewon School",
    date: "G10, 2024",
    type: "Award",
  },
];
