import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="work" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Projects that define us"
          description="A glimpse into the platforms and products we have engineered for ambitious teams."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-white/5 bg-surface p-8"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 text-muted">{project.description}</p>
              {project.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
