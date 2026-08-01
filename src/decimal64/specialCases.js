export const DECIMAL64_INFINITY = 0x7800000000000000n;
export const DECIMAL64_NAN = 0x7c00000000000000n;
export const SIGN_MASK = 0x8000000000000000n;

export function encodeSpecial(kind, sign = 0) {
  const signBits = sign ? SIGN_MASK : 0n;
  if (kind === "infinity") return signBits | DECIMAL64_INFINITY;
  if (kind === "nan") return signBits | DECIMAL64_NAN;
  throw new Error(`Unsupported special value: ${kind}`);
}

export function classifySpecialBits(bits) {
  const combination = Number((bits >> 58n) & 0x1fn);
  if (combination === 0x1e) return "infinity";
  if (combination === 0x1f) return "nan";
  return null;
}