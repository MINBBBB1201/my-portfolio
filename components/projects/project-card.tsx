import Image from "next/image";
import Link from "next/link";

import { HoverGlow } from "@/components/common/hover-glow";
import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <HoverGlow className="h-full">
      <div className="relative p-6 w-full bg-background border border-border rounded-lg h-full flex flex-col">
        <div className="relative w-full h-[200px] flex-shrink-0">
          {project.companyLogoImg ? <Image
            className="rounded-lg border border-border object-cover"
            src={project.companyLogoImg}
            alt={project.companyName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          /> : <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-border bg-primary/5 text-primary">
            <Icons.research className="h-10 w-10" aria-hidden="true" />
            <span className="text-sm font-medium">{project.category[0]}</span>
          </div>}
        </div>
        <div className="pt-5 space-y-3 flex flex-col flex-grow">
          {project.status && <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{project.status}</span>}
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {project.companyName}
          </h3>
          {project.role && <p className="text-sm text-muted-foreground">{project.role}</p>}
          <p className="font-normal text-muted-foreground flex-grow">
            {project.shortDescription}
          </p>
          <div className="flex gap-2 flex-wrap">
            <ChipContainer textArr={project.category} />
          </div>
          <Link href={`/projects/${project.id}`} className={cn(buttonVariants(), "mt-2 w-fit")} aria-label={`Read about ${project.companyName}`}>
            Read project <Icons.chevronRight className="w-4 ml-1" />
          </Link>
        </div>
      </div>
    </HoverGlow>
  );
}
