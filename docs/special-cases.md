# Decimal64 Special Cases

## 1. Overview

The Decimal 64-Bit Floating-Point Machine supports special values and exceptional arithmetic conditions associated with IEEE 754 decimal floating-point operations.

Special-case handling is implemented so that unusual inputs or arithmetic conditions produce a defined result rather than causing the application to fail.

This document summarizes the special cases supported by the integrated application and describes their expected behavior.

---

## 2. Positive Zero

### Input

```text
0
```

### Expected Behavior

Positive zero is accepted as a valid decimal value.

The Decimal64 representation preserves a positive sign and represents a numerical value of zero.

### Classification

```text
Zero
```

Positive zero may also appear as the result of arithmetic operations.

---

## 3. Negative Zero

### Input

```text
-0
```

### Expected Behavior

Negative zero is treated separately from positive zero.

Although both represent a numerical magnitude of zero, IEEE 754 permits the sign of zero to be preserved.

The Decimal64 encoder therefore maintains the negative sign in the resulting representation.

### Classification

```text
Zero
```

with the sign field indicating a negative value.

---

## 4. Positive Infinity

### Input

```text
Infinity
```

### Expected Behavior

Positive infinity is recognized as an IEEE 754 special value and encoded using the Decimal64 infinity representation.

It does not use an ordinary finite coefficient and exponent combination.

### Classification

```text
Infinity
```

---

## 5. Negative Infinity

### Input

```text
-Infinity
```

### Expected Behavior

Negative infinity is encoded using the Decimal64 infinity representation with the sign field indicating a negative value.

### Classification

```text
Infinity
```

---

## 6. NaN

### Input

```text
NaN
```

### Expected Behavior

NaN, or **Not a Number**, represents an undefined or unrepresentable numerical result.

The Decimal64 Converter recognizes NaN and produces the corresponding special Decimal64 representation.

### Classification

```text
NaN
```

NaN may also be produced by arithmetic operations for which no meaningful numerical result exists.

Examples include:

```text
0 ÷ 0
Infinity ÷ Infinity
```

---

## 7. Overflow

Overflow occurs when the magnitude of a finite result requires an exponent beyond the maximum range supported by the Decimal64 implementation.

### Example Condition

A calculation produces a result whose exponent is greater than the maximum supported exponent.

### Expected Behavior

The system detects the overflow condition rather than attempting to encode an invalid finite value.

Depending on the operation and sign, the result is represented as:

```text
Infinity
```

or:

```text
-Infinity
```

The step-by-step output identifies the overflow condition when applicable.

---

## 8. Underflow

Underflow occurs when a non-zero result becomes extremely small and falls below the normal representable range.

### Expected Behavior

The Decimal64 implementation handles very small values according to the supported Decimal64 exponent and coefficient limits.

Where representable, very small values may be handled as subnormal values.

If the value becomes too small to retain a non-zero representable result, it may reduce to zero.

The sign of the result is preserved where applicable.

---

## 9. Subnormal Values

Subnormal values are finite non-zero values that are smaller than the normal range but can still be represented using the available coefficient and minimum exponent.

### Expected Behavior

The Decimal64 Converter identifies and encodes supported subnormal values rather than immediately treating every extremely small value as zero.

This allows the representation to preserve values close to zero when sufficient coefficient precision remains available.

---

## 10. Invalid Input

The application validates input before performing a calculation.

Examples of invalid input include:

```text
abc
12..3
--12
10A1
```

when the value does not match the selected input format.

### Expected Behavior

The application:

1. rejects the invalid value;
2. prevents the requested calculation from continuing;
3. displays an appropriate error message; and
4. remains operational so the user can correct the input.

Invalid input must not cause the application to crash.

---

## 11. Division by Zero

Division by zero is handled as a special arithmetic case.

### Example

```text
5 ÷ 0
```

### Expected Result

```text
Infinity
```

for a positive result, or:

```text
-Infinity
```

when the resulting sign is negative.

The Division Simulator detects the condition before ordinary coefficient division is performed.

---

## 12. Zero Divided by Zero

### Example

```text
0 ÷ 0
```

The expression has no defined numerical result.

### Expected Result

```text
NaN
```

The Division Simulator identifies this as a special case and does not perform ordinary coefficient division.

---

## 13. Zero Divided by a Finite Non-Zero Value

### Example

```text
0 ÷ 5
```

### Expected Result

```text
0
```

The appropriate result sign is preserved when applicable.

---

## 14. Finite Value Divided by Infinity

### Example

```text
5 ÷ Infinity
```

### Expected Result

```text
0
```

A finite value divided by infinity approaches zero.

The result sign is determined by the signs of the operands.

---

## 15. Infinity Divided by a Finite Non-Zero Value

### Example

```text
Infinity ÷ 5
```

### Expected Result

```text
Infinity
```

The result sign is determined by the signs of the operands.

For example:

```text
-Infinity ÷ 5
```

produces:

```text
-Infinity
```

---

## 16. Infinity Divided by Infinity

### Example

```text
Infinity ÷ Infinity
```

### Expected Result

```text
NaN
```

The expression does not produce a defined finite or infinite numerical result.

---

## 17. NaN in Arithmetic

When NaN participates in an arithmetic operation, the result remains NaN.

### Example

```text
NaN ÷ 5
```

### Expected Result

```text
NaN
```

This prevents an undefined operand from being treated as an ordinary numerical value.

---

## 18. Exact Cancellation in Subtraction

Exact cancellation occurs when two equal values are subtracted.

### Example

```text
5.25 - 5.25
```

### Expected Result

```text
0
```

After exponent alignment and coefficient subtraction, the resulting coefficient becomes zero.

The Subtraction Simulator handles this condition without attempting unnecessary normalization of a non-zero coefficient.

---

## 19. Different Exponents in Subtraction

Subtraction operands may have different exponents.

### Example

```text
12.5 - 0.25
```

### Expected Behavior

Before coefficient subtraction, the operands must be aligned to a compatible exponent.

Digits displaced during alignment may contribute to the Guard, Round, and Sticky information used for the final rounding decision.

The simulator displays the alignment process as part of the step-by-step solution.

---

## 20. Rounding Tie

Round-to-Nearest, Ties-to-Even requires special handling when the discarded portion is exactly halfway between two representable results.

### Expected Behavior

If the last retained digit is even:

```text
Keep the retained value.
```

If the last retained digit is odd:

```text
Increment the retained value so that the final retained digit becomes even.
```

This avoids consistently biasing halfway cases in the same direction.

---

## 21. Non-Zero Discarded Digits

Discarded digits affect directed rounding modes.

For **Round Up**, a positive value with a non-zero discarded portion may require an increment toward positive infinity.

For **Round Down**, a negative value with a non-zero discarded portion may require an increment in magnitude toward negative infinity.

For **Chopping**, discarded digits are removed without incrementing the retained portion.

The GRS information allows the simulator to determine whether meaningful discarded information exists.

---

## 22. Special-Case Handling Summary

| Condition | Expected Result / Behavior |
|---|---|
| `0` | Positive zero |
| `-0` | Negative zero |
| `Infinity` | Positive infinity |
| `-Infinity` | Negative infinity |
| `NaN` | NaN |
| Overflow | Signed infinity |
| Underflow | Subnormal value or signed zero where applicable |
| Invalid input | Error message; calculation rejected |
| Finite non-zero ÷ `0` | Signed infinity |
| `0 ÷ 0` | NaN |
| `0 ÷ finite non-zero` | Signed zero |
| Finite ÷ Infinity | Signed zero |
| Infinity ÷ finite non-zero | Signed infinity |
| Infinity ÷ Infinity | NaN |
| Arithmetic involving NaN | NaN |
| Equal values in subtraction | Zero |
| Different subtraction exponents | Exponent alignment before subtraction |
| Exact rounding tie | Round to nearest even |
| Chopping | Discard without increment |

---

## 23. Error Recovery

Special cases and invalid inputs are handled without requiring the user to restart the application.

After an error or special-case result, the user may:

1. modify the input;
2. select another input format or rounding mode;
3. perform another calculation; or
4. use the Reset/Clear control to restore the module's input state.

This allows the Decimal 64-Bit Floating-Point Machine to remain usable after invalid input and exceptional arithmetic conditions.