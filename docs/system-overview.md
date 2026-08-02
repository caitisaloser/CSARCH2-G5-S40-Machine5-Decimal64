# System Overview

## 1. Project Overview

The **Machine 5 — Decimal 64-Bit Floating-Point Machine** is a React-based web application designed to demonstrate decimal floating-point representation and arithmetic using the IEEE 754 decimal64 format.

The application combines four primary modules into a single interface:

1. Decimal64 Converter
2. Rounding Methods Simulator
3. GRS Subtraction Simulator
4. GRS Division Simulator

The system is intended to provide both the final result of each operation and the intermediate steps used to obtain that result. This allows users to observe how decimal values are represented, rounded, and processed using Guard, Round, and Sticky (GRS) digits.

The Decimal64 implementation uses **Binary Integer Decimal (BID)** encoding.

---

## 2. System Objectives

The application was developed to:

- demonstrate the representation of decimal values using IEEE 754 decimal64;
- convert decimal input into binary and hexadecimal Decimal64 representations;
- demonstrate the four required rounding methods;
- illustrate the use of Guard, Round, and Sticky bits/digits during arithmetic operations;
- perform Decimal64 subtraction and division;
- handle normal values, special values, edge cases, and invalid input;
- display intermediate calculation steps in a readable format; and
- integrate the individual computational modules into one responsive web application.

---

## 3. Application Architecture

The system separates the user interface, Decimal64 processing, arithmetic logic, rounding logic, and shared utilities.

```text
User
 │
 ▼
React User Interface
 │
 ├── Decimal64 Converter
 ├── Rounding Simulator
 ├── Subtraction Simulator
 └── Division Simulator
 │
 ▼
Processing Modules
 │
 ├── Decimal64 Parser / Encoder / Decoder
 ├── Rounding Algorithms
 ├── GRS Utilities
 ├── Decimal Arithmetic
 ├── Subtraction Logic
 └── Division Logic
 │
 ▼
Decimal64 Result
 ├── Decimal representation
 ├── 64-bit binary representation
 ├── 16-digit hexadecimal representation
 └── Step-by-step explanation
```

`App.jsx` acts as the main integration point for the application. It controls which of the four modules is currently displayed and maintains the application's Light/Dark theme.

Reusable interface components are used where possible to keep the presentation of steps, results, navigation, and errors consistent between modules.

---

## 4. Decimal64 Representation

The application uses the **IEEE 754 decimal64** floating-point format with **Binary Integer Decimal (BID)** encoding.

A Decimal64 value contains 64 bits divided into the following major fields:

- **Sign bit**
- **Combination field**
- **Exponent continuation field**
- **Coefficient continuation field**

The application provides both formatted and raw representations of the encoded value.

For valid encoded values, the hexadecimal representation contains exactly **16 hexadecimal digits**, corresponding to the 64-bit Decimal64 value.

The system also supports special Decimal64 values including:

- positive zero;
- negative zero;
- positive infinity;
- negative infinity; and
- NaN.

Additional processing is provided for overflow, underflow, and subnormal values where applicable.

---

## 5. Decimal64 Converter Module

The Decimal64 Converter accepts a decimal value and converts it into its Decimal64 BID representation.

Supported input includes:

- positive decimal values;
- negative decimal values;
- zero and negative zero;
- scientific notation;
- Infinity;
- negative Infinity; and
- NaN.

The converter displays:

- value classification;
- encoding method;
- hexadecimal representation;
- formatted 64-bit binary representation;
- raw 64-bit representation;
- sign field;
- combination field;
- exponent continuation;
- coefficient continuation;
- coefficient and exponent information where applicable; and
- step-by-step conversion details.

The module allows users to examine how a decimal input is transformed into the fields required by Decimal64.

---

## 6. Rounding Methods Module

The Rounding Simulator demonstrates the four rounding methods required by the machine:

1. **Chopping**
2. **Round Up**
3. **Round Down**
4. **Round-to-Nearest, Ties-to-Even**

The module supports both decimal and binary input.

Users specify the target number of digits or bits to retain. The system separates the retained and discarded portions of the input and calculates the corresponding Guard, Round, and Sticky information.

All four rounding methods are then applied so their results can be compared.

The simulator displays information such as:

- original value;
- retained digits;
- discarded digits;
- Guard value;
- Round value;
- Sticky value;
- rounding decision;
- rounded result; and
- explanation of the selected rounding behavior.

---

## 7. GRS Subtraction Module

The Subtraction Simulator performs subtraction using Decimal64-compatible operands and demonstrates the use of GRS information during the operation.

The module supports:

- decimal operands;
- hexadecimal Decimal64 operands; and
- mixed-format operands.

The subtraction process includes:

1. parsing or decoding the operands;
2. comparing and aligning exponents;
3. aligning coefficients;
4. performing the subtraction;
5. normalizing the result;
6. evaluating discarded information using GRS;
7. applying the selected rounding mode; and
8. encoding the final result.

The interface displays operand information, exponent alignment, GRS values, the final result, and the step-by-step solution.

The final result is presented using Decimal64-compatible decimal, binary, and hexadecimal information.

---

## 8. GRS Division Module

The Division Simulator performs Decimal64 division and demonstrates how GRS information affects the final rounded quotient.

The module accepts decimal and hexadecimal Decimal64 operands.

The general process includes:

1. parsing or decoding the dividend and divisor;
2. checking arithmetic special cases;
3. determining the sign of the result;
4. calculating the result exponent;
5. dividing the coefficients;
6. identifying discarded digits;
7. calculating Guard, Round, and Sticky values;
8. applying the selected rounding method;
9. handling normalization or carry where necessary; and
10. encoding the final Decimal64 result.

The module also handles special arithmetic situations such as division involving zero, infinity, NaN, and overflow.

The interface displays the final decimal result, binary representation, hexadecimal representation, GRS information, rounding explanation, and calculation steps.

---

## 9. Shared User Interface Components

The application uses reusable React components to provide a consistent interface.

### Navigation

`Navigation.jsx` provides access to the four primary modules:

- Converter
- Rounding
- Subtraction
- Division

It also provides the Light/Dark theme control.

### Step Display

`StepDisplay.jsx` provides a reusable presentation for step-by-step calculations and explanations.

### Result Display

`ResultDisplay.jsx` provides a shared presentation for final Decimal64 results where applicable.

### Error Message

`ErrorMessage.jsx` provides consistent error feedback for invalid input and failed calculations.

The shared components reduce duplicated interface code and help maintain a consistent presentation across the integrated application.

---

## 10. Input Validation and Error Handling

The system performs validation before or during processing to prevent invalid input from causing application failure.

Validation is performed for input types such as:

- decimal values;
- binary values;
- Decimal64 hexadecimal values;
- required input fields; and
- target rounding digits.

When an operation cannot be completed, the interface displays an error message rather than allowing the application to crash.

Examples of handled conditions include:

- empty input;
- invalid decimal input;
- invalid binary input;
- invalid hexadecimal input;
- invalid rounding targets; and
- arithmetic special cases.

---

## 11. Responsive Design and Theme Support

The integrated interface is designed to remain readable and usable at different browser sizes.

The application has been checked using:

- desktop layouts; and
- mobile-sized layouts.

Inputs, buttons, result cards, binary output, and step-by-step information remain accessible when the browser width is reduced.

The application also provides **Light** and **Dark** themes. The selected theme is stored using browser local storage so the user's selection can be restored when the application is opened again.

---

## 12. Testing and Integration

The project uses **Vitest** for automated unit and integration testing.

Automated tests cover:

- Decimal64 encoding;
- Decimal64 decoding;
- special Decimal64 values;
- rounding algorithms;
- GRS subtraction;
- GRS division; and
- cross-module integration.

Integration testing verifies workflows between major components, including:

- Decimal64 encoding and decoding;
- rounding output and Decimal64 encoding;
- subtraction and Decimal64 encoding;
- division and Decimal64 encoding; and
- controlled handling of invalid input.

The complete automated test suite passes successfully.

Code quality and production compatibility are additionally verified using:

```bash
npm run lint
```

and:

```bash
npm run build
```

The application passes ESLint validation and successfully produces a Vite production build.
---

## 13. Technologies Used

The application uses the following technologies:

- **React** — user interface development
- **Vite** — development server and production build tooling
- **JavaScript** — Decimal64, arithmetic, validation, and application logic
- **JSX** — React component structure
- **CSS** — interface styling and responsive design
- **Vitest** — automated unit and integration testing
- **ESLint** — static code-quality checking
- **Git and GitHub** — version control and project collaboration

---

## 14. System Integration

The final application combines the independently developed modules into a single web interface.

The integrated workflow allows a user to move from studying Decimal64 representation to examining rounding behavior and then applying related concepts to subtraction and division.

The system therefore serves both as a functional Decimal64 machine and as an educational visualization of the internal steps involved in decimal floating-point processing.