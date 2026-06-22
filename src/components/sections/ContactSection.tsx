import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="rounded-2xl border border-white/5 bg-surface px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready to build something exceptional?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Tell us about your project and we will help you design, engineer, and
            ship a platform that scales with your ambition.
          </p>
          <div className="mt-8">
            <Button href="mailto:hello@lumian.dev">Get in touch</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
