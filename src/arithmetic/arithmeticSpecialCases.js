/**
 * Handles special cases before normal subtraction begins.
 *
 * Operation:
 *
 * Operand A - Operand B
 */
export function checkSubtractionSpecialCases(
    operandA,
    operandB
) {
    //-----------------------------------------
    // NaN cases
    //-----------------------------------------

    if (
        operandA.kind === "nan" ||
        operandB.kind === "nan"
    ) {
        return {
            handled: true,
            kind: "nan",
            value: "NaN",
            explanation:
                "A subtraction involving NaN always produces NaN."
        };
    }

    //-----------------------------------------
    // Infinity minus Infinity
    //-----------------------------------------

    if (
        operandA.kind === "infinity" &&
        operandB.kind === "infinity"
    ) {
        if (operandA.sign === operandB.sign) {
            return {
                handled: true,
                kind: "nan",
                value: "NaN",
                explanation:
                    "Infinity minus Infinity with the same sign is undefined, so the result is NaN."
            };
        }

        return {
            handled: true,
            kind: "infinity",
            sign: operandA.sign,
            value:
                operandA.sign === 1
                    ? "-Infinity"
                    : "Infinity",
            explanation:
                "Subtracting infinities with different signs keeps the sign of Operand A."
        };
    }

    //-----------------------------------------
    // Infinity minus finite value
    //-----------------------------------------

    if (operandA.kind === "infinity") {
        return {
            handled: true,
            kind: "infinity",
            sign: operandA.sign,
            value:
                operandA.sign === 1
                    ? "-Infinity"
                    : "Infinity",
            explanation:
                "Subtracting a finite value from infinity does not change the infinity result."
        };
    }

    //-----------------------------------------
    // Finite value minus Infinity
    //-----------------------------------------

    if (operandB.kind === "infinity") {
        const resultSign =
            operandB.sign === 1 ? 0 : 1;

        return {
            handled: true,
            kind: "infinity",
            sign: resultSign,
            value:
                resultSign === 1
                    ? "-Infinity"
                    : "Infinity",
            explanation:
                "Subtracting infinity from a finite value produces infinity with the opposite sign of Operand B."
        };
    }

    return {
        handled: false
    };
}