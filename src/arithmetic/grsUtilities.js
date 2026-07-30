/**
 * Computes the Guard, Round, and Sticky (GRS) digits/bits
 * from the discarded portion after the target precision.
 *
 * Example:
 * discarded = "6789"
 *
 * Guard  = 6
 * Round  = 7
 * Sticky = 1 (because "89" contains non-zero digits)
 */

export function calculateGRS(discarded) {
    if (!discarded) {
        return {
            guard: "0",
            round: "0",
            sticky: "0"
        };
    }

    const guard = discarded[0] ?? "0";
    const round = discarded[1] ?? "0";

    let sticky = "0";

    for (let i = 2; i < discarded.length; i++) {
        if (discarded[i] !== "0") {
            sticky = "1";
            break;
        }
    }

    return {
        guard,
        round,
        sticky
    };
}

/**
 * Returns true if any discarded digit/bit is non-zero.
 *
 * Useful for round-up and round-down.
 */
export function hasDiscardedNonZero(discarded) {
    if (!discarded) return false;

    return discarded.split("").some(char => char !== "0");
}

/**
 * Determines whether the discarded portion is exactly halfway.
 *
 * Decimal:
 *   "5000" -> true
 *
 * Binary:
 *   "1000" -> true
 */
export function isHalfway(discarded, format) {
    if (!discarded) return false;

    if (format === "decimal") {
        if (discarded[0] !== "5") return false;

        for (let i = 1; i < discarded.length; i++) {
            if (discarded[i] !== "0") return false;
        }

        return true;
    }

    if (format === "binary") {
        if (discarded[0] !== "1") return false;

        for (let i = 1; i < discarded.length; i++) {
            if (discarded[i] !== "0") return false;
        }

        return true;
    }

    return false;
}