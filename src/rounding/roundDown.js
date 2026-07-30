import { increment, rebuildNumber } from "../utils/digitOperations";
import { hasDiscardedNonZero } from "../arithmetic/grsUtilities";

/**
 * Round-Down (Toward Negative Infinity)
 *
 * Rules:
 *  - Positive numbers:
 *      Never increment.
 *      Chopped value is already toward negative infinity.
 *
 *  - Negative numbers:
 *      Increment the magnitude if any discarded digit/bit is non-zero.
 */
export function roundDown(info) {

    let integerPart = info.integerPart;
    let retained = info.retained;

    let decision = "No rounding needed.";

    const hasDiscarded = hasDiscardedNonZero(info.discarded);

    if (info.sign === "-" && hasDiscarded) {

        const incremented = increment(
            integerPart,
            retained,
            info.format
        );

        integerPart = incremented.integerPart;
        retained = incremented.retained;

        decision =
            "Negative number with discarded non-zero digits. Rounded toward negative infinity.";

    } else if (info.sign === "+") {

        decision =
            "Positive number. Chopped value is already toward negative infinity.";

    }

    const result = rebuildNumber(
        info.sign,
        integerPart,
        retained
    );

    return {

        method: "Round-Down",

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
            "Rounds toward negative infinity."
    };
}