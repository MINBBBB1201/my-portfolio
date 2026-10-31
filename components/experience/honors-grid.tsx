import { Icons } from "@/components/common/icons";
import { academicStats, HonorInterface } from "@/config/honors";

interface HonorsGridProps {
  honors: HonorInterface[];
}

const typeIcon: Record<HonorInterface["type"], any> = {
  Award: Icons.trophy,
  Certification: Icons.certificate,
  Leadership: Icons.graduationCap,
  Research: Icons.research,
};

function groupHonors(honors: HonorInterface[]) {
  const groups = new Map<string, HonorInterface[]>();
  for (const honor of honors) {
    const name = honor.group ?? "Other";
    groups.set(name, [...(groups.get(name) ?? []), honor]);
  }
  return Array.from(groups, ([name, items]) => ({ name, items }));
}

export default function HonorsGrid({ honors }: HonorsGridProps) {
  return (
    <div className="mx-auto space-y-8">
      {groupHonors(honors).map(({ name, items }) => (
        <section key={name} className="space-y-3">
          <h3 className="font-heading text-lg sm:text-xl">{name}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((honor) => {
              const Icon = typeIcon[honor.type];
              return (
                <div
                  key={`${honor.title}-${honor.date}`}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-md bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold leading-snug">{honor.title}</h4>
                      {honor.detail && (
                        <p className="text-sm text-muted-foreground">{honor.detail}</p>
                      )}
                      {honor.issuer !== academicStats.school && (
                        <p className="text-sm text-muted-foreground">{honor.issuer}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{honor.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
