# Decimal64 Division Module Analysis (GRS Method)

## 1. Objective
The objective of this module is to simulate a Decimal 64-bit Floating-Point Machine's division operation using the Guard, Round, and Sticky (GRS) method. It accepts two operands and a specified rounding method, computes the quotient using arbitrary-precision arithmetic to determine the necessary GRS digits, and accurately encodes the final result into an IEEE 754 decimal64 Binary Integer Decimal (BID) representation.

## 2. Input Requirements
The division simulator accepts the following inputs:
*   **Dividend** - can be positive, negative, zero, or special cases like Infinity or NaN
*   **Dividend Format** - "Decimal" or "IEEE Hexadecimal"
*   **Divisor**
*   **Divisor Format** - "Decimal" or "IEEE Hexadecimal"
*   **Rounding Mode** - method used to handle digits beyond the 16-digit precision limit
    *   Chopping
    *   Round-up (towards positive infinity)
    *   Round-down (towards negative infinity)
    *   Round-to-nearest, ties-to-even

## 3. Output Requirements
With a successful calculation, the module would output the following:
*   **Step-by-step Solution** - detailed log of the internal operations, including parsing, exponent alignment, coefficient division, GRS generation, and rounding decisions
*   **Final Decimal Result**
*   **Final Binary Result** - 64-bit binary representation, formatted with proper spacing to denote the sign, combination, exponent, and coefficient fields
*   **Final Hexadecimal Result** - 16-digit IEEE 754 hexadecimal equivalent

## 4. Algorithm
1.  Read the dividend and divisor strings. If they are in hexadecimal format, decode them into their sign, coefficient, and exponent components.
2.  Check for scenarios that bypass standard arithmetic (e.g., division by zero, operations involving `NaN` or `Infinity`).
3.  Determine the sign of the quotient.
4.  Subtract the divisor's exponent from the dividend's exponent.
5.  Scale the dividend's coefficient and divide it by the divisor's coefficient using `BigInt` to generate a 16-digit quotient plus extra remainder digits.
6.  Extract the Guard, Round, and Sticky digits from the discarded portion of the quotient.
7.  Apply the user-selected rounding mode using the calculated GRS digits.
8.  If rounding causes the coefficient to overflow its 16-digit limit, shift the coefficient right and increment the exponent.
9.  Check the adjusted exponent against Decimal64 maximum and minimum boundaries to handle overflow and underflow.
10. Encode the final sign, coefficient, and exponent back into Decimal64 BID bits.

## 5. Step-by-Step Procedure
From the user's perspective:
1.  The user enters the dividend and divisor and selects their respective data formats.
2.  The user selects one of the four rounding methods from the dropdown menu.
3.  The user clicks "Calculate".
4.  The application immediately validates the inputs. If invalid characters are detected or hexadecimal strings are not exactly 16 characters, an error message is displayed.
5.  If valid, the interface updates to display a summary containing the output formats (Decimal, Hexadecimal, and Rounding Applied).
6.  A GRS section displays the specific Guard, Round, and Sticky digits calculated, along with an explanation of why the rounding resulted in an increment or a retained quotient.
7.  The complete 64-bit binary string is displayed in a designated code block.
8.  An ordered list displays the internal step-by-step logic.
9.  The user clicks "Reset" to clear the contents of the screen and try another division problem.

## 6. Formula or Logic Used
### Sign Calculation
    S_result = S_dividend ⊕ S_divisor
If signs are the same, result is positive. If signs differ, result is negative.

### Base Exponent Calculation
    E_base = E_dividend - E_divisor

### Coefficient Scaling
To guarantee enough precision for GRS extraction, the dividend is scaled before integer division:

    C_dividend_scaled = C_dividend × 10^(scaleFactor)

    Quotient_raw = ⌊ C_dividend_scaled ÷ C_divisor ⌋

### GRS Logic
#### Guard
The 17th digit of the generated quotient string.
#### Round
The 18th digit of the generated quotient string.
#### Sticky
**1** if any digit after the Round digit is non-zero (or if there is a mathematical remainder from the `BigInt` division); otherwise **0**.

## 7. Special Cases

| Dividend Type | Divisor Type | Result | Explanation |
| :--- | :--- | :--- | :--- |
| `Zero` | `Zero` | `NaN` | 0 ÷ 0 is mathematically undefined. |
| `Finite` | `Zero` | `Infinity` | Non-zero divided by zero results in signed Infinity. |
| `Zero` | `Finite` | `Zero` | Zero divided by a valid number is zero. |
| `Infinity` | `Infinity` | `NaN` | Infinity divided by Infinity is undefined. |
| `Infinity` | `Finite` | `Infinity` | Infinity divided by a finite number remains Infinity. |
| `Finite` | `Infinity` | `Zero` | A finite number divided by an infinitely large number approaches zero. |
| `NaN` | `Any` | `NaN` | Any operation involving Not-a-Number propagates the NaN state. |
| `Any` | `NaN` | `NaN` | Any operation involving Not-a-Number propagates the NaN state. |

*Note: Sign propagation applies to `Infinity` and `Zero` results based on the XOR sign logic.*

## 8. Test Cases
The module has been verified against automated tests covering the following required categories:
1. Exact quotient
2. Repeating quotient
3. Positive divided by positive
4. Positive divided by negative
5. Negative divided by positive
6. Negative divided by negative
7. Decimal and hexadecimal mixed input
8. Both operands in hexadecimal
9. Nonzero divided by zero
10. Zero divided by nonzero
11. Zero divided by zero
12. Infinity divided by finite
13. Finite divided by infinity
14. Infinity divided by infinity
15. NaN input
16. Quotient requiring GRS rounding
17. Quotient requiring renormalization after rounding
18. Overflow
19. Underflow
20. Invalid input

## 9. Known Limitations
* To achieve exact 16-digit precision and calculate discarded digits for the GRS method, the arbitrary-precision math relies on `BigInt` and heavy string conversions. While highly accurate, this creates minor computational overhead compared to hardware-level floating-point arithmetic.
* Exponent underflow tracking gracefully clamps to the Decimal64 minimum exponent (-398), but deep mathematical precision on highly complex subnormal combinations may be constrained by JavaScript's handling of scaled divisions.