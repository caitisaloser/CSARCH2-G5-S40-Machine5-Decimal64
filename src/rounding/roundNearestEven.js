import { increment, rebuildNumber } from "../utils/digitOperations";
import { isHalfway } from "../arithmetic/grsUtilities";

/**
 * IEEE 754 Round-to-Nearest, Ties-to-Even
 *
 * Rules:
 * 1. Less than halfway  -> Do not round
 * 2. Greater than halfway -> Round
 * 3. Exactly halfway:
 *      - Last retained digit EVEN -> Do not round
 *      - Last retained digit ODD  -> Round
 */
export function roundNearestEven(info) {

    let integerPart = info.integerPart;
    let retained = info.retained;

    let decision;
    let shouldIncrement = false;

    const guard = info.guard;
    const round = info.round;
    const sticky = info.sticky;

    // Determine the halfway digit
    const halfwayDigit =
        info.format === "binary"
            ? "1"
            : "5";

    // ==========================
    // LESS THAN HALFWAY
    // ==========================
    if (guard < halfwayDigit) {

        decision =
            "Discarded value is less than halfway. Keep retained digits.";

    }

    // ==========================
    // GREATER THAN HALFWAY
    // ==========================
    else if (guard > halfwayDigit) {

        shouldIncrement = true;

        decision =
            "Discarded value is greater than halfway. Increment retained digits.";

    }

    // ==========================
    // EXACT HALFWAY
    // ==========================
    else {

        if (!isHalfway(info.discarded, info.format)) {

            shouldIncrement = true;

            decision =
                "Discarded value is greater than halfway.";

        } else {

            const lastDigit =
                retained.length > 0
                    ? retained[retained.length - 1]
                    : integerPart[integerPart.length - 1];

            const value =
                info.format === "binary"
                    ? Number(lastDigit)
                    : parseInt(lastDigit, 10);

            const isEven = value % 2 === 0;

            if (isEven) {

                decision =
                    "Exactly halfway. Last retained digit is even. Keep retained digits.";

            } else {

                shouldIncrement = true;

                decision =
                    "Exactly halfway. Last retained digit is odd. Increment to make it even.";
            }
        }
    }

    if (shouldIncrement) {

        const updated = increment(
            integerPart,
            retained,
            info.format
        );

        integerPart = updated.integerPart;
        retained = updated.retained;
    }

    const result = rebuildNumber(
        info.sign,
        integerPart,
        retained
    );

    return {

        method: "Round-to-Nearest (Ties-to-Even)",

        original: info.original,

        retained,

        discarded: info.discarded,

        sign: info.sign,

        guard,

        round,

        sticky,

        decision,

        result,

        explanation:
            "Rounded to the nearest value. Exact halfway cases are rounded to the nearest even digit."
    };
}