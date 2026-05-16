import { Linkedin, Github, ArrowUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} {portfolio.name}. Built with care.
        </div>
        <div className="flex items-center gap-2">
          <a
            href={portfolio.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={portfolio.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary transition"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="#top"
            className="ml-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
