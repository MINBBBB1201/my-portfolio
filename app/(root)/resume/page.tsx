import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getResumeData } from "@/lib/resume-data";

export const metadata: Metadata = { title: "Résumé", description: "Selected education, AI and engineering work, internships and school activities of Minchan Kim.", alternates: { canonical: "/resume" } };

export default function ResumePage() {
  const data = getResumeData();
  return (
    <article className="container max-w-3xl space-y-9 py-10 sm:py-16">
      <header className="space-y-4 border-b pb-8">
        <p className="text-sm text-primary">Résumé</p>
        <h1 className="font-heading text-4xl sm:text-5xl">{data.name}</h1>
        <p className="leading-relaxed text-muted-foreground">{data.focus}</p>
        <div className="flex flex-wrap gap-3">
          <a href="/resume.pdf" download="Minchan-Kim-Resume.pdf" className={buttonVariants()}>Résumé (1 page)</a>
          <a href="/cv-full.pdf" download="Minchan-Kim-CV.pdf" className={buttonVariants({ variant: "outline" })}>Full CV (2 pages)</a>
        </div>
        <p className="text-sm text-muted-foreground">The one-page résumé is a selection; the two-page CV adds more detail. Project pages contain the full accounts, images and source links.</p>
      </header>
      <section className="space-y-2">
        <h2 className="font-heading text-2xl">Education</h2>
        <p className="font-semibold">{data.education.school} · Class of {data.education.expectedGraduation}</p>
        <p>{data.education.gradeLevel} · GPA {data.education.gpa} ({data.education.gpaType})</p>
        <p className="text-muted-foreground">Intended field: Artificial Intelligence</p>
        <p className="text-muted-foreground">{data.apPlanned}</p>
      </section>
      {([ ["Experience & club leadership", data.experience], ["Selected projects", data.projects] ] as const).map(([heading, entries]) => (
        <section key={heading} className="space-y-5">
          <h2 className="font-heading text-2xl">{heading}</h2>
          {entries.map((item) => <div key={item.id} className="space-y-2 border-l-2 border-primary/30 pl-4">
            <h3 className="font-semibold"><Link href={item.href} className="underline decoration-primary/40 underline-offset-4">{item.title}</Link></h3>
            <p className="text-sm text-muted-foreground">{item.period}</p>
            {item.bullets.length > 0 && <ul className="list-disc space-y-2 pl-5 text-muted-foreground">{item.bullets.map((text) => <li key={text}>{text}</li>)}</ul>}
          </div>)}
        </section>
      ))}
      {([ ["Additional leadership", data.leadership], ["Selected honors and awards", data.honors] ] as const).map(([heading, entries]) => <section key={heading} className="space-y-3">
        <h2 className="font-heading text-2xl">{heading}</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">{entries.map((text) => <li key={text}>{text}</li>)}</ul>
      </section>)}
      <p className="-mt-5 text-sm text-muted-foreground">The full list of honors and awards is on the <Link href="/experience" className="underline decoration-primary/40 underline-offset-4">Experience page</Link>.</p>
      <section className="space-y-3"><h2 className="font-heading text-2xl">Skills</h2><p className="text-muted-foreground">{data.skills}</p><p className="text-muted-foreground">Languages: {data.languages}</p></section>
    </article>
  );
}
