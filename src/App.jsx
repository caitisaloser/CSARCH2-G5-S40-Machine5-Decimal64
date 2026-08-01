import { useEffect, useState } from "react";
import Decimal64Converter from "./components/Decimal64Converter";
import RoundingSimulator from "./components/RoundingSimulator";
import SubtractionSimulator from "./components/SubtractionSimulator";
import "./styles/global.css";

function App() {

    const [module, setModule] = useState("converter");

    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") {
            return "light";
        }

        const savedTheme =
            window.localStorage.getItem("decimal64-theme");

        if (
            savedTheme === "light" ||
            savedTheme === "dark"
        ) {
            return savedTheme;
        }

        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;

        window.localStorage.setItem(
            "decimal64-theme",
            theme
        );
    }, [theme]);

    return (
        <>
            <nav
                className="module-nav"
                aria-label="Machine modules"
            >
                <strong>Decimal64 Machine</strong>

                <div className="nav-actions">

                    <button
                        className={
                            module === "converter"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setModule("converter")
                        }
                    >
                        Converter
                    </button>

                    <button
                        className={
                            module === "rounding"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setModule("rounding")
                        }
                    >
                        Rounding
                    </button>

                    <button
                        className={
                            module === "subtraction"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setModule("subtraction")
                        }
                    >
                        Subtraction
                    </button>

                    <button
                        className="theme-toggle"
                        type="button"
                        aria-label={`Switch to ${
                            theme === "light"
                                ? "dark"
                                : "light"
                        } mode`}
                        aria-pressed={theme === "dark"}
                        onClick={() =>
                            setTheme((currentTheme) =>
                                currentTheme === "light"
                                    ? "dark"
                                    : "light"
                            )
                        }
                    >
                        <span aria-hidden="true">
                            {theme === "light"
                                ? "☾"
                                : "☀"}
                        </span>

                        {theme === "light"
                            ? "Dark"
                            : "Light"}
                    </button>

                </div>
            </nav>

            {module === "converter" && (
                <Decimal64Converter />
            )}

            {module === "rounding" && (
                <RoundingSimulator />
            )}

            {module === "subtraction" && (
                <SubtractionSimulator />
            )}
        </>
    );
}

export default App;