import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { daemunCaseStudy, daemunEvidenceLinks } from "@/config/daemun-case-study";

export default function DaemunCaseStudy() {
  return (
    <Tabs defaultValue="en" className="mb-10">
      <TabsList aria-label="Project story language" className="mb-6 h-12">
        <TabsTrigger value="en" className="min-h-10 px-5">English</TabsTrigger>
        <TabsTrigger value="ko" className="min-h-10 px-5">한국어</TabsTrigger>
      </TabsList>
      {(["en", "ko"] as const).map((language) => {
        const copy = daemunCaseStudy[language];
        return (
          <TabsContent key={language} value={language} lang={language} className="space-y-10">
            <section className="space-y-4">
              <h2 className="font-heading text-3xl">{copy.label}</h2>
              <p className="text-lg leading-relaxed">{copy.intro}</p>
            </section>
            {copy.sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="font-heading text-2xl">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed">{paragraph}</p>
                ))}
              </section>
            ))}
            <section className="space-y-6">
              <h2 className="font-heading text-3xl">{copy.galleryTitle}</h2>
              {[
                { src: "/projects/daemun-iii/02-roger-preview.webp", width: 1234, height: 712, alt: "Roger chat panel with its built-in opening message, without a generated reply", caption: copy.chatCaption },
                { src: "/projects/daemun-iii/03-submission-flow.svg", width: 1440, height: 900, alt: "Team lead uploads a draft, the API records a version and notifies teammates, then an organizer reviews and publishes it by committee", caption: copy.flowCaption },
              ].map((figure) => (
                <figure key={figure.src} className="space-y-3">
                  <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full rounded-lg border bg-muted" />
                  <figcaption className="text-sm leading-relaxed text-muted-foreground">{figure.caption}</figcaption>
                </figure>
              ))}
            </section>
            <section className="space-y-3 rounded-lg border p-5">
              <h2 className="font-heading text-2xl">{copy.evidenceTitle}</h2>
              <p className="text-sm text-muted-foreground">{copy.evidenceNote}</p>
              <ul className="space-y-2">
                {copy.sources.map((source, index) => (
                  <li key={source}><Link href={daemunEvidenceLinks[index]} target="_blank" rel="noreferrer" className="inline-block py-1 underline underline-offset-4">{source} ↗</Link></li>
                ))}
              </ul>
            </section>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
