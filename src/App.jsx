import { useEffect, useState } from "react";
import Decimal64Converter from "./components/Decimal64Converter";
import RoundingSimulator from "./components/RoundingSimulator";
import SubtractionSimulator from "./components/SubtractionSimulator";
import DivisionSimulator from "./components/DivisionSimulator";
import "./styles/global.css";
import Navigation from "./components/Navigation";

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
            <Navigation
                activeModule={module}
                setActiveModule={setModule}
                theme={theme}
                setTheme={setTheme}
            />

            {module === "converter" && (
                <Decimal64Converter />
            )}

            {module === "rounding" && (
                <RoundingSimulator />
            )}

            {module === "subtraction" && (
                <SubtractionSimulator />
            )}

            {module === "division" && (
                <DivisionSimulator />
            )}
        </>
    );
}

export default App;