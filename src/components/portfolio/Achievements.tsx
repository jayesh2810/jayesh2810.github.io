import { Trophy, Award, FileText } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  publication: <FileText className="h-5 w-5" />,
};

export function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Achievements</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Highlights.</h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {portfolio.achievements.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-soft hover:border-primary/30 transition"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                {iconMap[a.icon]}
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View publication
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
