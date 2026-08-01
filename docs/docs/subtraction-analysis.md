# Decimal64 Subtraction Using GRS Analysis

## 1. Objective

The **Decimal64 Subtraction Simulator** performs decimal floating-point subtraction for **Machine 5: Decimal 64-Bit Floating-Point Machine**.

The module allows users to:

- Enter two operands in decimal or IEEE decimal64 hexadecimal format.
- Decode hexadecimal operands using the shared decimal64 decoder.
- Display the sign, coefficient, exponent, and classification of each operand.
- Align operands to a common decimal exponent.
- Perform exact signed coefficient subtraction using `BigInt`.
- Determine the Guard, Round, and Sticky (GRS) digits.
- Apply the selected rounding mode.
- Normalize and encode the final result using the shared decimal64 BID encoder.
- Display the final result in decimal, properly spaced binary, and hexadecimal formats.
- View a complete step-by-step explanation.

The simulator is intended to demonstrate how precision, exponent alignment, normalization, GRS information, and rounding affect decimal64 subtraction.

---

## 2. Input Requirements

The subtraction form accepts the following inputs.

### Operand A

Operand A is the first value in the operation:

```text
Operand A - Operand B
```

### Format of Operand A

The user selects one of the following:

- Decimal
- IEEE Decimal64 Hexadecimal

### Operand B

Operand B is the value subtracted from Operand A.

### Format of Operand B

The user selects one of the following:

- Decimal
- IEEE Decimal64 Hexadecimal

### Rounding Mode

The available rounding modes are:

- Chopping
- Round-Up
- Round-Down
- Round-to-Nearest, Ties-to-Even

### Accepted Decimal Inputs

Examples include:

- `12.5`
- `-3.2`
- `0`
- `-0`
- `1.2345e10`
- `0.0000000000000001`
- `Infinity`
- `-Infinity`
- `NaN`

### Accepted Hexadecimal Inputs

A hexadecimal operand must contain exactly 16 hexadecimal digits, with an optional `0x` prefix.

Examples:

- `31A000000000005D`
- `0x31A000000000005D`

Invalid decimal or hexadecimal input produces an error message instead of crashing the application.

---

## 3. Output Requirements

The simulator displays the following information.

### Operand Information

For both operands:

- Original input
- Input format
- Classification
- Sign
- Coefficient
- Exponent

Possible classifications include:

- Normal
- Subnormal
- Zero
- Infinity
- NaN

### Exponent Alignment

The simulator displays:

- Common exponent
- Shift applied to Operand A
- Shift applied to Operand B
- Aligned coefficient of Operand A
- Aligned coefficient of Operand B

### GRS Information

The simulator displays:

- Retained coefficient
- Discarded digits
- Guard digit
- Round digit
- Sticky digit
- Rounding decision

### Final Result

The final result is displayed in:

- Decimal
- IEEE decimal64 binary with proper spacing
- Raw 64-bit binary
- 16-digit hexadecimal
- Result classification

### Step-by-Step Solution

The module provides an ordered explanation covering input reading, decoding, alignment, subtraction, sign determination, normalization, GRS generation, rounding, and final encoding.

---

## 4. Decimal64 Representation Used

The group uses **IEEE 754 decimal64 Binary Integer Decimal (BID)** encoding.

Important decimal64 values used by the project are:

| Item | Value |
|------|------:|
| Total size | 64 bits |
| Decimal precision | 16 significant digits |
| Exponent bias | 398 |
| Minimum stored exponent | -398 |
| Maximum stored exponent | 369 |
| Hexadecimal output length | 16 hexadecimal digits |

The subtraction module does not recreate the encoder or decoder. It uses the shared functions created for the decimal64 conversion module.

---

## 5. Internal Operand Format

Decimal and hexadecimal operands are converted into one shared object format.

Example:

```javascript
{
    sourceFormat: "decimal",
    original: "12.5",
    kind: "finite",
    sign: 0,
    coefficientDigits: "125",
    exponent: -1
}
```

The represented value is:

```text
(-1)^sign × coefficient × 10^exponent
```

For the example above:

```text
125 × 10^-1 = 12.5
```

The sign uses:

- `0` for positive
- `1` for negative

---

## 6. Guard, Round, and Sticky Digits

Decimal64 keeps at most 16 significant decimal digits. When a result contains more than 16 digits, the extra digits are used to make the rounding decision.

For a discarded string:

```text
9999999999999999
```

the GRS values are:

| Item | Value |
|------|------:|
| Guard | 9 |
| Round | 9 |
| Sticky | 1 |

The rules are:

- **Guard** is the first discarded digit.
- **Round** is the second discarded digit.
- **Sticky** is `1` when any digit after the Round digit is nonzero.
- **Sticky** is `0` when all remaining discarded digits are zero.

When no digits are discarded:

```text
Guard = 0
Round = 0
Sticky = 0
```

---

## 7. Rounding Rules

### Chopping

All digits after the 16th significant digit are removed.

The retained coefficient is not incremented.

### Round-Up

Round toward positive infinity.

- A positive result is incremented when any discarded digit is nonzero.
- A negative result remains at the chopped value.

### Round-Down

Round toward negative infinity.

- A positive result remains at the chopped value.
- A negative result increases in magnitude when any discarded digit is nonzero.

### Round-to-Nearest, Ties-to-Even

The result is rounded to the nearest representable decimal64 value.

- Guard less than `5`: keep the retained coefficient.
- Guard greater than `5`: increment the retained coefficient.
- Guard equal to `5` with a nonzero Round or Sticky digit: increment.
- Exact halfway with an odd last retained digit: increment.
- Exact halfway with an even last retained digit: keep.

If rounding produces a 17-digit coefficient, the coefficient is normalized again and the exponent is increased.

---

## 8. Algorithm

The subtraction module follows these steps:

1. Read Operand A and Operand B.
2. Check the selected format of each operand.
3. Parse decimal input or decode hexadecimal input.
4. Extract the sign, coefficient, exponent, and classification.
5. Check NaN, infinity, zero, and other special cases.
6. Select a common exact decimal exponent.
7. Append decimal zeroes where needed so both coefficients use the same exponent.
8. Convert each aligned coefficient to `BigInt`.
9. Apply the operand signs.
10. Compute Operand A minus Operand B.
11. Determine the sign of the result.
12. Detect exact cancellation.
13. Remove unnecessary trailing zeroes from the result coefficient.
14. Retain at most 16 significant digits.
15. Use the discarded digits to generate Guard, Round, and Sticky.
16. Apply the selected rounding rule.
17. Build the final decimal string.
18. Pass the final decimal value to the shared decimal64 BID encoder.
19. Display decimal, binary, and hexadecimal results.
20. Display all intermediate steps.

---

## 9. Exact Arithmetic Strategy

JavaScript `Number` is not used for the main coefficient subtraction because it can lose precision for large decimal64 values.

The module uses:

- Strings to preserve decimal digits.
- `BigInt` for exact aligned coefficient arithmetic.
- Explicit decimal exponents.
- String-based decimal placement for the final result.

This avoids unwanted binary floating-point approximation during the subtraction process.

The implementation aligns both operands to the smaller stored exponent. This creates a shared exact integer scale before subtraction. GRS digits are then generated from digits discarded when the exact result is reduced to decimal64's 16-digit precision.

---

## 10. Step-by-Step Example

### Input

| Parameter | Value |
|-----------|-------|
| Operand A | 12.5 |
| Format A | Decimal |
| Operand B | 3.2 |
| Format B | Decimal |
| Rounding | Round-to-Nearest, Ties-to-Even |

### Decode the Operands

| Operand | Sign | Coefficient | Exponent | Value |
|---------|-----:|------------:|---------:|------:|
| A | 0 | 125 | -1 | 12.5 |
| B | 0 | 32 | -1 | 3.2 |

### Align the Exponents

Both operands already use exponent `-1`.

```text
125 × 10^-1
 32 × 10^-1
```

### Subtract the Coefficients

```text
125 - 32 = 93
```

### Determine the Sign

The result is positive.

### Normalize

```text
93 × 10^-1 = 9.3
```

The coefficient contains fewer than 16 significant digits, so no precision rounding is required.

### GRS Values

| Guard | Round | Sticky |
|------:|------:|-------:|
| 0 | 0 | 0 |

### Final Result

| Format | Result |
|--------|--------|
| Decimal | `9.3` |
| Hexadecimal | `31A000000000005D` |
| Classification | Finite |

The binary value is displayed by the application using the shared decimal64 binary formatter.

---

## 11. GRS Example

### Input

```text
1234567890123456 - 0.0000000000000001
```

### Operand Forms

```text
Operand A = 1234567890123456 × 10^0
Operand B = 1 × 10^-16
```

### Exact Common Scale

```text
Operand A = 12345678901234560000000000000000 × 10^-16
Operand B =                                1 × 10^-16
```

### Exact Difference

```text
12345678901234559999999999999999 × 10^-16
```

Only 16 significant digits can be retained:

```text
Retained  = 1234567890123455
Discarded = 9999999999999999
```

Therefore:

```text
Guard  = 9
Round  = 9
Sticky = 1
```

Under round-to-nearest, ties-to-even, the retained coefficient is incremented:

```text
1234567890123455 → 1234567890123456
```

The displayed decimal64 result is:

```text
1234567890123456
```

This demonstrates that the very small subtracted value is below the spacing between representable decimal64 numbers at that magnitude.

---

## 12. Special Cases

The module checks special values before ordinary subtraction.

| Operation | Result |
|-----------|--------|
| `NaN - any value` | `NaN` |
| `any value - NaN` | `NaN` |
| `Infinity - Infinity` | `NaN` |
| `-Infinity - -Infinity` | `NaN` |
| `Infinity - -Infinity` | `Infinity` |
| `-Infinity - Infinity` | `-Infinity` |
| `Infinity - finite` | `Infinity` |
| `-Infinity - finite` | `-Infinity` |
| `finite - Infinity` | `-Infinity` |
| `finite - -Infinity` | `Infinity` |
| `equal finite operands` | `0` |
| `0 - 0` | `0` |

The program explains why each special result is produced.

---

## 13. Test Cases

The following categories must be tested:

1. Positive minus positive
2. Positive minus negative
3. Negative minus positive
4. Negative minus negative
5. Equal operands
6. Result equal to zero
7. Equal exponents
8. Different exponents
9. Very large exponent difference
10. Normalization after cancellation
11. Nonzero Guard, Round, and Sticky digits
12. Decimal minus hexadecimal
13. Hexadecimal minus decimal
14. Hexadecimal minus hexadecimal
15. Positive infinity
16. Negative infinity
17. NaN
18. Positive zero
19. Negative zero
20. Invalid decimal input
21. Invalid hexadecimal input
22. Overflow or underflow, when applicable

Manual browser testing is used to confirm that the form, output cards, and step-by-step display work correctly.

Automated testing should be performed using **Vitest** in:

```text
tests/subtractionGRS.test.js
```

---

## 14. Required Screenshots

Screenshots for this module are stored in:

```text
screenshots/subtraction/
```

Required file names include:

```text
subtraction-normal-positive.png
subtraction-positive-negative.png
subtraction-negative-positive.png
subtraction-negative-negative.png
subtraction-equal-operands.png
subtraction-different-exponents.png
subtraction-grs-rounding.png
subtraction-cancellation.png
subtraction-decimal-hex-mixed.png
subtraction-hex-hex.png
subtraction-infinity.png
subtraction-nan.png
subtraction-zero.png
subtraction-invalid-input.png
```

Each screenshot should clearly show:

- Input values
- Input formats
- Selected rounding mode
- Exponent alignment
- GRS digits
- Final decimal result
- Final binary result
- Final hexadecimal result
- Error message, when applicable

---

## 15. Source Files

The Member 3 module uses the following files:

```text
src/arithmetic/subtractionGRS.js
src/arithmetic/decimalArithmetic.js
src/arithmetic/arithmeticSpecialCases.js
src/arithmetic/grsUtilities.js
src/components/SubtractionSimulator.jsx
src/styles/arithmetic.css
tests/subtractionGRS.test.js
docs/subtraction-analysis.md
```

It also integrates with:

```text
src/decimal64/decimalParser.js
src/decimal64/decimal64Decoder.js
src/decimal64/decimal64Encoder.js
src/decimal64/binaryFormatter.js
src/decimal64/hexadecimalFormatter.js
```

---

## 16. Known Limitations

- The module depends on the shared BID encoder and decoder for hexadecimal support.
- The interface uses the decimal64 precision limit of 16 significant digits.
- The displayed alignment may contain long coefficient strings when the operands have very different exponents.
- The module demonstrates decimal64 arithmetic behavior and is not intended to replace a general-purpose arbitrary-precision decimal library.
- Overflow and underflow behavior follows the shared decimal64 encoder.
- Final verification should include automated tests with independently checked expected hexadecimal and binary values.

---

## 17. Conclusion

The Decimal64 Subtraction Simulator demonstrates the complete process of decimal floating-point subtraction using exact coefficient arithmetic and GRS-based rounding.

It supports decimal and hexadecimal operands, mixed input formats, special values, exponent alignment, sign handling, normalization, four rounding modes, and final decimal64 BID encoding.

The module also provides a detailed step-by-step display so users can understand how the final decimal, binary, and hexadecimal results are produced.
