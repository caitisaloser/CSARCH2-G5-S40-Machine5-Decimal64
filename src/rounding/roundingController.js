import { validateNumber, validateTargetDigits } from "../utils/formatValidator";
import { extractRoundingParts } from "../utils/roundingHelpers";
import { calculateGRS } from "../arithmetic/grsUtilities";

import { chopping } from "./chopping";
import { roundUp } from "./roundUp";
import { roundDown } from "./roundDown";
import { roundNearestEven } from "./roundNearestEven";


export function performRounding(number, format, targetDigits) {

    //-----------------------------------------
    // Validate number
    //-----------------------------------------

    const numberValidation = validateNumber(number, format);

    if (!numberValidation.valid) {
        return {
            success: false,
            error: numberValidation.message
        };
    }

    //-----------------------------------------
    // Validate target digits
    //-----------------------------------------

    const digitValidation = validateTargetDigits(targetDigits);

    if (!digitValidation.valid) {
        return {
            success: false,
            error: digitValidation.message
        };
    }

    //-----------------------------------------
    // Extract retained/discarded digits
    //-----------------------------------------

    const parts = extractRoundingParts(
        number,
        Number(targetDigits),
        format
    );

    //-----------------------------------------
    // Calculate Guard / Round / Sticky
    //-----------------------------------------

    const grs = calculateGRS(parts.discarded);

    //-----------------------------------------
    // Build shared information object
    //-----------------------------------------

    const info = {
        ...parts,
        ...grs
    };

    //-----------------------------------------
    // Execute ALL four methods
    //-----------------------------------------

    const results = [
        chopping(info),
        roundUp(info),
        roundDown(info),
        roundNearestEven(info)
    ];

    //-----------------------------------------

    return {
        success: true,

        input: {
            number,
            format,
            targetDigits: Number(targetDigits)
        },

        results
    };
}