import { parseDecimal } from "../decimal64/decimalParser.js";
import { decodeDecimal64 } from "../decimal64/decimal64Decoder.js";
import { encodeDecimal64 } from "../decimal64/decimal64Encoder.js";
import { checkDivisionSpecialCases } from "./arithmeticSpecialCases.js";
import { divideCoefficients } from "./decimalArithmetic.js";
import { calculateGRS } from "./grsUtilities.js";

function getOperandData(input, format) {
    if (format === "hex") {
        return decodeDecimal64(input);
    }
    return parseDecimal(input);
}

export function simulateDivision(dividendInput, dividendFormat, divisorInput, divisorFormat, roundingMode) {
    const steps = [];

    let dividend, divisor;
    try {
        dividend = getOperandData(dividendInput, dividendFormat);
        divisor = getOperandData(divisorInput, divisorFormat);
        steps.push("Successfully parsed/decoded both operands.");
    } catch (error) {
        return { success: false, error: error.message };
    }

    const specialCheck = checkDivisionSpecialCases(dividend, divisor);
    
    if (specialCheck.isSpecial) {
        steps.push(`Special Case Detected: ${specialCheck.explanation}`);
        
        let specialString;
        if (specialCheck.resultType === 'NaN') {
            specialString = "NaN";
        } else if (specialCheck.resultType === 'Zero') {
            specialString = specialCheck.sign === 1 ? "-0" : "0";
        } else {
            specialString = specialCheck.sign === 1 ? "-Infinity" : "Infinity";
        }
            
        const finalEncoded = encodeDecimal64(specialString);
        
        return {
            success: true,
            isSpecial: true,
            steps,
            specialExplanation: specialCheck.explanation,
            finalDecimal: specialString,
            finalBinary: finalEncoded.formattedBinary,
            finalHex: finalEncoded.hexadecimal
        };
    }

    const resultSign = dividend.sign === divisor.sign ? 0 : 1;
    steps.push(`Result Sign: ${resultSign === 1 ? "Negative (-)" : "Positive (+)"} (Signs ${dividend.sign === divisor.sign ? "match" : "differ"}).`);

    const baseExponent = dividend.exponent - divisor.exponent;
    steps.push(`Initial Exponent Calculation: Dividend Exp (${dividend.exponent}) - Divisor Exp (${divisor.exponent}) = ${baseExponent}`);

    const divResult = divideCoefficients(dividend.coefficientDigits, divisor.coefficientDigits, 16);
    let currentExponent = baseExponent - divResult.scaleAdjustment;
    let rawQuotient = divResult.quotient;
    const discardedDigits = divResult.discarded;
    
    steps.push(`Coefficient Division Generated Quotient: ${rawQuotient}`);
    steps.push(`Discarded Digits beyond 16 precision limit: ${discardedDigits || "None"}`);
    steps.push(`Exponent adjusted by division scale factor (-${divResult.scaleAdjustment}): ${currentExponent}`);

    const grs = calculateGRS(discardedDigits);
    steps.push(`GRS Evaluated -> Guard: ${grs.guard}, Round: ${grs.round}, Sticky: ${grs.sticky}`);

    let increment = false;
    let roundingExplanation = "";
    const isNonZeroDiscard = grs.guard !== "0" || grs.round !== "0" || grs.sticky !== "0";

    if (roundingMode === "chopping") {
        increment = false;
        roundingExplanation = "Chopping removes discarded digits without incrementing.";
    } 
    else if (roundingMode === "round-up") {
        if (resultSign === 0 && isNonZeroDiscard) {
            increment = true;
            roundingExplanation = "Positive value with non-zero discarded digits; round-up applied.";
        } else {
            roundingExplanation = "Conditions for round-up increment not met; retained digits.";
        }
    } 
    else if (roundingMode === "round-down") {
        if (resultSign === 1 && isNonZeroDiscard) {
            increment = true;
            roundingExplanation = "Negative value with non-zero discarded digits; rounded toward negative infinity.";
        } else {
            roundingExplanation = "Conditions for round-down increment not met; retained digits.";
        }
    } 
    else {
        const g = parseInt(grs.guard, 10);
        const r = parseInt(grs.round, 10);
        const s = parseInt(grs.sticky, 10);
        const lastDigit = parseInt(rawQuotient.slice(-1), 10);
        
        if (g > 5 || (g === 5 && (r > 0 || s > 0))) {
            increment = true;
            roundingExplanation = "Discarded portion is greater than halfway; rounded up.";
        } else if (g === 5 && r === 0 && s === 0) {
            if (lastDigit % 2 !== 0) {
                increment = true;
                roundingExplanation = "Exact halfway tie; incremented to make the last digit even.";
            } else {
                roundingExplanation = "Exact halfway tie; kept to leave the last digit even.";
            }
        } else {
            roundingExplanation = "Discarded portion is less than halfway; chopped.";
        }
    }

    steps.push(`Rounding Decision (${roundingMode}): ${roundingExplanation}`);

    let finalQuotientStr = rawQuotient;
    
    if (increment) {
        let quotientBig = BigInt(rawQuotient) + 1n;
        finalQuotientStr = quotientBig.toString();
        
        if (finalQuotientStr.length > 16) {
            finalQuotientStr = finalQuotientStr.slice(0, 16);
            currentExponent += 1;
            steps.push("Carry over detected after rounding! Shifted right by 1 and added 1 to exponent.");
        }
    }

    if (currentExponent > 369) {
        steps.push(`Overflow Detected: Exponent ${currentExponent} is above the maximum limit.`);
        const finalEncoded = encodeDecimal64(resultSign === 1 ? "-Infinity" : "Infinity");
        return {
            success: true,
            isSpecial: true,
            steps,
            specialExplanation: "Overflow: Result exceeded maximum exponent.",
            finalDecimal: resultSign === 1 ? "-Infinity" : "Infinity",
            finalBinary: finalEncoded.formattedBinary,
            finalHex: finalEncoded.hexadecimal
        };
    }

    let displayQuotient = finalQuotientStr;
    let displayExponent = currentExponent;

    while (displayQuotient.length > 1 && displayQuotient.endsWith('0')) {
        displayQuotient = displayQuotient.slice(0, -1);
        displayExponent += 1;
    }

    const signString = resultSign === 1 ? "-" : "";
    
    const finalDecimalStr = `${signString}${displayQuotient}e${displayExponent}`;
    const finalEncoded = encodeDecimal64(finalDecimalStr);
    steps.push("Stripped trailing zeros and encoded final coefficient/exponent into Decimal64 bits.");

    let prettyDecimal = `${signString}${displayQuotient}`;
    if (displayExponent !== 0) {
        prettyDecimal += ` × 10^${displayExponent}`;
    }

    return {
        success: true,
        isSpecial: false,
        steps,
        dividendData: dividend,
        divisorData: divisor,
        grs,
        roundingExplanation,
        finalDecimal: prettyDecimal,
        finalBinary: finalEncoded.formattedBinary,
        finalHex: finalEncoded.hexadecimal
    };
}