/**
 * Checks whether a string is a valid decimal number.
 *
 * Valid:
 *  12
 *  -12
 *  12.345
 *  -0.125
 *
 * Invalid:
 *  abc
 *  12..3
 *  --12
 *  12a
 */
export function isValidDecimal(input) {
    if (typeof input !== "string") return false;

    const value = input.trim();

    const decimalRegex = /^-?\d+(\.\d+)?$/;

    return decimalRegex.test(value);
}

/**
 * Checks whether a string is a valid binary number.
 *
 * Valid:
 *  101
 *  -101
 *  101.101
 *  -0.001
 *
 * Invalid:
 *  102
 *  10A1
 *  10..1
 */
export function isValidBinary(input) {
    if (typeof input !== "string") return false;

    const value = input.trim();

    const binaryRegex = /^-?[01]+(\.[01]+)?$/;

    return binaryRegex.test(value);
}

/**
 * Validates the target number of digits/bits.
 *
 * Rules:
 * - Must be an integer
 * - Must be greater than 0
 * - Maximum of 64 (can be changed later)
 */
export function validateTargetDigits(target) {
    const digits = Number(target);

    if (!Number.isInteger(digits)) {
        return {
            valid: false,
            message: "Target digits must be an integer."
        };
    }

    if (digits <= 0) {
        return {
            valid: false,
            message: "Target digits must be greater than zero."
        };
    }

    if (digits > 64) {
        return {
            valid: false,
            message: "Target digits cannot exceed 64."
        };
    }

    return {
        valid: true,
        message: ""
    };
}

/**
 * Validates the number based on the selected format.
 *
 * format:
 *  "decimal"
 *  "binary"
 */
export function validateNumber(input, format) {
    if (format === "decimal") {
        return {
            valid: isValidDecimal(input),
            message: isValidDecimal(input)
                ? ""
                : "Invalid decimal number."
        };
    }

    if (format === "binary") {
        return {
            valid: isValidBinary(input),
            message: isValidBinary(input)
                ? ""
                : "Invalid binary number."
        };
    }

    return {
        valid: false,
        message: "Unknown input format."
    };
}