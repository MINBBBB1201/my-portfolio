// Selected content shared by the readable page. It mirrors public/resume.pdf (one page) and public/cv-full.pdf (two pages).
// Roles, dates, school and GPA come from the main portfolio records. Service hours are left out of the site on purpose.
export const resumeSelection = {
  focus: "High school senior interested in artificial intelligence, with projects in AI assistants, computer vision and physical control.",
  apPlanned: "AP exams planned for May 2027: Calculus BC, Physics C (Mechanics; Electricity and Magnetism), Physics 1, Computer Science A.",
  experience: [
    { id: "jsl-logistics", bullets: [
      "Develop staff tools and the public website, including a document-based support chatbot, photo-assisted damage review, and a 3D cargo-loading planner that checks dimensions, stacking and payload limits.",
    ] },
    { id: "mintech", bullets: [
      "Assisted with dimensional checks (vernier calipers, micrometers); learned the process flow of sputtering thin-film equipment; completed 4M, 5S and safety onboarding.",
    ] },
    { id: "kau-aerospace-camp", bullets: [] as string[] },
    { id: "cosmos", bullets: [
      "Co-founder; president since March 2026.",
      "Co-led a rocket thrust-stand project through two static-fire tests; after the first test failed to save data, corrected the recording sequence and captured a continuous thrust record reaching about 190 N.",
      "Direct Project AEROVIEW, a suction wind tunnel designed in FreeCAD and OpenSCAD, and coordinate TVC-Hopper, which combines reinforcement-learning simulation, avionics and CAD (physical validation in progress).",
    ] },
    { id: "daemun-iii", bullets: [
      "Co-developed the conference platform with Junwon Kim (public site, AI assistant, organizer dashboard, delegate submissions with version history) and built the assistant's first backend and admin tools.",
      "After the assistant stopped during a school-wide demonstration, called a team meeting; the team moved to a gateway-based design with a fallback provider, and the next 51 logged queries recorded no upstream errors.",
    ] },
  ],
  projects: [
    { id: "wind-tunnel-rc-aircraft", bullets: ["Designed the airframe in FreeCAD, built and flight-tested a foam-board aircraft, and wrote a 22-page paper relating design variables to stability."] },
    { id: "autopilot-mechanism-study", bullets: ["Analyzed a control-systems paper and an Airbus patent on autopilot disengagement; compared illustrative P, PI and PID error curves. Literature-based; no flight or hardware testing."] },
    { id: "tern", bullets: ["Built with Next.js, the Duffel API and React Three Fiber in four languages; compares fares, layovers and airport weather. Checkout runs through an external partner."] },
    { id: "ciws-drone-tracking-turret", bullets: ["Built a camera-tracking rig (Python, OpenCV, Arduino servos); tested YOLOv5 detection and a color-tracking dual-turret demo."] },
  ],
  leadership: [
    "Student Council, Planning Department Vice President (2025 to March 2026): helped plan a joint sports day and ran the live scoreboard at the orientation event.",
    "Orchestrators (formerly Mechanics Club), Vice President (March 2026 to present): contribute to Agent Device, a palm-sized companion device for AI agents (v0.3 board order review and pad-and-pin audit tool; not yet assembled). As Mechanics Club, built a 4-bit ripple-carry adder from logic-gate ICs.",
    "Also: DAEMUN II delegate for Slovakia (2025); Support Group leader (Grade 11); PSYCHOFISH member (2024 to 2025).",
  ],
  honors: [
    "1st Place, Excellent Research Paper (Science and Technology), December 2025, for a paper on design variables and flight stability of an F-22-inspired RC aircraft. 1st Place, School Science Fair (High), April 2026.",
    "Performance Excellence Award, COSMOS (July 2026) and Point of View club (July 2025). Subject Excellence Award: Precalculus (December 2025, July 2026) and Creative Writing (December 2025).",
    "1st Place, English Speaking Contest (November 2024) and Social Studies Project Creativity (June 2025). 2nd Place, Korean Literature Writing Contest, prose (May 2025). Seven Academic Improvement Awards (2024 to 2026).",
  ],
  skills: "Python, TypeScript, Next.js, React, PostgreSQL, OpenCV, Arduino, FreeCAD",
  languages: "Korean, English, Mandarin",
};
