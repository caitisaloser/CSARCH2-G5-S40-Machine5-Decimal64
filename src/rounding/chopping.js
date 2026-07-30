import { rebuildNumber } from "../utils/digitOperations";

/**
 * Chopping (Truncation)
 *
 * Simply removes all digits/bits after the target precision.
 * No rounding is performed.
 */
export function chopping(info) {

    const result = rebuildNumber(
        info.sign,
        info.integerPart,
        info.retained
    );

    return {

        method: "Chopping",

        original: info.original,

        retained: info.retained,

        discarded: info.discarded,

        sign: info.sign,

        guard: info.guard,

        round: info.round,

        sticky: info.sticky,

        decision:
            "Discard all digits/bits after the target precision.",

        result,

        explanation:
            "Chopping truncates the value without performing any rounding."
    };
}