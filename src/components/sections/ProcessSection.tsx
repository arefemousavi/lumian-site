import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

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
    <section id="process" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for results"
          description="Three focused phases that turn vision into reliable, scalable software."
        />
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <span className="mb-4 block text-sm font-medium text-primary">
                0{index + 1}
              </span>
              <h3 className="text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
