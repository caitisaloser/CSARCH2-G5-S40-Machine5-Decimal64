import { describe, expect, it } from "vitest";
import { encodeDecimal64 } from "../src/decimal64/decimal64Encoder";

describe("decimal64 BID encoder", () => {
  it("encodes a positive finite number", () => {
    const result = encodeDecimal64("123.45");
    expect(result.hexadecimal).toBe("3180000000003039");
    expect(result.coefficient).toBe(12345n);
    expect(result.exponent).toBe(-2);
  });

  it("encodes a negative finite number with the sign bit", () => {
    const positive = encodeDecimal64("98.765");
    const negative = encodeDecimal64("-98.765");
    expect(negative.bits ^ positive.bits).toBe(1n << 63n);
  });

  it("produces exactly 64 bits and 16 hexadecimal digits", () => {
    const result = encodeDecimal64("1.2345e10");
    expect(result.rawBinary).toMatch(/^[01]{64}$/);
    expect(result.hexadecimal).toMatch(/^[0-9A-F]{16}$/);
  });

  it("rounds excess precision using ties-to-even", () => {
    expect(encodeDecimal64("1.2345678901234565").coefficient).toBe(1234567890123456n);
    expect(encodeDecimal64("1.2345678901234575").coefficient).toBe(1234567890123458n);
  });

  it("encodes the minimum subnormal quantum", () => {
    const result = encodeDecimal64("1e-398");
    expect(result.kind).toBe("subnormal");
    expect(result.exponent).toBe(-398);
    expect(result.coefficient).toBe(1n);
  });

  it("overflows values beyond the finite range to infinity", () => {
    const result = encodeDecimal64("1e385");
    expect(result.kind).toBe("infinity");
    expect(result.overflow).toBe(true);
  });
});