const logos: { name: string; url: string }[] = [
  { name: "Python", url: "https://cdn.simpleicons.org/python/64748b" },
  { name: "R", url: "https://cdn.simpleicons.org/r/64748b" },
  { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql/64748b" },
  { name: "Apache Spark", url: "https://cdn.simpleicons.org/apachespark/64748b" },
  { name: "Docker", url: "https://cdn.simpleicons.org/docker/64748b" },
  { name: "Google Cloud", url: "https://cdn.simpleicons.org/googlecloud/64748b" },
  { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Airflow", url: "https://cdn.simpleicons.org/apacheairflow/64748b" },
  { name: "Databricks", url: "https://cdn.simpleicons.org/databricks/64748b" },
  { name: "PyTorch", url: "https://cdn.simpleicons.org/pytorch/64748b" },
  { name: "TensorFlow", url: "https://cdn.simpleicons.org/tensorflow/64748b" },
  { name: "Keras", url: "https://cdn.simpleicons.org/keras/64748b" },
  { name: "scikit-learn", url: "https://cdn.simpleicons.org/scikitlearn/64748b" },
  { name: "Pandas", url: "https://cdn.simpleicons.org/pandas/64748b" },
  { name: "NumPy", url: "https://cdn.simpleicons.org/numpy/64748b" },
  { name: "FastAPI", url: "https://cdn.simpleicons.org/fastapi/64748b" },
  { name: "Svelte", url: "https://cdn.simpleicons.org/svelte/64748b" },
  { name: "Plotly", url: "https://cdn.simpleicons.org/plotly/64748b" },
  { name: "Tableau", url: "https://cdn.simpleicons.org/tableau/64748b" },
  { name: "LangChain", url: "https://cdn.simpleicons.org/langchain/64748b" },
  { name: "OpenAI", url: "https://cdn.simpleicons.org/openai/64748b" },
  { name: "Hugging Face", url: "https://cdn.simpleicons.org/huggingface/64748b" },
  { name: "Google Gemini", url: "https://cdn.simpleicons.org/googlegemini/64748b" },
];

export function TechMarquee() {
  const row = [...logos, ...logos];
  return (
    <div
      className="relative mt-10 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      aria-label="Tools and technologies"
    >
      <div className="flex w-max animate-marquee gap-12 py-4">
        {row.map((l, i) => (
          <div
            key={`${l.name}-${i}`}
            className="group flex h-14 w-28 shrink-0 items-center justify-center"
            title={l.name}
          >
            <img
              src={l.url}
              alt={l.name}
              loading="lazy"
              className="h-8 w-auto opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              onError={(e) => {
                (e.currentTarget.parentElement as HTMLElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
