import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Services built for scale"
          description="End-to-end expertise across design, engineering, and intelligent systems."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/5 bg-surface p-8"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
