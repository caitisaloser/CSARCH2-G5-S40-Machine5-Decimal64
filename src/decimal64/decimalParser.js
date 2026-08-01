const DECIMAL_PATTERN = /^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/;

export function parseDecimal(input) {
  const original = String(input ?? "").trim();
  if (!original) throw new Error("Enter a decimal value.");

  const special = original.match(/^([+-]?)(infinity|nan)$/i);
  if (special) {
    return {
      kind: special[2].toLowerCase() === "nan" ? "nan" : "infinity",
      sign: special[1] === "-" ? 1 : 0,
      original,
    };
  }

  const match = original.match(DECIMAL_PATTERN);
  if (!match) {
    throw new Error("Invalid decimal input. Use a decimal number, scientific notation, Infinity, -Infinity, or NaN.");
  }

  const sign = match[1] === "-" ? 1 : 0;
  const integer = match[2] ?? "";
  const fraction = match[3] ?? match[4] ?? "";
  const scientificExponent = Number(match[5] ?? 0);
  if (!Number.isSafeInteger(scientificExponent)) throw new Error("The exponent is outside the supported input range.");

  const literalDigits = `${integer}${fraction}`;
  const significant = literalDigits.replace(/^0+/, "");
  const coefficientDigits = significant || "0";
  const exponent = scientificExponent - fraction.length;

  return {
    kind: coefficientDigits === "0" ? "zero" : "finite",
    sign,
    original,
    integer: integer || "0",
    fraction,
    scientificExponent,
    coefficientDigits,
    exponent,
  };
}

export { DECIMAL_PATTERN };