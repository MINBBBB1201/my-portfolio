import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-wrap items-center justify-center gap-6 mt-10 py-10 md:min-h-24">
        <Link href="/resume" className="text-sm text-muted-foreground underline underline-offset-4">Résumé</Link>
        {SocialLinks.filter((item) => !!item.link).map((item, ind) => (
          <CustomTooltip icon={item.icon} text={item.username} key={ind}>
            <Link
              href={item.link}
              aria-label={item.name}
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "h-10 w-10 p-2"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          </CustomTooltip>
        ))}
      </div>
    </footer>
  );
}
