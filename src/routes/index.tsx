import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Jayesh Bhadane | Machine Learning Engineer & Data Scientist" },
      {
        name: "description",
        content:
          "Portfolio of Jayesh Bhadane, an ML Engineer and Data Scientist building agentic AI systems, deep learning models, and analytics that drive measurable outcomes.",
      },
      { property: "og:title", content: "Jayesh Bhadane | ML Engineer & Data Scientist" },
      {
        property: "og:description",
        content:
          "Agentic AI, deep learning and applied data science: projects, experience and contact.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
