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

// Division special cases

export function checkDivisionSpecialCases(dividend, divisor) {
    const resultSign = (dividend.sign === divisor.sign) ? 0 : 1; 

    if (dividend.kind === 'nan' || divisor.kind === 'nan') {
        return { 
            isSpecial: true, 
            resultType: 'NaN', 
            sign: 0, 
            explanation: "Any operation involving NaN results in NaN." 
        };
    }

    if (dividend.kind === 'zero' && divisor.kind === 'zero') {
        return { 
            isSpecial: true, 
            resultType: 'NaN', 
            sign: 0, 
            explanation: "Zero divided by zero is undefined, resulting in NaN." 
        };
    }
    if ((dividend.kind === 'finite' || dividend.kind === 'subnormal') && divisor.kind === 'zero') {
        return { 
            isSpecial: true, 
            resultType: 'Infinity', 
            sign: resultSign, 
            explanation: "A finite nonzero value divided by zero results in Infinity." 
        };
    }
    if (dividend.kind === 'zero' && (divisor.kind === 'finite' || divisor.kind === 'subnormal')) {
        return { 
            isSpecial: true, 
            resultType: 'Zero', 
            sign: resultSign, 
            explanation: "Zero divided by a finite nonzero value results in zero." 
        };
    }
    if (dividend.kind === 'infinity' && divisor.kind === 'infinity') {
        return { 
            isSpecial: true, 
            resultType: 'NaN', 
            sign: 0, 
            explanation: "Infinity divided by Infinity is undefined, resulting in NaN." 
        };
    }
    if (dividend.kind === 'infinity' && (divisor.kind === 'finite' || divisor.kind === 'subnormal' || divisor.kind === 'zero')) {
        return { 
            isSpecial: true, 
            resultType: 'Infinity', 
            sign: resultSign, 
            explanation: "Infinity divided by a finite value results in Infinity." 
        };
    }
    if ((dividend.kind === 'finite' || dividend.kind === 'subnormal' || dividend.kind === 'zero') && divisor.kind === 'infinity') {
        return { 
            isSpecial: true, 
            resultType: 'Zero', 
            sign: resultSign, 
            explanation: "A finite value divided by Infinity results in zero." 
        };
    }

    return { isSpecial: false };
}