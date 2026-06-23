import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-8 py-20 text-center sm:px-16">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Ready to build something{" "}
                <span className="text-gradient">exceptional</span>?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                Tell us about your project and we will help you design, engineer,
                and ship a platform that scales with your ambition.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button href="mailto:hello@lumian.dev">Get in touch</Button>
                <Button href="#work" variant="secondary">
                  See our work
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
