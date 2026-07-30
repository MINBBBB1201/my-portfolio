import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import HonorsGrid from "@/components/experience/honors-grid";
import Timeline from "@/components/experience/timeline";
import { experiences } from "@/config/experience";
import { academicStats, honors } from "@/config/honors";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${pagesConfig.experience.metadata.title} | Professional Experience Timeline`,
  description: `${pagesConfig.experience.metadata.description} Explore my professional journey and career milestones in software development.`,
  keywords: [
    "experience timeline",
    "professional experience",
    "software developer experience",
    "developer portfolio",
    "work experience",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
};

export default function ExperiencePage() {
  return (
    <PageContainer
      title={pagesConfig.experience.title}
      description={pagesConfig.experience.description}
    >
      <div className="space-y-14">
        <Timeline experiences={experiences} />
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-background p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {academicStats.gpa}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              GPA ({academicStats.gpaType})
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {academicStats.gradeLevel}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Grade Level</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 text-center col-span-2 sm:col-span-2">
            <p className="text-base font-bold text-primary leading-snug">
              {academicStats.school}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {academicStats.major}
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl mb-6 text-center">
            Honors & Certifications
          </h2>
          <HonorsGrid honors={honors} />
        </div>
      </div>
    </PageContainer>
  );
}
