//npx vitest tests/rounding.test.js

import { describe, it, expect } from "vitest";
import { performRounding } from "../src/rounding/roundingController";

function getMethod(result, methodName) {
    return result.results.find(
        (item) => item.method === methodName
    );
}

describe("Rounding Simulator", () => {

    it("should perform chopping for positive decimal", () => {

        const result = performRounding(
            "12.34567",
            "decimal",
            3
        );

        expect(result.success).toBe(true);

        expect(
            getMethod(result, "Chopping").result
        ).toBe("12.345");

    });

    it("should perform round-up for positive decimal", () => {

        const result = performRounding(
            "12.34567",
            "decimal",
            3
        );

        expect(
            getMethod(result, "Round-Up").result
        ).toBe("12.346");

    });

    it("should perform round-down for negative decimal", () => {

        const result = performRounding(
            "-12.34567",
            "decimal",
            3
        );

        expect(
            getMethod(result, "Round-Down").result
        ).toBe("-12.346");

    });

    it("should perform nearest-even", () => {

        const result = performRounding(
            "12.34567",
            "decimal",
            3
        );

        expect(
            getMethod(
                result,
                "Round-to-Nearest (Ties-to-Even)"
            ).result
        ).toBe("12.346");

    });

    it("should perform chopping for binary", () => {

        const result = performRounding(
            "101.1011",
            "binary",
            2
        );

        expect(
            getMethod(result, "Chopping").result
        ).toBe("101.10");

    });

    it("should perform nearest-even for binary", () => {

        const result = performRounding(
            "101.1011",
            "binary",
            2
        );

        expect(
            getMethod(
                result,
                "Round-to-Nearest (Ties-to-Even)"
            ).result
        ).toBe("101.11");

    });

    it("should correctly round tie-even", () => {

        const result = performRounding(
            "12.3450",
            "decimal",
            2
        );

        expect(
            getMethod(
                result,
                "Round-to-Nearest (Ties-to-Even)"
            ).result
        ).toBe("12.34");

    });

    it("should correctly round tie-odd", () => {

        const result = performRounding(
            "12.3550",
            "decimal",
            2
        );

        expect(
            getMethod(
                result,
                "Round-to-Nearest (Ties-to-Even)"
            ).result
        ).toBe("12.36");

    });

    it("should correctly handle carry", () => {

        const result = performRounding(
            "9.999",
            "decimal",
            2
        );

        expect(
            getMethod(result, "Round-Up").result
        ).toBe("10.00");

    });

    it("should correctly round zero", () => {

        const result = performRounding(
            "0",
            "decimal",
            3
        );

        expect(
            getMethod(result, "Chopping").result
        ).toBe("0");

    });

    it("should reject invalid decimal", () => {

        const result = performRounding(
            "12..34",
            "decimal",
            2
        );

        expect(result.success).toBe(false);

    });

    it("should reject invalid binary", () => {

        const result = performRounding(
            "101021",
            "binary",
            2
        );

        expect(result.success).toBe(false);

    });

    it("should reject invalid target digits", () => {

        const result = performRounding(
            "12.34",
            "decimal",
            0
        );

        expect(result.success).toBe(false);

    });

});