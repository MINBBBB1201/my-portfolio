import type { ExperienceInterface } from "@/config/experience";

export function getDurationText(
  startDate: ExperienceInterface["startDate"],
  endDate: ExperienceInterface["endDate"]
): string {
  const format = (date: Date) => new Date(date).toLocaleDateString("en-US", {
    month: "short", year: "numeric", timeZone: "UTC",
  });
  if (endDate === "Completed") {
    return startDate ? `Started ${format(startDate)} · Completed` : "Completed";
  }
  if (!startDate) return endDate === "Present" ? "In progress" : format(endDate);
  return `${format(startDate)} - ${endDate === "Present" ? "Present" : format(endDate)}`;
}

export function experienceSortDate(experience: ExperienceInterface): number {
  if (experience.endDate === "Present") return Number.MAX_SAFE_INTEGER;
  if (experience.endDate === "Completed") return experience.startDate?.getTime() ?? (experience.startMonth ? Date.parse(`${experience.startMonth}-01T00:00:00Z`) : 0);
  return experience.endDate.getTime();
}
