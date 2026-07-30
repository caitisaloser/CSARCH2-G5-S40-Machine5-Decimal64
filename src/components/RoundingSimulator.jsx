import { useState } from "react";
import { performRounding } from "../rounding/roundingController";

export default function RoundingSimulator() {

    const [number, setNumber] = useState("");
    const [format, setFormat] = useState("decimal");
    const [targetDigits, setTargetDigits] = useState("");

    const [results, setResults] = useState([]);
    const [displayMethod, setDisplayMethod] = useState("all");

    const [error, setError] = useState("");

    const handleCalculate = () => {

        setError("");

        const response = performRounding(
            number,
            format,
            targetDigits
        );

        if (!response.success) {

            setResults([]);
            setError(response.error);

            return;
        }

        setResults(response.results);

        // Reset to showing everything after a new calculation
        setDisplayMethod("all");
    };

    const handleReset = () => {

        setNumber("");
        setFormat("decimal");
        setTargetDigits("");

        setResults([]);

        setDisplayMethod("all");

        setError("");
    };

    const displayedResults =
        displayMethod === "all"
            ? results
            : results.filter(
                  (item) => item.method === displayMethod
              );

    return (

        <div style={{ padding: "2rem" }}>

            <h1>Rounding Simulator</h1>

            <div style={{ marginBottom: "15px" }}>

                <label>Number</label>

                <br />

                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />

            </div>

            <div style={{ marginBottom: "15px" }}>

                <label>Format</label>

                <br />

                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                >

                    <option value="decimal">
                        Decimal
                    </option>

                    <option value="binary">
                        Binary
                    </option>

                </select>

            </div>

            <div style={{ marginBottom: "15px" }}>

                <label>Target Digits / Bits</label>

                <br />

                <input
                    type="number"
                    value={targetDigits}
                    onChange={(e) =>
                        setTargetDigits(e.target.value)
                    }
                />

            </div>

            <button onClick={handleCalculate}>
                Calculate
            </button>

            <button
                style={{ marginLeft: "10px" }}
                onClick={handleReset}
            >
                Reset
            </button>

            {error && (

                <p style={{ color: "red" }}>

                    {error}

                </p>

            )}

            {results.length > 0 && (

                <>

                    <hr style={{ marginTop: "30px" }} />

                    <h3>Display</h3>

                    <button
                        onClick={() =>
                            setDisplayMethod("all")
                        }
                    >
                        All
                    </button>

                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            setDisplayMethod("Chopping")
                        }
                    >
                        Truncate
                    </button>

                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            setDisplayMethod("Round-Up")
                        }
                    >
                        Ceiling
                    </button>

                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            setDisplayMethod("Round-Down")
                        }
                    >
                        Floor
                    </button>

                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            setDisplayMethod(
                                "Round-to-Nearest (Ties-to-Even)"
                            )
                        }
                    >
                        Ties to Even
                    </button>

                    <table
                        border="1"
                        cellPadding="8"
                        style={{
                            marginTop: "20px",
                            borderCollapse: "collapse",
                            width: "100%"
                        }}
                    >

                        <thead>

                            <tr>

                                <th>Method</th>

                                <th>Original</th>

                                <th>Retained</th>

                                <th>Discarded</th>

                                <th>Sign</th>

                                <th>Guard</th>

                                <th>Round</th>

                                <th>Sticky</th>

                                <th>Decision</th>

                                <th>Result</th>

                                <th>Explanation</th>

                            </tr>

                        </thead>

                        <tbody>

                            {displayedResults.map((item) => (

                                <tr key={item.method}>

                                    <td>{item.method}</td>

                                    <td>{item.original}</td>

                                    <td>{item.retained}</td>

                                    <td>{item.discarded}</td>

                                    <td>{item.sign}</td>

                                    <td>{item.guard}</td>

                                    <td>{item.round}</td>

                                    <td>{item.sticky}</td>

                                    <td>{item.decision}</td>

                                    <td>{item.result}</td>

                                    <td>{item.explanation}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </>

            )}

        </div>

    );
}