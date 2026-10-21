// Selected content shared by the readable page and the generated one-page PDF.
// Roles, dates, school and GPA come from the main portfolio records.
export const resumeSelection = {
  focus: "High school senior interested in artificial intelligence, with projects in AI assistants, computer vision and physical control.",
  experience: [
    { id: "jsl-logistics", bullets: [
      "Developing document-based AI support, photo-assisted damage review and logistics interfaces; staff review AI inspection suggestions.",
      "Building a cargo-loading planner that checks dimensions, rotation, stacking support and payload limits.",
    ] },
    { id: "cosmos", bullets: [
      "Founded and lead a 10-member engineering club. Led two rocket static-fire tests; corrected a recording failure and captured a continuous thrust record reaching about 190 N.",
      "Coordinate the ongoing TVC-Hopper project, combining reinforcement-learning simulation, avionics and CAD. Physical validation is still in progress.",
    ] },
    { id: "daemun-iii", bullets: [
      "Co-developed the completed conference platform with Junwon Kim: public site, Roger AI assistant, organizer dashboard and delegate submissions.",
      "Built conference-data context, streamed AI replies, provider fallback, role-based permissions and versioned document submissions; expanded the FAQ seed to 103 entries.",
    ] },
    { id: "mintech", bullets: [
      "Assisted with dimensional checks using vernier calipers and micrometers, equipment checks and workplace organization; learned sputtering equipment and manufacturing-quality fundamentals.",
    ] },
  ],
  projects: [
    { id: "tern", bullets: ["Developing an independent flight-search and booking app with the Duffel API, four language routes and React Three Fiber scenes."] },
    { id: "ciws-drone-tracking-turret", bullets: ["Built a school science-fair camera-tracking rig with Python, OpenCV and Arduino servos, including a color-tracking dual-turret demonstration and separate YOLOv5 detection experiments."] },
  ],
  leadership: [
    "Student Council, Planning Department Vice President (2025 to March 2026).",
    "Mechanics Club, Vice President (March 2026 to present): built and tested a 4-bit ripple-carry adder using logic-gate ICs.",
  ],
  honors: [
    "1st Place, Physics Division, School Research Paper Competition (G11, 2025 to 2026): F-22-inspired RC aircraft design and flight stability.",
    "1st Place, School Science Fair (2025 to 2026); 2nd Place, School-wide Writing Contest (G10, 2024). All awarded by Qingdao Daewon School.",
  ],
  skills: "Python, TypeScript, Next.js, React, PostgreSQL, APIs, OpenCV, Arduino, FreeCAD, OpenSCAD",
};
