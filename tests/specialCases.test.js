import { describe, expect, it } from "vitest";
import { encodeDecimal64 } from "../src/decimal64/decimal64Encoder";
import { decodeDecimal64 } from "../src/decimal64/decimal64Decoder";

describe("decimal64 special cases and validation", () => {
  it("preserves positive and negative zero", () => {
    const positive = encodeDecimal64("0");
    const negative = encodeDecimal64("-0");
    expect(positive.kind).toBe("zero");
    expect(negative.kind).toBe("zero");
    expect(positive.sign).toBe(0);
    expect(negative.sign).toBe(1);
    expect(negative.bits ^ positive.bits).toBe(1n << 63n);
  });

  it.each([
    ["Infinity", "7800000000000000", "Infinity"],
    ["-Infinity", "F800000000000000", "-Infinity"],
    ["NaN", "7C00000000000000", "NaN"],
  ])("encodes %s", (input, hex, decodedValue) => {
    const encoded = encodeDecimal64(input);
    expect(encoded.hexadecimal).toBe(hex);
    expect(decodeDecimal64(encoded.bits).value).toBe(decodedValue);
  });

  it.each(["abc", "12.3.4", "--45", "1e", "0xABC", ""])("rejects invalid input %j", (input) => {
    expect(() => encodeDecimal64(input)).toThrow();
  });

  it("underflows a value below half the smallest quantum to zero", () => {
    const result = encodeDecimal64("1e-500");
    expect(result.kind).toBe("zero");
    expect(result.coefficient).toBe(0n);
  });
});