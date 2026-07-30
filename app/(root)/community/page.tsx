import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import CommunityCard from "@/components/community/community-card";
import { communityInvolvement } from "@/config/community";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.community.metadata.title,
  description: pagesConfig.community.metadata.description,
};

export default function CommunityPage() {
  return (
    <PageContainer
      title={pagesConfig.community.title}
      description={pagesConfig.community.description}
    >
      <CommunityCard items={communityInvolvement} />
    </PageContainer>
  );
}
