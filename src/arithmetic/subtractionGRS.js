import { parseDecimal } from "../decimal64/decimalParser.js";
import { decodeDecimal64 } from "../decimal64/decimal64Decoder.js";
import { encodeDecimal64 } from "../decimal64/decimal64Encoder.js";

import { calculateGRS } from "./grsUtilities.js";

import {
    alignExponents,
    buildDecimalString,
    removeTrailingZeroes,
    roundCoefficient
} from "./decimalArithmetic.js";

import {
    checkSubtractionSpecialCases
} from "./arithmeticSpecialCases.js";

/**
 * Converts either a decimal input or hexadecimal input
 * into one shared operand format.
 */
function readOperand(input, format) {
    if (format === "decimal") {
        const parsed = parseDecimal(input);

        return {
            sourceFormat: "decimal",
            original: parsed.original,
            kind: parsed.kind,
            sign: parsed.sign,
            coefficientDigits:
                parsed.coefficientDigits ?? "0",
            exponent:
                parsed.exponent ?? 0
        };
    }

    if (format === "hexadecimal") {
        const decoded = decodeDecimal64(input);

        return {
            sourceFormat: "hexadecimal",
            original: String(input).trim(),
            kind: decoded.kind,
            sign: decoded.sign,
            coefficientDigits:
                decoded.coefficientDigits ?? "0",
            exponent:
                decoded.exponent ?? 0,
            decoded
        };
    }

    throw new Error(
        "Unknown operand format. Select decimal or hexadecimal."
    );
}

/**
 * Returns text used to display the operand classification.
 */
function formatClassification(kind) {
    if (kind === "finite") {
        return "Normal";
    }

    if (kind === "subnormal") {
        return "Subnormal";
    }

    if (kind === "zero") {
        return "Zero";
    }

    if (kind === "infinity") {
        return "Infinity";
    }

    if (kind === "nan") {
        return "NaN";
    }

    return kind;
}

/**
 * Main Decimal64 subtraction function.
 *
 * Operand A - Operand B
 */
export function subtractDecimal64({
    operandA,
    formatA,
    operandB,
    formatB,
    roundingMode = "nearest-even"
}) {
    const steps = [];

    try {
        //-----------------------------------------
        // Step 1: Read and decode both operands
        //-----------------------------------------

        const valueA =
            readOperand(operandA, formatA);

        const valueB =
            readOperand(operandB, formatB);

        steps.push(
            `Operand A was read as ${valueA.original}.`
        );

        steps.push(
            `Operand B was read as ${valueB.original}.`
        );

        steps.push(
            `Operand A classification: ${formatClassification(valueA.kind)}; sign: ${valueA.sign}; coefficient: ${valueA.coefficientDigits}; exponent: ${valueA.exponent}.`
        );

        steps.push(
            `Operand B classification: ${formatClassification(valueB.kind)}; sign: ${valueB.sign}; coefficient: ${valueB.coefficientDigits}; exponent: ${valueB.exponent}.`
        );

        //-----------------------------------------
        // Step 2: Check special cases
        //-----------------------------------------

        const specialCase =
            checkSubtractionSpecialCases(
                valueA,
                valueB
            );

        if (specialCase.handled) {
            const encoded =
                encodeDecimal64(specialCase.value);

            steps.push(specialCase.explanation);

            steps.push(
                "The special result was encoded using Member 1's Decimal64 encoder."
            );

            return {
                success: true,
                special: true,
                operandA: valueA,
                operandB: valueB,
                roundingMode,
                steps,
                result: {
                    kind: specialCase.kind,
                    decimal: specialCase.value,
                    formattedBinary:
                        encoded.formattedBinary,
                    rawBinary:
                        encoded.rawBinary,
                    hexadecimal:
                        encoded.hexadecimal
                }
            };
        }

        //-----------------------------------------
        // Step 3: Align exponents
        //-----------------------------------------

        const alignment =
            alignExponents(valueA, valueB);

        steps.push(
            `The common exponent is ${alignment.commonExponent}.`
        );

        if (alignment.shiftA > 0) {
            steps.push(
                `Operand A was aligned by appending ${alignment.shiftA} zero digit(s) to its coefficient.`
            );
        }

        if (alignment.shiftB > 0) {
            steps.push(
                `Operand B was aligned by appending ${alignment.shiftB} zero digit(s) to its coefficient.`
            );
        }

        if (
            alignment.shiftA === 0 &&
            alignment.shiftB === 0
        ) {
            steps.push(
                "Both operands already have the same exponent."
            );
        }

        steps.push(
            `Aligned coefficient A: ${alignment.alignedDigitsA}.`
        );

        steps.push(
            `Aligned coefficient B: ${alignment.alignedDigitsB}.`
        );

        //-----------------------------------------
        // Step 4: Perform signed subtraction
        //-----------------------------------------

        const signedCoefficientA =
            valueA.sign === 1
                ? -alignment.alignedCoefficientA
                : alignment.alignedCoefficientA;

        /*
         * A - B is performed by changing the sign
         * of Operand B and then adding.
         */
        const signedCoefficientB =
            valueB.sign === 1
                ? -alignment.alignedCoefficientB
                : alignment.alignedCoefficientB;

        const rawResult =
            signedCoefficientA -
            signedCoefficientB;

        const resultSign =
            rawResult < 0n ? 1 : 0;

        let absoluteResult =
            rawResult < 0n
                ? -rawResult
                : rawResult;

        steps.push(
            `Signed coefficient calculation: ${signedCoefficientA.toString()} - (${signedCoefficientB.toString()}) = ${rawResult.toString()}.`
        );

        steps.push(
            `The result sign is ${resultSign === 1 ? "negative" : "positive"}.`
        );

        //-----------------------------------------
        // Exact cancellation
        //-----------------------------------------

        if (absoluteResult === 0n) {
            const zeroResult =
                encodeDecimal64("0");

            steps.push(
                "The coefficients cancelled exactly, so the result is zero."
            );

            return {
                success: true,
                special: false,
                operandA: valueA,
                operandB: valueB,
                alignment,
                roundingMode,
                steps,
                grs: {
                    guard: "0",
                    round: "0",
                    sticky: "0"
                },
                result: {
                    kind: "zero",
                    sign: 0,
                    coefficientDigits: "0",
                    exponent: 0,
                    decimal: "0",
                    formattedBinary:
                        zeroResult.formattedBinary,
                    rawBinary:
                        zeroResult.rawBinary,
                    hexadecimal:
                        zeroResult.hexadecimal
                }
            };
        }

        //-----------------------------------------
        // Step 5: Normalize exact result
        //-----------------------------------------

        const normalized =
            removeTrailingZeroes(
                absoluteResult.toString(),
                alignment.commonExponent
            );

        steps.push(
            `After removing unnecessary trailing zeroes, the normalized coefficient is ${normalized.coefficientDigits} and the exponent is ${normalized.exponent}.`
        );

        //-----------------------------------------
        // Step 6: Generate GRS and round
        //-----------------------------------------

        const rounded =
            roundCoefficient(
                normalized.coefficientDigits,
                normalized.exponent,
                resultSign,
                roundingMode,
                calculateGRS
            );

        steps.push(
            `Retained coefficient: ${rounded.coefficientDigits}.`
        );

        steps.push(
            `Discarded digits: ${rounded.discarded || "none"}.`
        );

        steps.push(
            `Guard digit: ${rounded.guard}.`
        );

        steps.push(
            `Round digit: ${rounded.round}.`
        );

        steps.push(
            `Sticky digit: ${rounded.sticky}.`
        );

        steps.push(rounded.decision);

        //-----------------------------------------
        // Step 7: Build decimal result
        //-----------------------------------------

        const decimalResult =
            buildDecimalString(
                resultSign,
                rounded.coefficientDigits,
                rounded.exponent
            );

        steps.push(
            `Final decimal result: ${decimalResult}.`
        );

        //-----------------------------------------
        // Step 8: Encode final Decimal64 result
        //-----------------------------------------

        const encodedResult =
            encodeDecimal64(decimalResult);

        steps.push(
            "The final value was passed to Member 1's Decimal64 BID encoder."
        );

        steps.push(
            `Final hexadecimal result: ${encodedResult.hexadecimal}.`
        );

        return {
            success: true,
            special: false,

            operandA: {
                ...valueA,
                classification:
                    formatClassification(valueA.kind)
            },

            operandB: {
                ...valueB,
                classification:
                    formatClassification(valueB.kind)
            },

            alignment,

            subtraction: {
                signedCoefficientA:
                    signedCoefficientA.toString(),
                signedCoefficientB:
                    signedCoefficientB.toString(),
                rawResult:
                    rawResult.toString(),
                resultSign
            },

            normalization: {
                coefficientDigits:
                    normalized.coefficientDigits,
                exponent:
                    normalized.exponent
            },

            grs: {
                retained:
                    rounded.coefficientDigits,
                discarded:
                    rounded.discarded,
                guard:
                    rounded.guard,
                round:
                    rounded.round,
                sticky:
                    rounded.sticky,
                incremented:
                    rounded.incremented,
                decision:
                    rounded.decision
            },

            roundingMode,

            steps,

            result: {
                kind:
                    encodedResult.kind,
                sign:
                    resultSign,
                coefficientDigits:
                    encodedResult.coefficientDigits,
                exponent:
                    encodedResult.exponent,
                decimal:
                    decimalResult,
                formattedBinary:
                    encodedResult.formattedBinary,
                rawBinary:
                    encodedResult.rawBinary,
                hexadecimal:
                    encodedResult.hexadecimal
            }
        };
    }

    catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "An unknown subtraction error occurred.",
            steps
        };
    }
}