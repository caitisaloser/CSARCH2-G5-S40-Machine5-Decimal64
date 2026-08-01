export function toRawBinary(bits) {
  return BigInt(bits).toString(2).padStart(64, "0");
}

export function splitDecimal64Fields(bits) {
  const raw = toRawBinary(bits);
  return {
    sign: raw.slice(0, 1),
    combination: raw.slice(1, 6),
    exponentContinuation: raw.slice(6, 14),
    coefficientContinuation: raw.slice(14),
  };
}

export function formatDecimal64Binary(bits) {
  const fields = splitDecimal64Fields(bits);
  const coefficientGroups = fields.coefficientContinuation.match(/.{1,10}/g).join(" ");
  return `${fields.sign} ${fields.combination} ${fields.exponentContinuation} ${coefficientGroups}`;
}

export const FIELD_LABELS = "Sign | Combination | Exponent continuation | Coefficient continuation (5 × 10 bits)";