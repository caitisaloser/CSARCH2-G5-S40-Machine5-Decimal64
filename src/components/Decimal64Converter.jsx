import { useState } from "react";
import { encodeDecimal64 } from "../decimal64/decimal64Encoder";
import { FIELD_LABELS } from "../decimal64/binaryFormatter";
import "../styles/converter.css";
import StepDisplay from "./StepDisplay";

const EXAMPLES = [
  "123.45",
  "-98.765",
  "-0",
  "1.2345e10",
  "9.999e-20",
  "Infinity",
  "-Infinity",
  "NaN"
];

export default function Decimal64Converter() {
  const [input, setInput] = useState("123.45");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function copyToClipboard(value, type) {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      window.setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setCopied("");
    }
  }

  function convert(event) {
    event?.preventDefault();

    try {
      setResult(encodeDecimal64(input));
      setError("");
    } catch (conversionError) {
      setResult(null);
      setError(conversionError.message);
    }
  }

  function reset() {
    setInput("");
    setResult(null);
    setError("");
    setCopied("");
  }

  return (
    <main className="converter-shell">
      <header className="converter-header">
        <p className="eyebrow">Machine 5 · IEEE 754</p>

        <h1>Decimal64 Converter</h1>

        <p>
          Encode decimal input as a 64-bit{" "}
          <strong>Binary Integer Decimal (BID)</strong> value.
        </p>
      </header>

      <form className="converter-card" onSubmit={convert}>
        <label htmlFor="decimal-input">
          Decimal input
        </label>

        <div className="input-row">
          <input
            id="decimal-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. -98.765 or 1.2e10"
            autoComplete="off"
          />

          <button type="submit">
            Convert
          </button>

          <button
            type="button"
            className="secondary"
            onClick={reset}
          >
            Reset
          </button>
        </div>

        <div
          className="example-row"
          aria-label="Example inputs"
        >
          {EXAMPLES.map((example) => (
            <button
              type="button"
              className="example"
              key={example}
              onClick={() => setInput(example)}
            >
              {example}
            </button>
          ))}
        </div>

        {error && (
          <p
            className="converter-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </form>

      {result && (
        <section
          className="result-stack"
          aria-live="polite"
        >
          <div className="result-summary">

            <div>
              <span>Classification</span>
              <strong>{result.kind}</strong>
            </div>

            <div>
              <span>Encoding</span>
              <strong>{result.encoding}</strong>
            </div>

            <div>
              <span>Hexadecimal</span>

              <code>
                {result.hexadecimal}
              </code>

              <button
                type="button"
                className="copy-button"
                onClick={() =>
                  copyToClipboard(
                    result.hexadecimal,
                    "hexadecimal"
                  )
                }
              >
                {copied === "hexadecimal"
                  ? "Copied!"
                  : "Copy Hexadecimal"}
              </button>
            </div>

          </div>

          <article className="output-card">
            <h2>64-bit representation</h2>

            <p className="field-labels">
              {FIELD_LABELS}
            </p>

            <code className="binary-output">
              {result.formattedBinary}
            </code>

            <button
              type="button"
              className="copy-button"
              onClick={() =>
                copyToClipboard(
                  result.rawBinary,
                  "binary"
                )
              }
            >
              {copied === "binary"
                ? "Copied!"
                : "Copy Binary"}
            </button>

            <details>
              <summary>
                Raw 64 bits
              </summary>

              <code className="raw-output">
                {result.rawBinary}
              </code>
            </details>
          </article>

          <article className="output-card">
            <h2>Field values</h2>

            <div className="field-grid">

              <div>
                <span>Sign</span>
                <code>{result.fields.sign}</code>
              </div>

              <div>
                <span>Combination</span>
                <code>
                  {result.fields.combination}
                </code>
              </div>

              <div>
                <span>
                  Exponent continuation
                </span>

                <code>
                  {result.fields.exponentContinuation}
                </code>
              </div>

              <div>
                <span>
                  Coefficient continuation
                </span>

                <code>
                  {result.fields.coefficientContinuation}
                </code>
              </div>

              {result.coefficientDigits !== undefined && (
                <div>
                  <span>Coefficient</span>
                  <code>
                    {result.coefficientDigits}
                  </code>
                </div>
              )}

              {result.exponent !== undefined && (
                <div>
                  <span>Exponent</span>
                  <code>
                    {result.exponent}
                  </code>
                </div>
              )}

              {result.biasedExponent !== undefined && (
                <div>
                  <span>Biased exponent</span>
                  <code>
                    {result.biasedExponent}
                  </code>
                </div>
              )}

            </div>
          </article>

          <StepDisplay
            steps={result.steps}
            title="Step-by-step conversion"
          />
        </section>
      )}
    </main>
  );
}