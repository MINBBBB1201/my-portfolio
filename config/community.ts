export interface CommunityInterface {
  name: string;
  role: string;
  period: string;
  description: string[];
}

export const communityInvolvement: CommunityInterface[] = [
  {
    name: "Student Council",
    role: "Planning Department → Vice President",
    period: "2025 – Present",
    description: [
      "Organized joint domestic/international student events as part of the Planning Department, coordinating cross-department logistics and program design.",
      "Currently serving as Vice President of the Student Council.",
    ],
  },
  {
    name: "PSYCHOFISH",
    role: "Member",
    period: "2024 – Present",
    description: [
      "Ran an anonymous peer-counseling channel over KakaoTalk open chat, listening to classmates' concerns and offering thoughtful responses.",
      "Wrote analytical pieces for a club magazine on inter-Korean conflict resolution and on the leadership philosophy of Jeff Bezos.",
      "Collaborated with the school's film club on a school-violence-prevention story project.",
    ],
  },
  {
    name: "Point of View",
    role: "Member, PR Team",
    period: "2024",
    description: [
      "Designed rules and posters for a school-wide Manito (secret friend) event as part of the PR team.",
      "Helped organize a Halloween story-collection event and led \"Random Acts of Kindness\" campus clean-up volunteering.",
    ],
  },
];
