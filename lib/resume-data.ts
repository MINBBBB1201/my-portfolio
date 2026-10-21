import { academicStats } from "@/config/honors";
import { experiences } from "@/config/experience";
import { Projects } from "@/config/projects";
import { resumeSelection } from "@/config/resume";
import { siteConfig } from "@/config/site";
import { getDurationText } from "@/lib/experience-dates";

export function getResumeData() {
  return {
    name: siteConfig.authorName,
    url: siteConfig.url,
    github: siteConfig.links.github,
    education: academicStats,
    ...resumeSelection,
    experience: resumeSelection.experience.map((selection) => {
      const item = experiences.find((entry) => entry.id === selection.id);
      if (!item) throw new Error(`Missing resume experience: ${selection.id}`);
      return { ...selection, title: `${item.company} | ${item.position}`, period: item.period || getDurationText(item.startDate, item.endDate), href: `/experience/${item.id}` };
    }),
    projects: resumeSelection.projects.map((selection) => {
      const item = Projects.find((entry) => entry.id === selection.id);
      if (!item) throw new Error(`Missing resume project: ${selection.id}`);
      return { ...selection, title: item.companyName, period: item.status, href: `/projects/${item.id}` };
    }),
  };
}
