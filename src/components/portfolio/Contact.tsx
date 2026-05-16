import { Mail, Phone, MapPin, Linkedin, Github, Download, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-page">
        <div className="rounded-3xl border border-border bg-surface shadow-soft p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-widest">Contact</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
                Have a role, project, or collaboration in mind?
              </h2>
              <p className="mt-4 text-muted-foreground">
                I'm open to ML engineering, data science and applied AI opportunities.
                The fastest way to reach me is email. I usually reply within a day.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                >
                  <Mail className="h-4 w-4" /> Email me
                </a>
                <a
                  href={portfolio.resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
                >
                  <Download className="h-4 w-4" /> Resume
                </a>
              </div>
            </div>

            <ul className="space-y-3">
              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={portfolio.email}
                href={`mailto:${portfolio.email}`}
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={portfolio.phone}
                href={`tel:${portfolio.phone.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={portfolio.location}
              />
              <ContactRow
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                value="linkedin.com/in/jayesh-bhadane"
                href={portfolio.socials.linkedin}
                external
              />
              <ContactRow
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                value="github.com/jayesh281998"
                href={portfolio.socials.github}
                external
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3 hover:border-primary/40 transition">
      <div className="flex items-center gap-3 min-w-0">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground shrink-0">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-sm font-medium truncate">{value}</div>
        </div>
      </div>
      {href && <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
    </div>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
