import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import BlogCard from "@/components/blogs/blog-card";
import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { AmbientGlow } from "@/components/common/ambient-glow";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { FloatingIcons } from "@/components/common/floating-icons";
import { HudCorners } from "@/components/common/hud-corners";
import { Icons } from "@/components/common/icons";
import { ParticleNetwork } from "@/components/common/particle-network";
import { SectionLabel } from "@/components/common/section-label";
import { StudioLamp } from "@/components/common/studio-lamp";
import ContributionCard from "@/components/contributions/contribution-card";
import XerjReference from "@/components/contributions/xerj-reference";
import ExperienceCard from "@/components/experience/experience-card";
import ProjectCard from "@/components/projects/project-card";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { featuredContributions } from "@/config/contributions";
import { featuredExperiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { featuredSkills } from "@/config/skills";
import { getFeaturedBlogs } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

export const metadata: Metadata = {
  title: `${pagesConfig.home.metadata.title}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
  const featuredBlogs = getFeaturedBlogs();
  // Structured data for personal portfolio
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: siteConfig.headline,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
        <AmbientGlow />
        <HudCorners className="absolute inset-4 sm:inset-8" />
        <div className="container relative grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-medium text-primary">Qingdao Daewon School · Class of 2027</p>
            <h1 className="font-heading text-4xl leading-tight sm:text-6xl lg:text-7xl">Minchan Kim</h1>
            <p className="text-xl font-semibold sm:text-2xl">Artificial intelligence, in software and hardware.</p>
            <p className="max-w-xl leading-relaxed text-muted-foreground sm:text-lg">
              I'm a high school senior planning to study AI. I build AI assistants
              and computer-vision projects, and lead COSMOS, where our team is
              exploring reinforcement learning for physical control.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="#projects" className={buttonVariants({ size: "lg" })}>
                Selected projects <Icons.chevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "lg" })}>
                <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
              </Link>
              <Link href="/resume" className={buttonVariants({ variant: "ghost", size: "lg" })}>Résumé</Link>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with <Link href="/projects/daemun-iii" className="font-medium text-primary underline underline-offset-4">DAEMUN III</Link>,
              the completed conference platform Junwon Kim and I co-developed.
            </p>
          </div>
          <StudioLamp src={profileImg} alt="Minchan Kim" compact className="hidden md:flex" />
        </div>
      </section>
      <AnimatedSection
        direction="up"
        className="relative container space-y-6 py-10 my-14 overflow-hidden"
        id="about"
      >
        <FloatingIcons className="hidden opacity-60 lg:block" />
        <div className="mx-auto max-w-[48rem] space-y-4 text-center sm:text-left">
          <SectionLabel index="01" label="About" />
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-center"
          >
            About
          </AnimatedText>
          <AnimatedText as="p" delay={0.2} className="text-muted-foreground leading-relaxed">
            I'm a senior at Qingdao Daewon School planning to study AI.
            My projects range from a camera-based tracking rig to an AI
            assistant for a Model UN conference. In COSMOS, the engineering
            club I co-founded, our team is developing an EDF hopper to compare
            reinforcement learning with conventional control.
          </AnimatedText>
          <AnimatedText as="p" delay={0.3} className="text-muted-foreground leading-relaxed">
            I'm also developing logistics tools during my JSL internship,
            including document-based AI support and a 3D cargo planner.
            I co-developed DAEMUN III with Junwon Kim and continue to build
            Tern, my flight-search and booking app. Each project gives me
            a different problem to work through, from deciding which information
            an AI answer can use to checking what a physical test actually measured.
          </AnimatedText>
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="relative container space-y-6 bg-muted py-10 my-14"
        id="projects"
      >
        <ParticleNetwork
          className="absolute inset-0 hidden md:block"
          density={0.02}
          maxParticles={45}
        />
        <HudCorners size="sm" className="absolute inset-3 sm:inset-6 hidden md:block" />
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <SectionLabel index="02" label="Projects" />
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.projects.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.projects.description}
          </AnimatedText>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch">
            {featuredProjects.map((exp, index) => (
              <AnimatedSection
                key={exp.id}
                delay={0.1 * (index + 1)}
                direction="up"
                className="h-full w-full min-w-0"
              >
                <ProjectCard project={exp} />
              </AnimatedSection>
            ))}
          </div>
        </div>
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/projects">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="container space-y-6 py-10 my-14"
        id="experience"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <SectionLabel index="03" label="Experience" />
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.experience.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.experience.description}
          </AnimatedText>
        </div>
        <div className="mx-auto grid justify-center gap-4 md:w-full lg:grid-cols-3">
          {featuredExperiences.map((experience, index) => (
            <AnimatedSection
              key={experience.id}
              delay={0.1 * (index + 1)}
              direction="up"
            >
              <ExperienceCard experience={experience} />
            </AnimatedSection>
          ))}
        </div>
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/experience">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="container space-y-6 bg-muted py-10 my-14"
        id="contributions"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <SectionLabel index="04" label="Contributions" />
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.contributions.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.contributions.description}
          </AnimatedText>
        </div>
        <XerjReference />
        <ContributionCard contributions={featuredContributions} />
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/contributions">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="container space-y-6 py-10 my-14"
        id="blogs"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <SectionLabel index="05" label="Blogs" />
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.blogs.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.blogs.description}
          </AnimatedText>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch">
          {featuredBlogs.map((blog, index) => (
            <AnimatedSection
              key={blog.slug}
              delay={0.1 * (index + 1)}
              direction="up"
              className="h-full w-full min-w-0"
            >
              <BlogCard blog={blog} />
            </AnimatedSection>
          ))}
        </div>
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/blogs">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="relative container space-y-6 bg-muted py-10 my-14"
        id="skills"
      >
        <ParticleNetwork
          className="absolute inset-0 hidden md:block"
          density={0.02}
          maxParticles={45}
        />
        <HudCorners size="sm" className="absolute inset-3 sm:inset-6 hidden md:block" />
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <SectionLabel index="06" label="Skills" />
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.skills.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.skills.description}
          </AnimatedText>
        </div>
        <SkillsCard skills={featuredSkills} />
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/skills">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>
    </ClientPageWrapper>
  );
}
