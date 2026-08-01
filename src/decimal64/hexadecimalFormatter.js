export function binaryToHex(binary) {
  const raw = String(binary).replace(/\s/g, "");
  if (!/^[01]{64}$/.test(raw)) throw new Error("A 64-bit binary string is required.");
  return BigInt(`0b${raw}`).toString(16).toUpperCase().padStart(16, "0");
}

export function bitsToHex(bits) {
  return BigInt(bits).toString(16).toUpperCase().padStart(16, "0");
}