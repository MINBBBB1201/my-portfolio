import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "@/components/common/icons";
import DaemunCaseStudy from "@/components/projects/daemun-case-study";
import ProjectDescription from "@/components/projects/project-description";
import { buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = Projects.find((item) => item.id === projectId);
  if (!project) return {};
  return {
    title: project.companyName,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.companyName,
      description: project.shortDescription,
      url: `${siteConfig.url}/projects/${project.id}`,
      images: [{ url: project.companyLogoImg || siteConfig.ogImage }],
    },
  };
}

export default async function Project({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = Projects.find((val) => val.id === projectId);
  if (!project) {
    redirect("/projects");
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        All Projects
      </Link>
      <div>
        {project.context && <p className="mb-3 text-sm font-medium text-primary">{project.context}</p>}
        {project.startDate && <time
          dateTime={project.startDate.toISOString()}
          className="block text-sm text-muted-foreground"
        >
          Started {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(project.startDate)}
        </time>}
        {project.period && <p className="text-sm text-muted-foreground">{project.period}</p>}
        {project.status && <p className="my-3 text-sm font-semibold text-primary">{project.status}</p>}
        {project.role && <p className="mb-3 text-sm text-muted-foreground">{project.role}</p>}
        <h1 className="mt-2 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">{project.companyName}</h1>
        <p className="my-5 text-lg leading-relaxed text-muted-foreground">{project.shortDescription}</p>
        <div className="mb-5 flex flex-wrap gap-3">
          {project.demoLink && <Link href={project.demoLink} className={buttonVariants({ size: "sm" })}>Try cargo planner demo</Link>}
          {project.githubLink && <Link href={project.githubLink} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}><Icons.gitHub className="mr-2 h-4 w-4" />Source code</Link>}
          {project.websiteLink && <Link href={project.websiteLink} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}><Icons.externalLink className="mr-2 h-4 w-4" />Open project</Link>}
          {project.paperLink && <Link href={project.paperLink} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}><Icons.research className="mr-2 h-4 w-4" />Research paper</Link>}
        </div>
        <ChipContainer textArr={project.category} />
        <div className="mt-4 flex space-x-4">
          <Link
            href={siteConfig.links.github}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={profileImg}
              alt={siteConfig.authorName}
              width={42}
              height={42}
              className="rounded-full bg-background"
            />

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{siteConfig.authorName}</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {project.companyLogoImg && (
        <Image
          src={project.companyLogoImg}
          alt={project.companyName}
          width={project.id === "daemun-iii" ? 1234 : 720}
          height={project.id === "daemun-iii" ? 1000 : 405}
          className="my-8 w-full h-auto rounded-md border bg-muted transition-colors"
          priority
        />
      )}

      {project.id === "daemun-iii" && <p className="-mt-5 mb-8 text-sm text-muted-foreground">Conference-site preview running locally with bundled content. DAEMUN III is completed; the image shows the interface, not a current live service.</p>}
      {project.id === "cosmos-tvc-hopper" && <p className="-mt-5 mb-8 text-sm text-muted-foreground">CAD design render. Hardware integration and physical validation are in progress.</p>}

      {project.techStack.length > 0 && <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Tech Stack
        </h2>
        <ChipContainer textArr={project.techStack} />
      </div>}

      {project.id === "daemun-iii" ? <DaemunCaseStudy /> : <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          About the project
        </h2>
        {/* {<project.descriptionComponent />} */}
        <ProjectDescription
          paragraphs={project.descriptionDetails.paragraphs}
          bullets={project.descriptionDetails.bullets}
        />
      </div>}

      {project.paperLink && (
        <div className="mb-7 rounded-lg border bg-muted/40 p-5">
          <h2 className="flex items-center font-heading text-xl leading-tight lg:text-xl mb-2">
            <Icons.research className="h-5 w-5 mr-2" /> Research Paper
          </h2>
          <p className="text-muted-foreground mb-4">
            Read the full research paper this project produced, submitted
            for the school&apos;s research paper competition.
          </p>
          <Link
            href={project.paperLink}
            target="_blank"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Icons.post className="w-4 h-4 mr-2" /> View Full Paper (PDF)
          </Link>
        </div>
      )}

      {project.pagesInfoArr.length > 0 && <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-5">
          Project gallery
        </h2>
        {project.pagesInfoArr.map((page, ind) => (
          <div key={ind}>
            <h3 className="flex items-center font-heading text-xl leading-tight lg:text-xl mt-3">
              <Icons.star className="h-5 w-5 mr-2" /> {page.title}
            </h3>
            <div>
              <p>{page.description}</p>
              {page.imgArr
                .filter((img) => !!img)
                .map((img, ind) => (
                  <Image
                    src={img}
                    key={ind}
                    alt={`${page.title}, image ${ind + 1}`}
                    width={720}
                    height={405}
                    className="my-4 w-full h-auto rounded-md border bg-muted transition-colors"
                    priority
                  />
                ))}
              {page.videoArr
                ?.filter((video) => !!video)
                .map((video, ind) => (
                  <video
                    key={ind}
                    src={video}
                    controls
                    playsInline
                    className="my-4 w-full rounded-md border bg-muted transition-colors"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>}

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
