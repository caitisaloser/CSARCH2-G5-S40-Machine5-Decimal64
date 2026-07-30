/**
 * Increment a number represented as:
 * integerPart.retained
 *
 * Supports:
 *  - decimal (base 10)
 *  - binary (base 2)
 *
 * Returns the updated integer and retained parts.
 *
 * Example (decimal):
 * integerPart = "12"
 * retained = "999"
 *
 * =>
 * {
 *   integerPart: "13",
 *   retained: "000"
 * }
 *
 * Example (binary):
 * integerPart = "111"
 * retained = "111"
 *
 * =>
 * {
 *   integerPart: "1000",
 *   retained: "000"
 * }
 */

export function increment(integerPart, retained, format) {

    const base = format === "binary" ? 2 : 10;

    let fraction = retained.split("");

    let carry = 1;

    // Increment retained digits/bits
    for (let i = fraction.length - 1; i >= 0 && carry; i--) {

        let value = Number(fraction[i]) + carry;

        if (value >= base) {
            fraction[i] = "0";
            carry = 1;
        } else {
            fraction[i] = value.toString();
            carry = 0;
        }
    }

    // Carry into integer part if needed
    let integer = integerPart.split("");

    for (let i = integer.length - 1; i >= 0 && carry; i--) {

        let value = Number(integer[i]) + carry;

        if (value >= base) {
            integer[i] = "0";
            carry = 1;
        } else {
            integer[i] = value.toString();
            carry = 0;
        }
    }

    if (carry) {
        integer.unshift("1");
    }

    return {
        integerPart: integer.join(""),
        retained: fraction.join("")
    };
}

/**
 * Builds the final rounded number.
 */

export function rebuildNumber(sign, integerPart, retained) {

    let result = integerPart;

    if (retained.length > 0) {
        result += "." + retained;
    }

    if (sign === "-") {
        result = "-" + result;
    }

    return result;
}