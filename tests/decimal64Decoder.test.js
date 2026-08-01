import { describe, expect, it } from "vitest";
import { decodeDecimal64 } from "../src/decimal64/decimal64Decoder";
import { encodeDecimal64 } from "../src/decimal64/decimal64Encoder";

describe("decimal64 BID decoder", () => {
  it.each(["123.45", "-98.765", "1.2345e10", "9.999e-20", "1e-398"])("round-trips %s", (input) => {
    const encoded = encodeDecimal64(input);
    const decoded = decodeDecimal64(encoded.bits);
    expect(decoded.sign).toBe(encoded.sign);
    expect(decoded.coefficient).toBe(encoded.coefficient);
    expect(decoded.exponent).toBe(encoded.exponent);
  });

  it("accepts formatted binary input", () => {
    const encoded = encodeDecimal64("123.45");
    expect(decodeDecimal64(encoded.formattedBinary).hexadecimal).toBe(encoded.hexadecimal);
  });

  it("rejects malformed representations", () => {
    expect(() => decodeDecimal64("1010")).toThrow(/64 binary bits/);
  });
});