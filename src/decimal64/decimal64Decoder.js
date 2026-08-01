import { classifySpecialBits } from "./specialCases.js";
import { bitsToHex } from "./hexadecimalFormatter.js";
import { formatDecimal64Binary, splitDecimal64Fields, toRawBinary } from "./binaryFormatter.js";
import { DECIMAL64_BIAS } from "./decimal64Encoder.js";

function coerceBits(value) {
  if (typeof value === "bigint") return value;
  const text = String(value).trim().replace(/\s/g, "");
  if (/^[01]{64}$/.test(text)) return BigInt(`0b${text}`);
  if (/^(?:0x)?[0-9a-f]{16}$/i.test(text)) return BigInt(`0x${text.replace(/^0x/i, "")}`);
  throw new Error("Provide exactly 64 binary bits or 16 hexadecimal digits.");
}

export function decodeDecimal64(value) {
  const bits = coerceBits(value);
  const sign = Number(bits >> 63n);
  const special = classifySpecialBits(bits);
  const common = {
    bits,
    sign,
    rawBinary: toRawBinary(bits),
    formattedBinary: formatDecimal64Binary(bits),
    hexadecimal: bitsToHex(bits),
    fields: splitDecimal64Fields(bits),
  };

  if (special) return { ...common, kind: special, value: special === "nan" ? "NaN" : sign ? "-Infinity" : "Infinity" };

  const steering = ((bits >> 61n) & 0x3n) === 0x3n;
  const biasedExponent = Number(steering ? (bits >> 51n) & 0x3ffn : (bits >> 53n) & 0x3ffn);
  const coefficient = steering
    ? (bits & 0x0007ffffffffffffn) | (1n << 53n)
    : bits & 0x001fffffffffffffn;
  const exponent = biasedExponent - DECIMAL64_BIAS;
  const coefficientDigits = coefficient.toString();
  const adjustedExponent = coefficient === 0n ? null : exponent + coefficientDigits.length - 1;
  const kind = coefficient === 0n ? "zero" : adjustedExponent < -383 ? "subnormal" : "finite";

  return {
    ...common,
    kind,
    coefficient,
    coefficientDigits,
    exponent,
    biasedExponent,
    adjustedExponent,
    value: `${sign ? "-" : ""}${coefficientDigits} × 10^${exponent}`,
  };
}

export { coerceBits };