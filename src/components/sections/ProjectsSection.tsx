import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import ThreeDMarquee, { type MarqueeTile } from "@/components/ui/ThreeDMarquee";
import { projects } from "@/data/projects";

const showcase: MarqueeTile[] = [
  { title: "Nexus Platform", tag: "SaaS · Web App", accent: "from-white/12 to-white/5" },
  { title: "Pulse Analytics", tag: "Data Visualization", accent: "from-white/8 to-white/3" },
  { title: "Vertex Commerce", tag: "E-commerce", accent: "from-white/14 to-white/6" },
  { title: "Atlas Dashboard", tag: "Data Analysis", accent: "from-white/6 to-white/2" },
  { title: "Orbit CRM", tag: "Web Platform", accent: "from-white/10 to-white/4" },
  { title: "Lumen AI", tag: "AI · Automation", accent: "from-white/13 to-white/5" },
  { title: "Forge API", tag: "Backend · Cloud", accent: "from-white/7 to-white/3" },
  { title: "Halo Design", tag: "Design System", accent: "from-white/11 to-white/4" },
  { title: "Quanta", tag: "Realtime Data", accent: "from-white/9 to-white/3" },
  { title: "Strato", tag: "Infrastructure", accent: "from-white/12 to-white/5" },
  { title: "Mosaic", tag: "Web Design", accent: "from-white/8 to-white/3" },
  { title: "Beacon", tag: "Analytics Suite", accent: "from-white/10 to-white/4" },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="relative py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="A look at what we’ve shipped"
            description="Platforms, dashboards, and data products engineered for ambitious teams."
            align="center"
          />
        </Reveal>
      </Container>

      <Reveal className="mt-4">
        <ThreeDMarquee tiles={showcase} />
      </Reveal>

      <Container className="mt-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.08}>
              <SpotlightCard className="h-full">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {project.description}
                </p>
                {project.tags && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
