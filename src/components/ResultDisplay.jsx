export default function ResultDisplay({
    result,
    title = "Final Result",
    showDecimal = true
}) {
    if (!result) {
        return null;
    }

    return (
        <article className="output-card">
            <h2>{title}</h2>

            <div className="result-summary">

                {showDecimal && result.decimal !== undefined && (
                    <div>
                        <span>Decimal</span>
                        <code>{result.decimal}</code>
                    </div>
                )}

                {(result.kind || result.classification) && (
                    <div>
                        <span>Classification</span>
                        <code>
                            {result.kind ?? result.classification}
                        </code>
                    </div>
                )}

                {result.hexadecimal && (
                    <div>
                        <span>Hexadecimal</span>
                        <code>{result.hexadecimal}</code>
                    </div>
                )}

            </div>

            {result.formattedBinary && (
                <div className="binary-result">
                    <span>Binary with proper spacing</span>

                    <code className="binary-output">
                        {result.formattedBinary}
                    </code>
                </div>
            )}

            {result.rawBinary && (
                <details>
                    <summary>
                        Show raw 64-bit binary
                    </summary>

                    <code className="raw-output">
                        {result.rawBinary}
                    </code>
                </details>
            )}

        </article>
    );
}