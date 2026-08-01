import { parseDecimal } from "./decimalParser.js";
import { encodeSpecial } from "./specialCases.js";
import { formatDecimal64Binary, splitDecimal64Fields, toRawBinary } from "./binaryFormatter.js";
import { bitsToHex } from "./hexadecimalFormatter.js";

export const DECIMAL64_BIAS = 398;
export const DECIMAL64_MIN_EXPONENT = -398;
export const DECIMAL64_MAX_EXPONENT = 369;
export const DECIMAL64_PRECISION = 16;

function roundDigitsToEven(digits, removed) {
  if (removed <= 0) return { digits, rounded: false, detail: "No precision rounding was required." };
  if (removed >= digits.length) {
    const padded = digits.padStart(removed + 1, "0");
    return roundDigitsToEven(padded, removed);
  }

  const keep = digits.slice(0, -removed) || "0";
  const discarded = digits.slice(-removed);
  const guard = Number(discarded[0]);
  const sticky = /[1-9]/.test(discarded.slice(1));
  const lastRetained = Number(keep.at(-1));
  const increment = guard > 5 || (guard === 5 && (sticky || lastRetained % 2 === 1));
  const rounded = increment ? (BigInt(keep) + 1n).toString() : keep;
  return {
    digits: rounded,
    rounded: increment,
    detail: `Discarded ${discarded}; round-to-nearest, ties-to-even ${increment ? "incremented" : "kept"} the retained coefficient.`,
  };
}

function normalizeFinite(parsed) {
  let digits = parsed.coefficientDigits;
  let exponent = parsed.exponent;
  const notes = [];

  if (digits.length > DECIMAL64_PRECISION) {
    const removed = digits.length - DECIMAL64_PRECISION;
    const rounded = roundDigitsToEven(digits, removed);
    digits = rounded.digits;
    exponent += removed;
    notes.push(rounded.detail);
    if (digits.length > DECIMAL64_PRECISION) {
      digits = digits.slice(0, -1);
      exponent += 1;
      notes.push("Rounding carried into a new digit, so the coefficient was renormalized.");
    }
  }

  while (exponent > DECIMAL64_MAX_EXPONENT && digits.length < DECIMAL64_PRECISION) {
    digits += "0";
    exponent -= 1;
  }

  if (exponent > DECIMAL64_MAX_EXPONENT) return { overflow: true, notes };

  if (exponent < DECIMAL64_MIN_EXPONENT) {
    const removed = DECIMAL64_MIN_EXPONENT - exponent;
    const rounded = roundDigitsToEven(digits, removed);
    digits = rounded.digits.replace(/^0+/, "") || "0";
    exponent = DECIMAL64_MIN_EXPONENT;
    notes.push(rounded.detail);
    notes.push("The exponent was clamped to −398 for decimal64 underflow/subnormal encoding.");
  }

  const coefficient = BigInt(digits);
  const adjustedExponent = coefficient === 0n ? exponent : exponent + digits.length - 1;
  return {
    coefficient,
    coefficientDigits: digits,
    exponent,
    adjustedExponent,
    subnormal: coefficient !== 0n && adjustedExponent < -383,
    underflowToZero: coefficient === 0n,
    notes,
  };
}

function assembleFinite(sign, coefficient, exponent) {
  const biasedExponent = BigInt(exponent + DECIMAL64_BIAS);
  const signBits = sign ? 1n << 63n : 0n;
  if (coefficient < 1n << 53n) {
    return signBits | (biasedExponent << 53n) | coefficient;
  }
  return signBits | 0x6000000000000000n | (biasedExponent << 51n) | (coefficient & 0x0007ffffffffffffn);
}

function buildResult(parsed, bits, data = {}) {
  const fields = splitDecimal64Fields(bits);
  return {
    ...data,
    kind: data.kind ?? parsed.kind,
    sign: parsed.sign,
    original: parsed.original,
    encoding: "BID",
    bits,
    rawBinary: toRawBinary(bits),
    formattedBinary: formatDecimal64Binary(bits),
    hexadecimal: bitsToHex(bits),
    fields,
  };
}

export function encodeDecimal64(input) {
  const parsed = parseDecimal(input);
  if (parsed.kind === "infinity" || parsed.kind === "nan") {
    return buildResult(parsed, encodeSpecial(parsed.kind, parsed.sign), {
      steps: [
        `Recognized ${parsed.kind === "nan" ? "NaN" : parsed.sign ? "negative infinity" : "positive infinity"}.`,
        "Applied the IEEE 754 decimal64 special combination field.",
      ],
    });
  }

  if (parsed.kind === "zero") {
    const zeroExponent = parsed.exponent >= DECIMAL64_MIN_EXPONENT && parsed.exponent <= DECIMAL64_MAX_EXPONENT ? parsed.exponent : 0;
    const bits = assembleFinite(parsed.sign, 0n, zeroExponent);
    return buildResult(parsed, bits, {
      coefficient: 0n,
      coefficientDigits: "0",
      exponent: zeroExponent,
      biasedExponent: zeroExponent + DECIMAL64_BIAS,
      adjustedExponent: null,
      subnormal: false,
      steps: ["Parsed a zero coefficient.", `Preserved the ${parsed.sign ? "negative" : "positive"} sign bit.`, "Encoded zero using BID."],
    });
  }

  const normalized = normalizeFinite(parsed);
  if (normalized.overflow) {
    return buildResult(parsed, encodeSpecial("infinity", parsed.sign), {
      kind: "infinity",
      overflow: true,
      steps: ["The value exceeds decimal64's largest finite adjusted exponent (384).", "Rounded to signed infinity."],
    });
  }

  const bits = assembleFinite(parsed.sign, normalized.coefficient, normalized.exponent);
  const biasedExponent = normalized.exponent + DECIMAL64_BIAS;
  return buildResult(parsed, bits, {
    ...normalized,
    biasedExponent,
    kind: normalized.underflowToZero ? "zero" : normalized.subnormal ? "subnormal" : "finite",
    steps: [
      `Parsed sign: ${parsed.sign ? "negative" : "positive"}.`,
      `Parsed coefficient: ${parsed.coefficientDigits}; effective exponent: ${parsed.exponent}.`,
      ...normalized.notes,
      `Normalized as ${normalized.coefficientDigits} × 10^${normalized.exponent}.`,
      `Added exponent bias 398: ${normalized.exponent} + 398 = ${biasedExponent}.`,
      "Assembled the sign, BID steering/combination, exponent, and coefficient bits.",
    ],
  });
}

export { assembleFinite, normalizeFinite };