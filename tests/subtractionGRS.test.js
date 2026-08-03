import { describe, expect, test } from "vitest";

import {
    subtractDecimal64
} from "../src/arithmetic/subtractionGRS.js";

import {
    encodeDecimal64
} from "../src/decimal64/decimal64Encoder.js";


describe("Decimal64 subtraction using GRS", () => {

    //-----------------------------------------
    // Positive and negative number tests
    //-----------------------------------------

    test("positive minus positive", () => {
        const output = subtractDecimal64({
            operandA: "12.5",
            formatA: "decimal",
            operandB: "3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.decimal).toBe("9.3");
        expect(output.result.hexadecimal)
            .toBe("31A000000000005D");
    });


    test("positive minus negative", () => {
        const output = subtractDecimal64({
            operandA: "12.5",
            formatA: "decimal",
            operandB: "-3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.decimal).toBe("15.7");
        expect(output.result.sign).toBe(0);
    });


    test("negative minus positive", () => {
        const output = subtractDecimal64({
            operandA: "-12.5",
            formatA: "decimal",
            operandB: "3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.decimal).toBe("-15.7");
        expect(output.result.sign).toBe(1);
    });


    test("negative minus negative", () => {
        const output = subtractDecimal64({
            operandA: "-12.5",
            formatA: "decimal",
            operandB: "-3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.decimal).toBe("-9.3");
        expect(output.result.sign).toBe(1);
    });


    //-----------------------------------------
    // Zero and cancellation tests
    //-----------------------------------------

    test("equal operands produce zero", () => {
        const output = subtractDecimal64({
            operandA: "5.5",
            formatA: "decimal",
            operandB: "5.5",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.kind).toBe("zero");
        expect(output.result.decimal).toBe("0");
        expect(output.grs.guard).toBe("0");
        expect(output.grs.round).toBe("0");
        expect(output.grs.sticky).toBe("0");
    });


    test("positive zero minus negative zero produces zero", () => {
        const output = subtractDecimal64({
            operandA: "0",
            formatA: "decimal",
            operandB: "-0",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.kind).toBe("zero");
        expect(output.result.decimal).toBe("0");
    });


    test("subtraction requiring cancellation normalization", () => {
        const output = subtractDecimal64({
            operandA: "1.0001",
            formatA: "decimal",
            operandB: "1.0000",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.decimal).toBe("0.0001");
    });


    //-----------------------------------------
    // Exponent alignment tests
    //-----------------------------------------

    test("operands with equal exponents need no shift", () => {
        const output = subtractDecimal64({
            operandA: "12.5",
            formatA: "decimal",
            operandB: "3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);

        expect(output.alignment.commonExponent)
            .toBe(-1);

        expect(output.alignment.shiftA)
            .toBe(0);

        expect(output.alignment.shiftB)
            .toBe(0);

        expect(output.alignment.alignedDigitsA)
            .toBe("125");

        expect(output.alignment.alignedDigitsB)
            .toBe("32");
    });


    test("operands with different exponents are aligned", () => {
        const output = subtractDecimal64({
            operandA: "1000",
            formatA: "decimal",
            operandB: "0.001",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.decimal).toBe("999.999");

        expect(output.alignment.commonExponent)
            .toBe(-3);

        expect(output.alignment.shiftA)
            .toBe(3);

        expect(output.alignment.shiftB)
            .toBe(0);

        expect(output.alignment.alignedDigitsA)
            .toBe("1000000");

        expect(output.alignment.alignedDigitsB)
            .toBe("1");
    });


    //-----------------------------------------
    // GRS rounding tests
    //-----------------------------------------

    test("generates nonzero Guard, Round and Sticky digits", () => {
        const output = subtractDecimal64({
            operandA: "1234567890123456",
            formatA: "decimal",
            operandB: "0.0000000000000001",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);

        expect(output.grs.guard).toBe("9");
        expect(output.grs.round).toBe("9");
        expect(output.grs.sticky).toBe("1");

        expect(output.grs.incremented).toBe(true);

        expect(output.result.decimal)
            .toBe("1234567890123456");

        expect(output.result.hexadecimal)
            .toBe("31C462D53C8ABAC0");
    });


    test("chopping does not increment the retained coefficient", () => {
        const output = subtractDecimal64({
            operandA: "1234567890123456",
            formatA: "decimal",
            operandB: "0.0000000000000001",
            formatB: "decimal",
            roundingMode: "chopping"
        });

        expect(output.success).toBe(true);

        expect(output.grs.guard).toBe("9");
        expect(output.grs.round).toBe("9");
        expect(output.grs.sticky).toBe("1");

        expect(output.grs.incremented).toBe(false);

        expect(output.result.decimal)
            .toBe("1234567890123455");
    });


    test("round-up increments a positive inexact result", () => {
        const output = subtractDecimal64({
            operandA: "1234567890123456",
            formatA: "decimal",
            operandB: "0.0000000000000001",
            formatB: "decimal",
            roundingMode: "round-up"
        });

        expect(output.success).toBe(true);
        expect(output.grs.incremented).toBe(true);

        expect(output.result.decimal)
            .toBe("1234567890123456");
    });


    test("round-down does not increment a positive result", () => {
        const output = subtractDecimal64({
            operandA: "1234567890123456",
            formatA: "decimal",
            operandB: "0.0000000000000001",
            formatB: "decimal",
            roundingMode: "round-down"
        });

        expect(output.success).toBe(true);
        expect(output.grs.incremented).toBe(false);

        expect(output.result.decimal)
            .toBe("1234567890123455");
    });


    //-----------------------------------------
    // Mixed input format tests
    //-----------------------------------------

    test("decimal minus hexadecimal", () => {
        const hexadecimalB =
            encodeDecimal64("3.2").hexadecimal;

        const output = subtractDecimal64({
            operandA: "12.5",
            formatA: "decimal",
            operandB: hexadecimalB,
            formatB: "hexadecimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.operandB.sourceFormat)
            .toBe("hexadecimal");

        expect(output.result.decimal)
            .toBe("9.3");
    });


    test("hexadecimal minus decimal", () => {
        const hexadecimalA =
            encodeDecimal64("12.5").hexadecimal;

        const output = subtractDecimal64({
            operandA: hexadecimalA,
            formatA: "hexadecimal",
            operandB: "3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.operandA.sourceFormat)
            .toBe("hexadecimal");

        expect(output.result.decimal)
            .toBe("9.3");
    });


    test("hexadecimal minus hexadecimal", () => {
        const hexadecimalA =
            encodeDecimal64("12.5").hexadecimal;

        const hexadecimalB =
            encodeDecimal64("3.2").hexadecimal;

        const output = subtractDecimal64({
            operandA: hexadecimalA,
            formatA: "hexadecimal",
            operandB: hexadecimalB,
            formatB: "hexadecimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);

        expect(output.operandA.sourceFormat)
            .toBe("hexadecimal");

        expect(output.operandB.sourceFormat)
            .toBe("hexadecimal");

        expect(output.result.decimal)
            .toBe("9.3");
    });


    //-----------------------------------------
    // Special value tests
    //-----------------------------------------

    test("NaN minus a finite number produces NaN", () => {
        const output = subtractDecimal64({
            operandA: "NaN",
            formatA: "decimal",
            operandB: "5",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.special).toBe(true);
        expect(output.result.kind).toBe("nan");
        expect(output.result.decimal).toBe("NaN");
    });


    test("finite number minus NaN produces NaN", () => {
        const output = subtractDecimal64({
            operandA: "5",
            formatA: "decimal",
            operandB: "NaN",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.kind).toBe("nan");
        expect(output.result.decimal).toBe("NaN");
    });


    test("Infinity minus Infinity produces NaN", () => {
        const output = subtractDecimal64({
            operandA: "Infinity",
            formatA: "decimal",
            operandB: "Infinity",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.special).toBe(true);
        expect(output.result.kind).toBe("nan");
        expect(output.result.decimal).toBe("NaN");
    });


    test("Infinity minus negative Infinity produces Infinity", () => {
        const output = subtractDecimal64({
            operandA: "Infinity",
            formatA: "decimal",
            operandB: "-Infinity",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.kind).toBe("infinity");
        expect(output.result.decimal).toBe("Infinity");
    });


    test("finite number minus Infinity produces negative Infinity", () => {
        const output = subtractDecimal64({
            operandA: "5",
            formatA: "decimal",
            operandB: "Infinity",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.kind).toBe("infinity");
        expect(output.result.decimal).toBe("-Infinity");
    });


    test("finite number minus negative Infinity produces Infinity", () => {
        const output = subtractDecimal64({
            operandA: "5",
            formatA: "decimal",
            operandB: "-Infinity",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(true);
        expect(output.result.kind).toBe("infinity");
        expect(output.result.decimal).toBe("Infinity");
    });


    //-----------------------------------------
    // Invalid input tests
    //-----------------------------------------

    test("invalid decimal input returns an error", () => {
        const output = subtractDecimal64({
            operandA: "12.3.4",
            formatA: "decimal",
            operandB: "5",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(false);
        expect(output.error)
            .toContain("Invalid decimal input");
    });


    test("invalid hexadecimal input returns an error", () => {
        const output = subtractDecimal64({
            operandA: "123ABC",
            formatA: "hexadecimal",
            operandB: "5",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(false);

        expect(output.error)
            .toContain(
                "16 hexadecimal digits"
            );
    });


    test("unknown operand format returns an error", () => {
        const output = subtractDecimal64({
            operandA: "12.5",
            formatA: "binary",
            operandB: "3.2",
            formatB: "decimal",
            roundingMode: "nearest-even"
        });

        expect(output.success).toBe(false);

        expect(output.error)
            .toContain("Unknown operand format");
    });

});