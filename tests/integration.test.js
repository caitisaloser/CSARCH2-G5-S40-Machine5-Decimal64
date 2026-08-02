import { describe, it, expect } from "vitest";
import { encodeDecimal64 } from "../src/decimal64/decimal64Encoder.js";
import { decodeDecimal64 } from "../src/decimal64/decimal64Decoder.js";
import { performRounding } from "../src/rounding/roundingController.js";
import { subtractDecimal64 } from "../src/arithmetic/subtractionGRS.js";
import { simulateDivision } from "../src/arithmetic/divisionGRS.js";

describe("Application Integration", () => {

    describe("Decimal64 Encoder and Decoder", () => {

        it("encodes and decodes a decimal value consistently", () => {
            const encoded = encodeDecimal64("123.45");

            const decoded = decodeDecimal64(
                encoded.hexadecimal
            );

            expect(decoded.sign).toBe(encoded.sign);
            expect(decoded.coefficient).toBe(
                encoded.coefficient
            );
            expect(decoded.exponent).toBe(
                encoded.exponent
            );
            expect(decoded.hexadecimal).toBe(
                encoded.hexadecimal
            );
        });

    });

});

describe("Rounding and Decimal64 Encoding", () => {

    it("rounds a decimal value and encodes the rounded result", () => {
        const roundingResult = performRounding(
            "12.34567",
            "decimal",
            4
        );

        expect(roundingResult.success).toBe(true);

        const roundedValue =
            roundingResult.results[3].result;

        const encoded = encodeDecimal64(roundedValue);

        expect(encoded.rawBinary).toMatch(/^[01]{64}$/);
        expect(encoded.hexadecimal).toMatch(
            /^[0-9A-F]{16}$/
        );
    });

});

describe("Subtraction and Decimal64 Encoding", () => {

    it("subtracts two decimal values and produces a valid Decimal64 result", () => {
        const subtractionResult = subtractDecimal64({
            operandA: "12.5",
            formatA: "decimal",
            operandB: "3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(subtractionResult.success).toBe(true);

        const encodedResult = subtractionResult.result;

        expect(encodedResult.hexadecimal).toMatch(
            /^[0-9A-F]{16}$/
        );

        expect(encodedResult.rawBinary).toMatch(
            /^[01]{64}$/
        );

        const decoded = decodeDecimal64(
            encodedResult.hexadecimal
        );

        expect(decoded.hexadecimal).toBe(
            encodedResult.hexadecimal
        );
    });

});

describe("Division and Decimal64 Encoding", () => {

    it("divides two decimal values and produces a valid Decimal64 result", () => {
        const divisionResult = simulateDivision(
            "10",
            "decimal",
            "4",
            "decimal",
            "nearest-even"
        );

        expect(divisionResult.success).toBe(true);

        expect(divisionResult.finalHex).toMatch(
            /^[0-9A-F]{16}$/
        );

        expect(divisionResult.finalBinary).toBeDefined();

        const decoded = decodeDecimal64(
            divisionResult.finalHex
        );

        expect(decoded.hexadecimal).toBe(
            divisionResult.finalHex
        );
    });

});

describe("Integrated Error Handling", () => {

    it("handles invalid subtraction input without crashing", () => {
        const result = subtractDecimal64({
            operandA: "abc",
            formatA: "decimal",
            operandB: "3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
        expect(typeof result.error).toBe("string");
    });

});