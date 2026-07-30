"use client";

import * as React from "react";

import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

interface RepoActivity {
  repo: string;
  owner: string;
  description: string | null;
  stars: number | null;
  commitCount: number | null;
  lastCommitDate: string | null;
  url: string;
}

export default function GitHubActivity() {
  const [repos, setRepos] = React.useState<RepoActivity[] | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/github-activity", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { repos?: RepoActivity[] };
        if (!cancelled) setRepos(data.repos ?? []);
      } catch {
        // ignore, section just won't render stats
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-background p-4">
        <img
          src={`https://ghchart.rshah.org/38bdf8/${siteConfig.username}`}
          alt={`${siteConfig.authorName} GitHub contribution graph`}
          className="w-full min-w-[600px]"
        />
      </div>

      {repos && repos.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.filter((r) => !!r.url).map((r) => (
            <a
              key={`${r.owner}/${r.repo}`}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="flex items-center gap-2 font-semibold truncate">
                  <Icons.gitRepoIcon size={16} className="flex-shrink-0" />
                  <span className="truncate">{r.repo}</span>
                </h4>
                <Icons.externalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              </div>
              {r.description && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {r.description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icons.star className="h-3.5 w-3.5" />
                  {r.stars ?? "–"} stars
                </span>
                <span className="flex items-center gap-1">
                  <Icons.gitBranch className="h-3.5 w-3.5" />
                  {r.commitCount ?? "–"} commits
                </span>
                {r.lastCommitDate && (
                  <span className="flex items-center gap-1">
                    <Icons.clock className="h-3.5 w-3.5" />
                    Last commit {formatDate(r.lastCommitDate)}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
