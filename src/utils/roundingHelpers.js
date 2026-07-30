/**
 * Extracts the important parts of a decimal or binary number
 * needed by the rounding algorithms.
 *
 * Example:
 * Input:
 *   number = "12.34567"
 *   targetDigits = 3
 *   format = "decimal"
 *
 * Output:
 * {
 *   format: "decimal",
 *   original: "12.34567",
 *   sign: "+",
 *   integerPart: "12",
 *   fractionalPart: "34567",
 *   retained: "345",
 *   discarded: "67"
 * }
 */

export function extractRoundingParts(number, targetDigits, format) {
    const original = number.trim();

    // Determine sign
    const sign = original.startsWith("-") ? "-" : "+";

    // Remove sign for easier processing
    const absolute = sign === "-" ? original.slice(1) : original;

    // Split into integer and fractional parts
    const [integerPart, fractionalPart = ""] = absolute.split(".");

    // Digits/bits to keep
    const retained = fractionalPart.slice(0, targetDigits);

    // Digits/bits removed
    const discarded = fractionalPart.slice(targetDigits);

    return {
        format,
        original,
        sign,
        integerPart,
        fractionalPart,
        retained,
        discarded
    };
}

/**
 * Rebuilds the number after rounding.
 *
 * Example:
 * sign = "-"
 * integerPart = "12"
 * retained = "346"
 *
 * Returns:
 * "-12.346"
 */
export function rebuildNumber(sign, integerPart, retained) {
    const hasFraction = retained.length > 0;

    let result = integerPart;

    if (hasFraction) {
        result += "." + retained;
    }

    if (sign === "-") {
        result = "-" + result;
    }

    return result;
}