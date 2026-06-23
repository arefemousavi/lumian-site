import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    title: "Discover",
    description:
      "We align on goals, constraints, and opportunities to define a clear product direction.",
  },
  {
    title: "Design",
    description:
      "We craft intuitive experiences and robust architecture before a single line of code.",
  },
  {
    title: "Develop",
    description:
      "We build, test, and ship with precision — iterating toward production-ready quality.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title="A process built for results"
            description="Three focused phases that turn vision into reliable, scalable software."
          />
        </Reveal>
        <div className="relative grid gap-8 sm:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.12}>
              <div className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-surface font-display text-sm font-semibold text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
