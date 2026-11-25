"use cache";

import { Experience } from "@/types";
import experienceData from "@/public/data/experience.json";

import Link from "next/link";

function calculateYears(): number {
  const now = new Date();
  let earliestStart: Date | null = null;
  let latestEnd: Date | null = null;

  for (const exp of experienceData) {
    const start = new Date(`${exp.startDate}-01`);
    if (!earliestStart || start < earliestStart) {
      earliestStart = start;
    }

    const end = exp.endDate ? new Date(`${exp.endDate}-01`) : now;
    if (!latestEnd || end > latestEnd) {
      latestEnd = end;
    }
  }

  if (!earliestStart || !latestEnd) return 0;

  const totalMonths =
    (latestEnd.getFullYear() - earliestStart.getFullYear()) * 12 +
    (latestEnd.getMonth() - earliestStart.getMonth());

  return Math.ceil(totalMonths / 12);
}

function getExperiences(): Experience[] {
  return [...experienceData].sort((a, b) => {
    if (a.endDate === undefined && b.endDate === undefined) return 0;
    if (a.endDate === undefined) return -1; // present role sorts first
    if (b.endDate === undefined) return 1; // present role sorts first

    const bEndDate = new Date(`${b.endDate}-01`);
    const aEndDate = new Date(`${a.endDate}-01`);

    return bEndDate.getTime() - aEndDate.getTime();
  });
}

function getPeriod(experience: Experience): string {
  const start = new Date(`${experience.startDate}-01`);
  const startStr = start.toLocaleDateString(undefined, {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });

  if (!experience.endDate) return `${startStr} - Present`;

  const end = new Date(`${experience.endDate}-01`);
  const endStr = end.toLocaleDateString(undefined, {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });

  return `${startStr} - ${endStr}`;
}

export default async function ExperiencePage() {
  const experiences = getExperiences();
  const years = calculateYears();

  return (
    <div className="px-6 py-10 md:px-12 md:py-16 max-w-[65ch]">
      <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>

      <p className="mt-3 mb-10 max-w-[55ch] text-sm leading-relaxed text-muted">
        Here's where I've been and
        {years === 1
          ? " what I've worked on over the last year."
          : years > 0
            ? ` what I've worked on over the last ${years} years.`
            : " what I've worked on."}{" "}
        I hope something catches your interest!
      </p>

      {experiences.map((exp, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-base font-semibold tracking-tight">
            {exp.company} : {exp.role}
          </h2>
          <p className="text-xs text-muted">{getPeriod(exp)}</p>
          {exp.description && <p className="text-sm mt-2">{exp.description}</p>}
          {exp.technologies && (
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {exp.technologies.join(" | ")}
            </p>
          )}
        </section>
      ))}

      <div className="mt-12">
        <Link
          href="/resume/Fall%202026%20Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-hairline rounded-sm px-4 py-2 text-sm transition-colors duration-150 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-current hover:text-foreground"
        >
          View Full Resume
        </Link>
      </div>
    </div>
  );
}
