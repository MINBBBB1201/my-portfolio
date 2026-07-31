import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import BlogCard from "@/components/blogs/blog-card";
import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { HudCorners } from "@/components/common/hud-corners";
import { Icons } from "@/components/common/icons";
import ContributionCard from "@/components/contributions/contribution-card";
import ExperienceCard from "@/components/experience/experience-card";
import ProjectCard from "@/components/projects/project-card";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { featuredContributions } from "@/config/contributions";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { featuredSkills } from "@/config/skills";
import { getFeaturedBlogs } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

export const metadata: Metadata = {
  title: `${pagesConfig.home.metadata.title}`,
  description:
    "Minchan Kim - High school student building at the intersection of software engineering and aerospace. Explore my projects, experience, and contributions.",
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
    jobTitle: "Student / Aspiring AI & Aerospace Engineer",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="relative space-y-6 pb-12 pt-24 mb-0 md:pb-16 md:py-24 lg:py-28 min-h-screen flex items-center">
        <HudCorners className="absolute inset-6 sm:inset-10 md:inset-16" />
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <AnimatedText delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-[0.25em] text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Aerospace + AI Engineering Portfolio
            </span>
          </AnimatedText>
          <div className="relative mb-2 flex items-center justify-center py-6">
            <div
              className="absolute h-[145%] w-[145%] rounded-full border border-primary/15"
              aria-hidden="true"
            />
            <div
              className="absolute h-[118%] w-[118%] rounded-full border border-dashed border-primary/20"
              aria-hidden="true"
            />
            <div
              className="absolute h-[145%] w-[145%] animate-[spin_14s_linear_infinite] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary) / 0.5) 3%, transparent 8%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute h-full w-full rounded-2xl bg-primary/25 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative w-[75%] max-w-[19rem] sm:max-w-[21rem]">
              <Image
                src={profileImg}
                height={420}
                width={420}
                sizes="100vw"
                className="aspect-square w-full rounded-2xl border-2 border-primary object-cover shadow-xl shadow-primary/20"
                alt="Minchan Kim Portfolio"
                priority
              />
              <HudCorners size="sm" className="absolute -inset-3" />
            </div>
          </div>
          <AnimatedText
            as="h1"
            delay={0.2}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Minchan Kim
          </AnimatedText>
          <AnimatedText
            as="h3"
            delay={0.4}
            className="font-heading text-base sm:text-xl md:text-xl lg:text-2xl"
          >
            Student / Aspiring AI & Aerospace Engineer
          </AnimatedText>
          <div className="mt-4 max-w-[42rem] text-center">
            <p className="leading-normal text-muted-foreground text-sm sm:text-base">
              Building at the intersection of software engineering and
              aerospace — from flight-booking web apps to rocket propulsion
              test stands.
            </p>
          </div>

          <AnimatedText delay={0.5}>
            <div className="mt-8 flex flex-wrap items-stretch justify-center divide-x divide-primary/20 overflow-hidden rounded-lg border border-primary/20 bg-primary/5">
              {[
                { value: "05", label: "Projects Shipped" },
                { value: "10", label: "Team Led · COSMOS" },
                { value: "190N", label: "Peak Thrust" },
                { value: "3.94", label: "GPA" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-0.5 px-5 py-3 sm:px-7"
                >
                  <span className="font-mono text-lg sm:text-xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedText>

          <div className="flex flex-col mt-6 items-center justify-center sm:flex-row sm:space-x-4 gap-3">
            <AnimatedText delay={0.6}>
              <Link
                href={"/resume"}
                target="_blank"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "shadow-lg shadow-primary/25"
                )}
                aria-label="View resume"
              >
                <Icons.post className="w-4 h-4 mr-2" /> Resume
              </Link>
            </AnimatedText>
            <AnimatedText delay={0.8}>
              <Link
                href={"/contact"}
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })
                )}
                aria-label="Contact Minchan Kim"
              >
                <Icons.contact className="w-4 h-4 mr-2" /> Contact
              </Link>
            </AnimatedText>
          </div>
          <AnimatedText delay={1.2}>
            <Icons.chevronDown className="h-6 w-6 mt-10" />
          </AnimatedText>
        </div>
      </section>
      <AnimatedSection
        direction="up"
        className="container space-y-6 py-10 my-14"
        id="about"
      >
        <div className="mx-auto max-w-[48rem] space-y-4 text-center sm:text-left">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-center"
          >
            About
          </AnimatedText>
          <AnimatedText as="p" delay={0.2} className="text-muted-foreground leading-relaxed">
            I'm a 12th grader at Qingdao Daewon School studying Aviation,
            Aeronautics, and Aerospace Science and Technology. It started in a
            physics class assignment — designing and flight-testing an
            F-22-inspired RC aircraft — which turned into a research paper
            that won 1st place in the Physics Division of my school's
            research competition. That project is also what led me to found
            COSMOS, our school's aero-engineering club, where I've led a
            10-member team through a rocket motor thrust test stand and an
            open-circuit wind tunnel, from CAD design through fabrication and
            static-fire testing.
          </AnimatedText>
          <AnimatedText as="p" delay={0.3} className="text-muted-foreground leading-relaxed">
            I care about the same rigor showing up in software. Tern, a
            flight-booking app I built and maintain, and SmartFlight, an
            in-progress project with my school's Mechanics club, both come
            from the same instinct: build the thing, measure whether it
            actually works, and iterate from data instead of guesses. Outside
            the lab, I've served on my school's Student Council and run an
            anonymous peer-support channel through PSYCHOFISH — because I
            think the same attention to detail that goes into a wind tunnel
            should go into how you treat the people around you.
          </AnimatedText>
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="container space-y-6 bg-muted py-10 my-14"
        id="projects"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
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
          {experiences.slice(0, 3).map((experience, index) => (
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
        className="container space-y-6 bg-muted py-10 my-14"
        id="skills"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
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
