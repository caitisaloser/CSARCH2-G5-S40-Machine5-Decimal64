/**
 * Removes unnecessary zeroes from the beginning of a coefficient.
 * Example:
 * "000123" becomes "123"
 */
export function removeLeadingZeroes(digits) {
    const cleaned = String(digits).replace(/^0+/, "");

    return cleaned || "0";
}

/**
 * Removes zeroes from the end of a coefficient while adjusting
 * the exponent so the represented value stays the same.

 * Example:
 * 12300 × 10^-2
 *
 * becomes:
 * 123 × 10^0
 */
export function removeTrailingZeroes(coefficientDigits, exponent) {
    let digits = removeLeadingZeroes(coefficientDigits);
    let newExponent = exponent;

    if (digits === "0") {
        return {
            coefficientDigits: "0",
            exponent: 0
        };
    }

    while (digits.endsWith("0")) {
        digits = digits.slice(0, -1);
        newExponent++;
    }

    return {
        coefficientDigits: digits,
        exponent: newExponent
    };
}

/**
 * Compares the magnitudes of two decimal floating-point values.
 *
 * Each value must contain:
 *
 * {
 *     coefficientDigits: "12345",
 *     exponent: -2
 * }
 *
 * Returns:
 *  1 when A is greater
 * -1 when B is greater
 *  0 when they are equal
 */
export function compareMagnitude(operandA, operandB) {
    const normalizedA = removeTrailingZeroes(
        operandA.coefficientDigits,
        operandA.exponent
    );

    const normalizedB = removeTrailingZeroes(
        operandB.coefficientDigits,
        operandB.exponent
    );

    const adjustedExponentA =
        normalizedA.exponent +
        normalizedA.coefficientDigits.length -
        1;

    const adjustedExponentB =
        normalizedB.exponent +
        normalizedB.coefficientDigits.length -
        1;

    if (adjustedExponentA > adjustedExponentB) {
        return 1;
    }

    if (adjustedExponentA < adjustedExponentB) {
        return -1;
    }

    const maximumLength = Math.max(
        normalizedA.coefficientDigits.length,
        normalizedB.coefficientDigits.length
    );

    const digitsA =
        normalizedA.coefficientDigits.padEnd(maximumLength, "0");

    const digitsB =
        normalizedB.coefficientDigits.padEnd(maximumLength, "0");

    const valueA = BigInt(digitsA);
    const valueB = BigInt(digitsB);

    if (valueA > valueB) {
        return 1;
    }

    if (valueA < valueB) {
        return -1;
    }

    return 0;
}

/**
 * Aligns two operands to one common exponent.
 *
 * BigInt is used so decimal digits are not lost through
 * JavaScript floating-point calculations.
 */
export function alignExponents(operandA, operandB) {
    const commonExponent = Math.min(
        operandA.exponent,
        operandB.exponent
    );

    const shiftA = operandA.exponent - commonExponent;
    const shiftB = operandB.exponent - commonExponent;

    const alignedDigitsA =
        operandA.coefficientDigits + "0".repeat(shiftA);

    const alignedDigitsB =
        operandB.coefficientDigits + "0".repeat(shiftB);

    return {
        commonExponent,
        shiftA,
        shiftB,
        alignedDigitsA,
        alignedDigitsB,
        alignedCoefficientA: BigInt(alignedDigitsA),
        alignedCoefficientB: BigInt(alignedDigitsB)
    };
}

/**
 * Converts a coefficient and exponent into a normal decimal string.
 *
 * Examples:
 *
 * 12345 × 10^-2 = "123.45"
 * 12345 × 10^2  = "1234500"
 */
export function buildDecimalString(
    sign,
    coefficientDigits,
    exponent
) {
    let digits = removeLeadingZeroes(coefficientDigits);

    if (digits === "0") {
        return sign === 1 ? "-0" : "0";
    }

    let result;

    if (exponent >= 0) {
        result = digits + "0".repeat(exponent);
    } else {
        const decimalPosition = digits.length + exponent;

        if (decimalPosition > 0) {
            result =
                digits.slice(0, decimalPosition) +
                "." +
                digits.slice(decimalPosition);
        } else {
            result =
                "0." +
                "0".repeat(Math.abs(decimalPosition)) +
                digits;
        }
    }

    if (sign === 1) {
        result = "-" + result;
    }

    return result;
}

/**
 * Increments a positive coefficient represented as a string.
 */
export function incrementCoefficient(coefficientDigits) {
    return (BigInt(coefficientDigits) + 1n).toString();
}

/**
 * Rounds a coefficient to the Decimal64 precision of 16 digits.
 *
 * Supported modes:
 * - chopping
 * - round-up
 * - round-down
 * - nearest-even
 */
export function roundCoefficient(
    coefficientDigits,
    exponent,
    sign,
    roundingMode,
    calculateGRS
) {
    const maximumDigits = 16;

    if (coefficientDigits.length <= maximumDigits) {
        return {
            coefficientDigits,
            exponent,
            discarded: "",
            guard: "0",
            round: "0",
            sticky: "0",
            incremented: false,
            decision:
                "The coefficient has 16 or fewer significant digits. No rounding is required."
        };
    }

    const retained =
        coefficientDigits.slice(0, maximumDigits);

    const discarded =
        coefficientDigits.slice(maximumDigits);

    const grs = calculateGRS(discarded);

    const hasDiscardedNonZero =
        /[1-9]/.test(discarded);

    let shouldIncrement = false;
    let decision = "";

    if (roundingMode === "chopping") {
        decision =
            "Chopping selected. All discarded digits were removed.";
    }

    else if (roundingMode === "round-up") {
        shouldIncrement =
            sign === 0 && hasDiscardedNonZero;

        decision = shouldIncrement
            ? "The result is positive and discarded digits are nonzero, so it was rounded toward positive infinity."
            : "No increment was needed for round-up.";
    }

    else if (roundingMode === "round-down") {
        shouldIncrement =
            sign === 1 && hasDiscardedNonZero;

        decision = shouldIncrement
            ? "The result is negative and discarded digits are nonzero, so its magnitude was increased toward negative infinity."
            : "No increment was needed for round-down.";
    }

    else {
        const guard = Number(grs.guard);
        const round = Number(grs.round);
        const sticky = Number(grs.sticky);
        const lastRetainedDigit =
            Number(retained.at(-1));

        if (guard > 5) {
            shouldIncrement = true;

            decision =
                "The guard digit is greater than 5, so the retained coefficient was incremented.";
        }

        else if (guard < 5) {
            decision =
                "The guard digit is less than 5, so the retained coefficient was kept.";
        }

        else if (
            round !== 0 ||
            sticky !== 0
        ) {
            shouldIncrement = true;

            decision =
                "The guard digit is 5 and later discarded digits are nonzero, so the value is greater than halfway.";
        }

        else if (lastRetainedDigit % 2 !== 0) {
            shouldIncrement = true;

            decision =
                "The discarded value is exactly halfway and the last retained digit is odd, so it was incremented to become even.";
        }

        else {
            decision =
                "The discarded value is exactly halfway and the last retained digit is already even.";
        }
    }

    let roundedDigits = retained;
    let roundedExponent =
        exponent + discarded.length;

    if (shouldIncrement) {
        roundedDigits =
            incrementCoefficient(roundedDigits);
    }

    /*
     * Example:
     * 9999999999999999 rounds to
     * 10000000000000000.
     *
     * Decimal64 only keeps 16 digits, so it must
     * be normalized again.
     */
    if (roundedDigits.length > maximumDigits) {
        roundedDigits =
            roundedDigits.slice(0, maximumDigits);

        roundedExponent++;

        decision +=
            " Rounding created an extra digit, so the coefficient was normalized again.";
    }

    return {
        coefficientDigits: roundedDigits,
        exponent: roundedExponent,
        discarded,
        guard: grs.guard,
        round: grs.round,
        sticky: grs.sticky,
        incremented: shouldIncrement,
        decision
    };
}