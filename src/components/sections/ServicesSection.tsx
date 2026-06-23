import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Services built for scale"
            description="End-to-end expertise across design, engineering, and intelligent systems."
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 0.1}>
              <SpotlightCard className="h-full">
                <span className="font-display text-sm font-semibold text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.description}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
