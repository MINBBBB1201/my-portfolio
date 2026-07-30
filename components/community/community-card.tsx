import { Icons } from "@/components/common/icons";
import { CommunityInterface } from "@/config/community";

interface CommunityCardProps {
  items: CommunityInterface[];
}

export default function CommunityCard({ items }: CommunityCardProps) {
  return (
    <div className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-background p-5"
        >
          <div className="flex items-center gap-2 mb-1">
            <Icons.userFill className="h-4 w-4 text-primary flex-shrink-0" />
            <h4 className="font-semibold">{item.name}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{item.role}</p>
          <p className="text-xs text-muted-foreground mb-3">{item.period}</p>
          <ul className="space-y-1.5">
            {item.description.map((line, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground leading-snug pl-3 relative before:content-['•'] before:absolute before:left-0"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
