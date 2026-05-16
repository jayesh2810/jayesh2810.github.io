import { ArrowRight, Download, MapPin } from "lucide-react";
import profile from "@/assets/profile.jpeg";
import { portfolio } from "@/data/portfolio";
import { ParticleCanvas } from "@/components/portfolio/ParticleCanvas";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[70vh] overflow-hidden md:min-h-[80vh]">
      <ParticleCanvas />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-hero-glow" />
      <div className="container-page relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for new opportunities
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]">
              Hi, I'm {portfolio.name.split(" ")[0]}.
              <br />
              <span className="text-muted-foreground">{portfolio.title}.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {portfolio.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#experience"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
              >
                View my work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={portfolio.resumeUrl}
                download
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
              >
                <Download className="h-4 w-4" /> Download resume
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {portfolio.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <a href={`mailto:${portfolio.email}`} className="hover:text-foreground transition">
                {portfolio.email}
              </a>
            </div>
          </div>

          <div className="relative justify-self-center md:justify-self-end">
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-soft bg-surface">
              <img
                src={profile}
                alt={`Portrait of ${portfolio.name}`}
                className="h-72 w-72 sm:h-80 sm:w-80 object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
