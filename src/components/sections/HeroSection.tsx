import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function HeroSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Lumian Technology
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Engineering digital systems with clarity.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            We build scalable software products and intelligent platforms that
            help ambitious teams ship faster, operate smarter, and deliver
            premium digital experiences.
          </p>
          <div className="mt-10">
            <Button href="#contact">Start a project</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
