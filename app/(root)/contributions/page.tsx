import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ContributionCard from "@/components/contributions/contribution-card";
import GitHubActivity from "@/components/contributions/github-activity";
import { contributionsUnsorted } from "@/config/contributions";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.contributions.metadata.title,
  description: pagesConfig.contributions.metadata.description,
};

export default function ContributonsPage() {
  return (
    <PageContainer
      title={pagesConfig.contributions.title}
      description={pagesConfig.contributions.description}
    >
      <div className="space-y-10">
        <GitHubActivity />
        <ContributionCard contributions={contributionsUnsorted} />
      </div>
    </PageContainer>
  );
}
