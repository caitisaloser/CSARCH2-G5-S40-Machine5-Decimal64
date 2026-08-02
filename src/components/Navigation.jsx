function Navigation({
    activeModule,
    setActiveModule,
    theme,
    setTheme
}) {
    return (
        <nav
            className="module-nav"
            aria-label="Machine modules"
        >
            <strong>Decimal64 Machine</strong>

            <div className="nav-actions">

                <button
                    className={
                        activeModule === "converter"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveModule("converter")
                    }
                >
                    Converter
                </button>

                <button
                    className={
                        activeModule === "rounding"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveModule("rounding")
                    }
                >
                    Rounding
                </button>

                <button
                    className={
                        activeModule === "subtraction"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveModule("subtraction")
                    }
                >
                    Subtraction
                </button>

                <button
                    className={
                        activeModule === "division"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveModule("division")
                    }
                >
                    Division
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
    );
}

export default Navigation;