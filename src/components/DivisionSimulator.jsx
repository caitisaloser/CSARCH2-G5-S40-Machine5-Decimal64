import { useState } from 'react';
import { simulateDivision } from '../arithmetic/divisionGRS.js';
import "../styles/arithmetic.css";

export default function DivisionSimulator() {
    const [dividend, setDividend] = useState('');
    const [dividendFormat, setDividendFormat] = useState('decimal');
    const [divisor, setDivisor] = useState('');
    const [divisorFormat, setDivisorFormat] = useState('decimal');
    const [roundingMode, setRoundingMode] = useState('nearest-even');

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        if (!dividend || !divisor) {
            setError("Both Dividend and Divisor are required.");
            return;
        }

        const calculationResult = simulateDivision(
            dividend,
            dividendFormat,
            divisor,
            divisorFormat,
            roundingMode
        );

        if (!calculationResult.success) {
            setError(calculationResult.error);
        } else {
            setResult(calculationResult);
        }
    };

    const handleReset = () => {
        setDividend('');
        setDividendFormat('decimal');
        setDivisor('');
        setDivisorFormat('decimal');
        setRoundingMode('nearest-even');
        setResult(null);
        setError(null);
    };

    return (
        <main className="arithmetic-shell">
            <header className="arithmetic-header">
                <p className="eyebrow">Machine 5 · GRS Arithmetic</p>
                <h1>Decimal64 Division</h1>
                <p>Perform floating-point division using Guard, Round, and Sticky digits.</p>
            </header>

            <form className="arithmetic-card" onSubmit={handleCalculate}>
                <div className="operand-grid">
                    <div className="operand-group">
                        <label htmlFor="dividend">Dividend</label>
                        <input 
                            type="text" 
                            id="dividend" 
                            value={dividend} 
                            onChange={(e) => setDividend(e.target.value)} 
                            placeholder="e.g. 123.45"
                            autoComplete="off"
                        />
                        <select 
                            value={dividendFormat} 
                            onChange={(e) => setDividendFormat(e.target.value)}
                            aria-label="Dividend Format"
                        >
                            <option value="decimal">Decimal</option>
                            <option value="hex">IEEE Hex</option>
                        </select>
                    </div>

                    <div className="operator-display">÷</div>

                    <div className="operand-group">
                        <label htmlFor="divisor">Divisor</label>
                        <input 
                            type="text" 
                            id="divisor" 
                            value={divisor} 
                            onChange={(e) => setDivisor(e.target.value)} 
                            placeholder="e.g. -98.76"
                            autoComplete="off"
                        />
                        <select 
                            value={divisorFormat} 
                            onChange={(e) => setDivisorFormat(e.target.value)}
                            aria-label="Divisor Format"
                        >
                            <option value="decimal">Decimal</option>
                            <option value="hex">IEEE Hex</option>
                        </select>
                    </div>
                </div>

                <div className="rounding-section">
                    <label htmlFor="roundingMode">Rounding Method</label>
                    <select 
                        id="roundingMode" 
                        value={roundingMode} 
                        onChange={(e) => setRoundingMode(e.target.value)}
                    >
                        <option value="chopping">Chopping</option>
                        <option value="round-up">Round-up</option>
                        <option value="round-down">Round-down</option>
                        <option value="nearest-even">Round-to-nearest, ties-to-even</option>
                    </select>
                </div>

                <div className="action-row">
                    <button type="submit">Calculate</button>
                    <button type="button" className="secondary" onClick={handleReset}>Reset</button>
                </div>

                {error && <p className="arithmetic-error" role="alert">{error}</p>}
            </form>

            {result && (
                <section className="result-stack" aria-live="polite">
                    <div className="result-summary">
                        <div>
                            <span>Decimal Output</span>
                            <code>{result.finalDecimal}</code>
                        </div>
                        <div>
                            <span>Hexadecimal</span>
                            <code>{result.finalHex}</code>
                        </div>
                        <div>
                            <span>Rounding Applied</span>
                            <code style={{ fontSize: '0.9rem' }}>{roundingMode}</code>
                        </div>
                    </div>

                    {result.grs && (
                        <article className="output-card">
                            <h2>Guard, Round, and Sticky (GRS)</h2>
                            <div className="grs-grid">
                                <div>
                                    <span>Guard</span>
                                    <strong>{result.grs.guard}</strong>
                                </div>
                                <div>
                                    <span>Round</span>
                                    <strong>{result.grs.round}</strong>
                                </div>
                                <div>
                                    <span>Sticky</span>
                                    <strong>{result.grs.sticky}</strong>
                                </div>
                            </div>
                            <div className="rounding-detail">
                                <p><strong>Rounding Decision:</strong> {result.roundingExplanation}</p>
                            </div>
                        </article>
                    )}

                    <article className="output-card">
                        <h2>64-bit Binary Representation</h2>
                        <div className="binary-result">
                            <span>Formatted Binary</span>
                            <code className="binary-output">{result.finalBinary}</code>
                        </div>
                    </article>

                    <article className="output-card">
                        <h2>Step-by-Step Solution</h2>
                        <ol className="steps">
                            {result.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </article>
                </section>
            )}
        </main>
    );
}