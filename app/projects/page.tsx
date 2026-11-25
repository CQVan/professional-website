import { Project } from "@/types";
import projectsData from "@/public/data/projects.json";

function getProjects(): Project[] {
  return [...projectsData];
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="px-6 py-10 md:px-12 md:py-16 max-w-[65ch]">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>

      <p className="mt-3 mb-10 max-w-[55ch] text-sm leading-relaxed text-muted">
        Here's what I've built.
      </p>

      {projects.map((project, i) => (
        <section key={i} className="mb-8">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold tracking-tight underline underline-offset-2 hover:text-blue-600"
            >
              {project.title}
            </a>
          ) : (
            <h2 className="text-base font-semibold tracking-tight">
              {project.title}
            </h2>
          )}
          <p className="text-sm mt-2 leading-relaxed">
            {project.description}
          </p>
          {project.technologies && (
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {project.technologies.join(" | ")}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}