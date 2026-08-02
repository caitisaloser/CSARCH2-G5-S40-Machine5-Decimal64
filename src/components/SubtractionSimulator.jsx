import { useState } from "react";
import { subtractDecimal64 } from "../arithmetic/subtractionGRS.js";
import ResultDisplay from "./ResultDisplay";
import StepDisplay from "./StepDisplay";
import ErrorMessage from "./ErrorMessage";
import "../styles/arithmetic.css";

function SubtractionSimulator() {
    const [operandA, setOperandA] = useState("");
    const [formatA, setFormatA] = useState("decimal");

    const [operandB, setOperandB] = useState("");
    const [formatB, setFormatB] = useState("decimal");

    const [roundingMode, setRoundingMode] =
        useState("nearest-even");

    const [output, setOutput] = useState(null);

    function handleCalculate(event) {
        event.preventDefault();

        const result = subtractDecimal64({
            operandA,
            formatA,
            operandB,
            formatB,
            roundingMode
        });

        setOutput(result);
    }

    function handleReset() {
        setOperandA("");
        setOperandB("");
        setFormatA("decimal");
        setFormatB("decimal");
        setRoundingMode("nearest-even");
        setOutput(null);
    }

    function loadExample(first, second) {
        setOperandA(first);
        setOperandB(second);
        setFormatA("decimal");
        setFormatB("decimal");
        setOutput(null);
    }

    return (
        <main className="arithmetic-shell">
            <header className="arithmetic-header">
                <p className="eyebrow">
                    Member 3 Module
                </p>

                <h1>
                    Decimal64 Subtraction Using GRS
                </h1>

                <p>
                    Enter two decimal64 operands, align their
                    exponents, generate Guard, Round and Sticky
                    digits, then display the final decimal,
                    binary and hexadecimal results.
                </p>
            </header>

            <section className="arithmetic-card">
                <form onSubmit={handleCalculate}>
                    <div className="operand-grid">
                        <div className="operand-group">
                            <label htmlFor="operand-a">
                                Operand A
                            </label>

                            <input
                                id="operand-a"
                                type="text"
                                value={operandA}
                                onChange={(event) =>
                                    setOperandA(
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    formatA === "decimal"
                                        ? "Example: 12.5"
                                        : "16 hexadecimal digits"
                                }
                            />

                            <label htmlFor="format-a">
                                Format of Operand A
                            </label>

                            <select
                                id="format-a"
                                value={formatA}
                                onChange={(event) =>
                                    setFormatA(
                                        event.target.value
                                    )
                                }
                            >
                                <option value="decimal">
                                    Decimal
                                </option>

                                <option value="hexadecimal">
                                    IEEE Decimal64 Hexadecimal
                                </option>
                            </select>
                        </div>

                       <div className="operator-display">
                            −
                       </div>

                        <div className="operand-group">
                            <label htmlFor="operand-b">
                                Operand B
                            </label>

                            <input
                                id="operand-b"
                                type="text"
                                value={operandB}
                                onChange={(event) =>
                                    setOperandB(
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    formatB === "decimal"
                                        ? "Example: 3.2"
                                        : "16 hexadecimal digits"
                                }
                            />

                            <label htmlFor="format-b">
                                Format of Operand B
                            </label>

                            <select
                                id="format-b"
                                value={formatB}
                                onChange={(event) =>
                                    setFormatB(
                                        event.target.value
                                    )
                                }
                            >
                                <option value="decimal">
                                    Decimal
                                </option>

                                <option value="hexadecimal">
                                    IEEE Decimal64 Hexadecimal
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="rounding-section">
                        <label htmlFor="rounding-mode">
                            Rounding Mode
                        </label>

                        <select
                            id="rounding-mode"
                            value={roundingMode}
                            onChange={(event) =>
                                setRoundingMode(
                                    event.target.value
                                )
                            }
                        >
                            <option value="chopping">
                                Chopping
                            </option>

                            <option value="round-up">
                                Round Up
                            </option>

                            <option value="round-down">
                                Round Down
                            </option>

                            <option value="nearest-even">
                                Round to Nearest, Ties to Even
                            </option>
                        </select>
                    </div>

                    <div className="action-row">
                        <button type="submit">
                            Calculate
                        </button>

                        <button
                            type="button"
                            className="secondary"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <div className="example-row">
                    <button
                        type="button"
                        className="example"
                        onClick={() =>
                            loadExample("12.5", "3.2")
                        }
                    >
                        12.5 − 3.2
                    </button>

                    <button
                        type="button"
                        className="example"
                        onClick={() =>
                            loadExample("12.5", "-3.2")
                        }
                    >
                        12.5 − (−3.2)
                    </button>

                    <button
                        type="button"
                        className="example"
                        onClick={() =>
                            loadExample("-12.5", "3.2")
                        }
                    >
                        −12.5 − 3.2
                    </button>

                    <button
                        type="button"
                        className="example"
                        onClick={() =>
                            loadExample("5.5", "5.5")
                        }
                    >
                        5.5 − 5.5
                    </button>

                    <button
                        type="button"
                        className="example"
                        onClick={() =>
                            loadExample(
                                "1234567890123456",
                                "0.0000000000000001"
                            )
                        }
                    >
                        GRS example
                    </button>
                </div>

                {output && !output.success && (
                    <ErrorMessage message={output.error} />
                )}
            </section>

            {output?.success && (
                <section className="result-stack">
                    <OperandDetails
                        title="Operand A"
                        operand={output.operandA}
                    />

                    <OperandDetails
                        title="Operand B"
                        operand={output.operandB}
                    />

                    {output.alignment && (
                        <AlignmentDisplay
                            alignment={output.alignment}
                        />
                    )}

                    {output.grs && (
                        <GRSDisplay grs={output.grs} />
                    )}

                    <ResultDisplay result={output.result} />

                    <StepDisplay steps={output.steps} />
                </section>
            )}
        </main>
    );
}

function OperandDetails({ title, operand }) {
    if (!operand) {
        return null;
    }

    return (
        <article className="output-card">
            <h2>{title}</h2>

            <div className="field-grid">
                <div>
                    <span>Original</span>
                    <code>{operand.original}</code>
                </div>

                <div>
                    <span>Input Format</span>
                    <code>{operand.sourceFormat}</code>
                </div>

                <div>
                    <span>Classification</span>
                    <code>
                        {operand.classification ??
                            operand.kind}
                    </code>
                </div>

                <div>
                    <span>Sign</span>
                    <code>
                        {operand.sign === 1
                            ? "Negative"
                            : "Positive"}
                    </code>
                </div>

                <div>
                    <span>Coefficient</span>
                    <code>
                        {operand.coefficientDigits ??
                            "Not applicable"}
                    </code>
                </div>

                <div>
                    <span>Exponent</span>
                    <code>
                        {operand.exponent ??
                            "Not applicable"}
                    </code>
                </div>
            </div>
        </article>
    );
}

function AlignmentDisplay({ alignment }) {
    return (
        <article className="output-card">
            <h2>Exponent Alignment</h2>

            <div className="field-grid">
                <div>
                    <span>Common Exponent</span>
                    <code>
                        {alignment.commonExponent}
                    </code>
                </div>

                <div>
                    <span>Operand A Shift</span>
                    <code>{alignment.shiftA}</code>
                </div>

                <div>
                    <span>Aligned Coefficient A</span>
                    <code>
                        {alignment.alignedDigitsA}
                    </code>
                </div>

                <div>
                    <span>Operand B Shift</span>
                    <code>{alignment.shiftB}</code>
                </div>

                <div>
                    <span>Aligned Coefficient B</span>
                    <code>
                        {alignment.alignedDigitsB}
                    </code>
                </div>
            </div>
        </article>
    );
}

function GRSDisplay({ grs }) {
    return (
        <article className="output-card">
            <h2>Guard, Round and Sticky Digits</h2>

            <div className="grs-grid">
                <div>
                    <span>Guard</span>
                    <strong>{grs.guard}</strong>
                </div>

                <div>
                    <span>Round</span>
                    <strong>{grs.round}</strong>
                </div>

                <div>
                    <span>Sticky</span>
                    <strong>{grs.sticky}</strong>
                </div>
            </div>

            {grs.discarded !== undefined && (
                <div className="rounding-detail">
                    <p>
                        <strong>Discarded digits:</strong>{" "}
                        {grs.discarded || "None"}
                    </p>

                    <p>
                        <strong>Decision:</strong>{" "}
                        {grs.decision}
                    </p>
                </div>
            )}
        </article>
    );
}

export default SubtractionSimulator;