# Machine 5 — Video Walkthrough Script

## Introduction

Good day. This is our **Machine 5 — Decimal 64-Bit Floating-Point Machine**, a web application developed using React and Vite.

The application demonstrates IEEE 754 decimal64 representation and arithmetic using **Binary Integer Decimal, or BID, encoding**.

The system contains four main modules: the Decimal64 Converter, Rounding Methods, GRS Subtraction, and GRS Division.

---

## Decimal64 Converter

We will begin with the **Decimal64 Converter**.

For this example, we will use the decimal value:

```text
123.45
```

After selecting Convert, the application encodes the input into its 64-bit Decimal64 BID representation.

The output identifies the value's classification and encoding method and provides its hexadecimal representation.

The hexadecimal output contains exactly 16 hexadecimal digits, corresponding to the complete 64-bit Decimal64 value.

The application also displays the properly spaced binary representation. The fields are separated into the sign, combination field, exponent continuation, and coefficient continuation.

The raw 64-bit binary value can also be viewed separately.

Below this, the application displays the individual field values and a step-by-step explanation of how the input was parsed, normalized, biased, and assembled into its final Decimal64 representation.

The binary and hexadecimal results can also be copied directly using the Copy Binary and Copy Hexadecimal controls.

The converter also handles Decimal64 special values. For example, entering:

```text
Infinity
```

produces the corresponding special Decimal64 representation.

Other supported special inputs include negative infinity, NaN, and signed zero.

---

## Rounding Methods

The second module is the **Rounding Simulator**.

The simulator supports both decimal and binary input and allows a target number of digits or bits to be selected.

For the selected input, the application performs all four required rounding methods:

- Chopping
- Round Up
- Round Down
- Round-to-Nearest, Ties-to-Even

For each method, the application displays the retained portion, discarded portion, Guard, Round, and Sticky information, the rounding decision, and the resulting value.

For an exact halfway case, Round-to-Nearest, Ties-to-Even selects the result whose final retained digit is even. This implements the IEEE 754 ties-to-even rounding rule.

---

## GRS Subtraction

The third module is the **GRS Subtraction Simulator**.

The simulator accepts two operands and performs:

```text
Operand A - Operand B
```

The operands may be entered using decimal or Decimal64 hexadecimal representation, including mixed-format operations.

During subtraction, the application processes the operands, aligns their exponents when necessary, performs coefficient subtraction, normalizes the result, determines the Guard, Round, and Sticky information, and applies the selected rounding mode.

The step-by-step section displays the major stages of this process.

The final result is then presented in decimal, binary, and hexadecimal formats.

The subtraction module also handles edge cases such as exact cancellation. For example:

```text
5.25 - 5.25
```

produces a zero result.

---

## GRS Division

The fourth module is the **GRS Division Simulator**.

The simulator accepts a dividend and divisor in the supported input formats.

For a normal division operation, the application determines the result sign, calculates the exponent, performs coefficient division, identifies discarded information, calculates the Guard, Round, and Sticky values, and applies the selected rounding mode.

The application then produces the final Decimal64 result together with its decimal, binary, and hexadecimal representations.

The complete calculation can also be reviewed through the step-by-step output.

The division module handles special arithmetic conditions as well.

For example, dividing a non-zero finite value by zero produces the appropriate Infinity result.

A case such as:

```text
0 ÷ 0
```

produces NaN.

---

## Input Validation and Interface

The application also includes input validation.

If an invalid value such as:

```text
abc
```

is entered where a numerical value is required, the application displays an error message instead of performing an invalid calculation.

The interface provides example inputs and Reset or Clear controls to make each module easier to use.

The application also includes Light and Dark themes. The selected theme is stored by the browser so that the preference can be retained.

The interface uses responsive styling so that the application remains readable and usable on desktop and mobile-sized displays.

---

## Testing and GitHub Repository

The complete source code is maintained in the project GitHub repository.

The repository contains the application source files, automated tests, documentation, and video materials.

The project uses both module-specific tests and integration tests to verify the behavior of the individual computational components and the complete application workflow.

Final verification is performed using:

```bash
npm run lint
npm run test:run
npm run build
```

These commands verify code quality, automated testing, and the production build.

---

## Deployment

The completed application is deployed as a live website.

The deployment allows the four modules to be accessed and demonstrated directly through a web browser without running the development environment locally.

The live deployment link is provided in both the GitHub repository's Website section and the project README.

---

## Conclusion

In summary, the Machine 5 Decimal 64-Bit Floating-Point Machine integrates four major functions into a single web application: Decimal64 BID conversion, four IEEE 754 rounding methods, GRS subtraction, and GRS division.

The application also provides special-case handling, input validation, step-by-step solutions, binary and hexadecimal output, responsive design, automated testing, and live deployment.

This concludes the demonstration of our Machine 5 Decimal 64-Bit Floating-Point Machine.