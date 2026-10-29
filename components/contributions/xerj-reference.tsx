import Image from "next/image";

export default function XerjReference() {
  return (
    <aside className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="space-y-1">
        <h3 className="font-semibold">XERJ Corpus Hub</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A portfolio update was selected for the XERJ Corpus Hub as a code reference, with attribution to this repository.
        </p>
      </div>
      <a href="https://hub.xerj.org/contributors/MINBBBB1201" target="_blank" rel="noopener noreferrer" className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" aria-label="View my XERJ Corpus Hub contributor page">
        <Image src="https://hub.xerj.org/contributors/MINBBBB1201/badge.svg" alt="XERJ Corpus Hub contributor" width={199} height={20} unoptimized />
      </a>
    </aside>
  );
}
