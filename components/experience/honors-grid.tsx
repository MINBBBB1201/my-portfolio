import { Icons } from "@/components/common/icons";
import { HonorInterface } from "@/config/honors";

interface HonorsGridProps {
  honors: HonorInterface[];
}

const typeIcon: Record<HonorInterface["type"], any> = {
  Award: Icons.trophy,
  Certification: Icons.certificate,
  Leadership: Icons.graduationCap,
};

export default function HonorsGrid({ honors }: HonorsGridProps) {
  return (
    <div className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {honors.map((honor, index) => {
        const Icon = typeIcon[honor.type];
        return (
          <div
            key={index}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-md bg-primary/10 p-2 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold leading-snug">{honor.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {honor.issuer}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {honor.date}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
