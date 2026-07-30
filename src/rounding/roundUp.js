import { increment, rebuildNumber } from "../utils/digitOperations";
import { hasDiscardedNonZero } from "../arithmetic/grsUtilities";

/**
 * Round-Up (Toward Positive Infinity)
 *
 * Rules:
 *  - Positive numbers:
 *      Increment if any discarded digit/bit is non-zero.
 *
 *  - Negative numbers:
 *      Never increment.
 *      Chopped value is already closer to +∞.
 */
export function roundUp(info) {

    let integerPart = info.integerPart;
    let retained = info.retained;

    let decision = "No rounding needed.";

    const hasDiscarded = hasDiscardedNonZero(info.discarded);

    if (info.sign === "+" && hasDiscarded) {

        const incremented = increment(
            integerPart,
            retained,
            info.format
        );

        integerPart = incremented.integerPart;
        retained = incremented.retained;

        decision =
            "Positive number with discarded non-zero digits. Rounded toward positive infinity.";

    } else if (info.sign === "-") {

        decision =
            "Negative number. Chopped value is already toward positive infinity.";

    }

    const result = rebuildNumber(
        info.sign,
        integerPart,
        retained
    );

    return {

        method: "Round-Up",

        original: info.original,

        retained,

        discarded: info.discarded,

        sign: info.sign,

        guard: info.guard,

        round: info.round,

        sticky: info.sticky,

        decision,

        result,

        explanation:
            "Rounds toward positive infinity."
    };
}