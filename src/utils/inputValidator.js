/**
 * Shared input validation utilities for the
 * Decimal 64-Bit Floating-Point Machine.
 */

/**
 * Checks whether an input contains a value.
 */
export function isRequired(input) {
    return (
        typeof input === "string" &&
        input.trim().length > 0
    );
}

/**
 * Checks whether a string is a valid
 * 16-digit Decimal64 hexadecimal value.
 */
export function isValidDecimal64Hex(input) {
    if (typeof input !== "string") {
        return false;
    }

    const value = input.trim();

    return /^[0-9A-Fa-f]{16}$/.test(value);
}

/**
 * Validates an operand according to its
 * selected input format.
 *
 * Supported formats:
 * - decimal
 * - hexadecimal
 */
export function validateOperand(input, format) {
    if (!isRequired(input)) {
        return {
            valid: false,
            message: "Input is required."
        };
    }

    if (format === "decimal") {
        const value = input.trim();

        const validDecimal =
            /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(
                value
            ) ||
            /^(?:[+-]?Infinity|NaN)$/i.test(value);

        return {
            valid: validDecimal,
            message: validDecimal
                ? ""
                : "Invalid decimal input."
        };
    }

    if (format === "hexadecimal") {
        const validHex =
            isValidDecimal64Hex(input);

        return {
            valid: validHex,
            message: validHex
                ? ""
                : "Hexadecimal input must contain exactly 16 hexadecimal digits."
        };
    }

    return {
        valid: false,
        message: "Unknown input format."
    };
}