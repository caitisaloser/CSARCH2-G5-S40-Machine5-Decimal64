# Machine 5 — Video Walkthrough Outline

## Overview

The video walkthrough presents the completed **Machine 5 — Decimal 64-Bit Floating-Point Machine** and demonstrates the major features of the integrated web application.

The presentation covers the four primary modules:

1. Decimal64 Converter
2. Rounding Methods
3. GRS Subtraction
4. GRS Division

The walkthrough also demonstrates special cases, input validation, responsive design, automated testing, the GitHub repository, and the deployed application.

---

## 1. Project Introduction

- Introduce the Machine 5 Decimal 64-Bit Floating-Point Machine.
- Present the deployed React/Vite web application.
- Explain that the application follows IEEE 754 decimal64 representation.
- Identify Binary Integer Decimal (BID) as the selected decimal64 encoding method.
- Present the four primary modules through the application navigation.

---

## 2. Decimal64 Converter

Demonstrate the conversion of a normal decimal value such as:

```text
123.45
```

Present the resulting:

- Decimal64 classification
- BID encoding
- 16-digit hexadecimal representation
- Properly spaced 64-bit binary representation
- Raw 64-bit binary representation
- Sign field
- Combination field
- Exponent continuation
- Coefficient continuation
- Step-by-step conversion

Demonstrate the Copy Binary and Copy Hexadecimal functions.

A special Decimal64 value such as `Infinity` is also demonstrated to show the application's handling of non-finite values.

---

## 3. Rounding Methods

Demonstrate the Rounding Simulator using an input containing discarded digits.

Present all four supported rounding methods:

- Chopping
- Round Up
- Round Down
- Round-to-Nearest, Ties-to-Even

Present the retained and discarded portions together with the Guard, Round, and Sticky values.

Include a ties-to-even case to demonstrate IEEE 754 halfway rounding behavior.

---

## 4. GRS Subtraction

Demonstrate a normal subtraction operation using the GRS Subtraction Simulator.

Present the major stages of the operation, including:

- Operand processing
- Exponent alignment
- Coefficient subtraction
- Normalization
- Guard, Round, and Sticky processing
- Rounding
- Final Decimal64 result

Present the final result in decimal, binary, and hexadecimal formats.

The module's support for decimal, hexadecimal, and mixed-format operands is also identified.

Demonstrate exact cancellation using equal operands to produce a zero result.

---

## 5. GRS Division

Demonstrate a normal division operation using the GRS Division Simulator.

Present the major stages of the operation, including:

- Operand processing
- Result sign determination
- Exponent calculation
- Coefficient division
- Discarded-digit processing
- Guard, Round, and Sticky calculation
- Rounding
- Final Decimal64 result

Present the final result in decimal, binary, and hexadecimal formats.

Demonstrate division by zero as a special arithmetic case.

---

## 6. Input Validation and Interface Features

Demonstrate the application's handling of invalid input.

Present selected user-interface features, including:

- Input examples
- Reset and clear controls
- Copy Binary
- Copy Hexadecimal
- Step-by-step output
- Light and Dark themes
- Responsive layout

Demonstrate the application using a mobile-sized display to confirm that the interface remains readable and usable on smaller screens.

---

## 7. GitHub Repository and Testing

Present the project GitHub repository and its primary directories:

```text
src/
tests/
docs/
video/
```

Present the project README and supporting documentation.

The final project verification includes:

```bash
npm run lint
npm run test:run
npm run build
```

These verify code quality, automated tests, integration behavior, and the production build.

---

## 8. Deployment

Present the live deployed application and its public deployment address.

Confirm that the deployment link is also provided through:

- GitHub repository About section
- Project README

---

## 9. Conclusion

Conclude the walkthrough by summarizing the completed system:

- IEEE 754 decimal64 BID conversion
- Four rounding methods
- Guard, Round, and Sticky processing
- Decimal64 subtraction
- Decimal64 division
- Special and edge-case handling
- Input validation
- Responsive web interface
- Automated testing
- Project documentation
- Live deployment

The final walkthrough demonstrates the completed integration of the individual computational modules into a single Decimal64 educational web application.