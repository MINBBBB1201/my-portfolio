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
  group?: string;
  detail?: string;
}

// School awards follow the award record issued by Qingdao Daewon School on 2026-10-22.
export const honorsNote =
  "All awards in the first six groups were issued by Qingdao Daewon School and confirmed in the school's record of awards.";

export const honors: HonorInterface[] = [
  {
    title: "1st Place, Excellent Research Paper (Science and Technology)",
    issuer: "Qingdao Daewon School",
    date: "December 2025",
    type: "Research",
    group: "Research and science",
    detail: "Paper: \"Analysis of the Correlation Between Aerodynamic Design Variables and Flight Stability of an F-22-Based RC Aircraft\"",
  },
  {
    title: "1st Place, Science Fair (High School Division)",
    issuer: "Qingdao Daewon School",
    date: "April 2026",
    type: "Award",
    group: "Research and science",
  },
  {
    title: "Subject Excellence Award: Precalculus",
    issuer: "Qingdao Daewon School",
    date: "December 2025 and July 2026",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "Subject Excellence Award: Creative Writing",
    issuer: "Qingdao Daewon School",
    date: "December 2025",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "Academic Improvement Award: Economics",
    issuer: "Qingdao Daewon School",
    date: "December 2024",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "Academic Improvement Award: English Academic Reading",
    issuer: "Qingdao Daewon School",
    date: "December 2024 and July 2026",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "Academic Improvement Award: Economics 10",
    issuer: "Qingdao Daewon School",
    date: "July 2025",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "Academic Improvement Award: English Language and Composition",
    issuer: "Qingdao Daewon School",
    date: "July 2025",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "Academic Improvement Award: Physics",
    issuer: "Qingdao Daewon School",
    date: "December 2025",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "Academic Improvement Award: Chinese 11",
    issuer: "Qingdao Daewon School",
    date: "July 2026",
    type: "Award",
    group: "Subject and academic awards",
  },
  {
    title: "1st Place, English Speaking Contest",
    issuer: "Qingdao Daewon School",
    date: "November 2024",
    type: "Award",
    group: "Contests",
  },
  {
    title: "2nd Place, school-wide Korean Literature Writing Contest (prose)",
    issuer: "Qingdao Daewon School",
    date: "May 2025",
    type: "Award",
    group: "Contests",
    detail: "Essay: \"What I'd Want to Tell My 8-Year-Old Self\"",
  },
  {
    title: "1st Place, Social Studies Project Creativity",
    issuer: "Qingdao Daewon School",
    date: "June 2025",
    type: "Award",
    group: "Contests",
  },
  {
    title: "Popularity Award, Project Creativity (Chinese)",
    issuer: "Qingdao Daewon School",
    date: "October 2025",
    type: "Award",
    group: "Contests",
  },
  {
    title: "2nd Place, Poster Making",
    issuer: "Qingdao Daewon School",
    date: "September 2024",
    type: "Award",
    group: "Chinese Month",
  },
  {
    title: "3rd Place, Paper-Weaving and Chinese Calligraphy Contest",
    issuer: "Qingdao Daewon School",
    date: "September 2025",
    type: "Award",
    group: "Chinese Month",
  },
  {
    title: "3rd Place, Poster Making",
    issuer: "Qingdao Daewon School",
    date: "March 2026",
    type: "Award",
    group: "Chinese Month",
  },
  {
    title: "Performance Excellence Award: Point of View club",
    issuer: "Qingdao Daewon School",
    date: "July 2025",
    type: "Award",
    group: "Clubs and events",
  },
  {
    title: "Performance Excellence Award: COSMOS",
    issuer: "Qingdao Daewon School",
    date: "July 2026",
    type: "Award",
    group: "Clubs and events",
  },
  {
    title: "Certificate of Participation: DAEMUN II",
    issuer: "Qingdao Daewon School",
    date: "September 2025",
    type: "Award",
    group: "Clubs and events",
  },
  {
    title: "1st Place, Men's Basketball and Futsal",
    issuer: "Qingdao Daewon School",
    date: "May 2025",
    type: "Award",
    group: "Sports",
  },
  {
    title: "1st Place, Kickball",
    issuer: "Qingdao Daewon School",
    date: "June 2026",
    type: "Award",
    group: "Sports",
  },
  {
    title: "Airbus Aerospace Virtual Work Experience",
    issuer: "Springpod with Airbus (online programme)",
    date: "March 2026",
    type: "Certification",
    group: "Programs, certifications and leadership",
  },
  {
    title: "Claude Development & AI Fluency",
    issuer: "Anthropic",
    date: "July 2026",
    type: "Certification",
    group: "Programs, certifications and leadership",
  },
  {
    title: "Planning Department Vice President, Student Council",
    issuer: "Qingdao Daewon School",
    date: "2025 to March 2026",
    type: "Leadership",
    group: "Programs, certifications and leadership",
  },
];
