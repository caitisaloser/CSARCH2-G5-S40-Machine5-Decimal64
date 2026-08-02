export default function StepDisplay({ steps, title = "Step-by-step solution" }) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <article className="output-card">
      <h2>{title}</h2>

      <ol className="steps">
        {steps.map((step, index) => (
          <li key={`${index}-${step}`}>
            {step}
          </li>
        ))}
      </ol>
    </article>
  );
}