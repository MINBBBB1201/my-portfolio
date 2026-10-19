import Image from "next/image";
import Link from "next/link";

import { HoverGlow } from "@/components/common/hover-glow";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
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
          /> : <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-border bg-primary/5 text-primary">
            <Icons.research className="h-10 w-10" aria-hidden="true" />
            <span className="text-sm font-medium">{project.category[0]}</span>
          </div>}
        </div>
        <div className="pt-5 space-y-3 flex flex-col flex-grow">
          {project.status && <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{project.status}</span>}
          <h5 className="text-2xl font-bold tracking-tight text-foreground">
            {project.companyName}
          </h5>
          {project.role && <p className="text-sm text-muted-foreground">{project.role}</p>}
          <p className="line-clamp-3 font-normal text-muted-foreground flex-grow">
            {project.shortDescription}
          </p>
          <div className="flex gap-2 flex-wrap">
            <ChipContainer textArr={project.category} />
          </div>
          <Link href={`/projects/${project.id}`} className="mt-auto">
            <Button variant={"default"} className="mt-2 w-full sm:w-auto">
              Read more
              <Icons.chevronRight className="w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-4 right-4 p-3 rounded-full bg-background border border-border hidden md:block">
          {project.type === "Personal" ? (
            <Icons.userFill className="h-4 w-4" />
          ) : (
            <Icons.work className="h-4 w-4" />
          )}
        </div>
      </div>
    </HoverGlow>
  );
}
