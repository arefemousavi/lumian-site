import fs from "fs";
import path from "path";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CPU_IMAGE_PATHS } from "@/lib/constants";

function cpuImagesExist(): boolean {
  return CPU_IMAGE_PATHS.every((imagePath) => {
    const filePath = path.join(process.cwd(), "public", imagePath.replace(/^\//, ""));
    return fs.existsSync(filePath);
  });
}

export default function ProcessorReveal() {
  const showImages = cpuImagesExist();

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Core Technology"
          title="Precision at every layer"
          description="A scroll-driven reveal showcasing the engineering behind our platforms."
          align="center"
        />
        <div className="relative mx-auto aspect-square max-w-lg">
          {showImages ? (
            CPU_IMAGE_PATHS.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Processor layer ${index + 1}`}
                fill
                className="absolute inset-0 object-contain"
                priority={index === 0}
              />
            ))
          ) : (
            <div className="absolute inset-0 rounded-2xl border border-white/5 bg-surface" />
          )}
        </div>
      </Container>
    </section>
  );
}
