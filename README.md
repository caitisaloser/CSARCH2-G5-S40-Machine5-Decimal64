# Machine 5 — Decimal 64-Bit Floating-Point Machine

A React/Vite web application for studying IEEE 754 decimal64 conversion, rounding, Guard-Round-Sticky (GRS) subtraction, and GRS division.

The application integrates the four computational modules into a single responsive interface and provides step-by-step results for studying decimal floating-point representation and arithmetic.

## Live Application

**Website:**  
https://pc5witch.github.io/CSARCH2-G5-S40-Machine5-Decimal64/

**Video Walkthrough:**  
https://youtu.be/AIovKCBM0ws

---

## Machine Specification

The application implements a **64-bit decimal floating-point machine** based on IEEE 754 decimal64.

The Decimal64 Converter uses **Binary Integer Decimal (BID)** encoding rather than Densely Packed Decimal (DPD).

The application supports:

- Decimal64 encoding and decoding
- 16-digit decimal coefficient precision
- Decimal64 exponent processing
- Guard, Round, and Sticky digit calculation
- IEEE 754 rounding behavior
- Decimal64 subtraction
- Decimal64 division
- Special and edge-case handling

---

## Features

### Decimal64 Converter

- Decimal-to-decimal64 conversion
- IEEE 754 BID encoding
- Decimal64 decoding and verification
- Positive and negative finite values
- Positive and negative zero
- Scientific notation
- Subnormal values
- Infinity and negative infinity
- NaN
- Overflow and underflow handling
- Properly spaced 64-bit binary output
- Raw 64-bit binary output
- Exactly 16 hexadecimal digits
- Decimal64 field breakdown
- Step-by-step conversion
- Copy Binary function
- Copy Hexadecimal function

### Rounding Simulator

Supports four rounding methods:

- Chopping
- Round Up
- Round Down
- Round-to-Nearest, Ties-to-Even

The module also displays:

- Retained digits
- Discarded digits
- Guard digit
- Round digit
- Sticky digit
- Rounding decision
- Final rounded result
- Step-by-step explanation

Decimal and binary inputs are supported.

### GRS Subtraction

- Decimal operands
- Decimal64 hexadecimal operands
- Mixed-format operands
- Exponent alignment
- Coefficient subtraction
- Normalization
- Guard, Round, and Sticky processing
- Rounding
- Exact cancellation
- Special-case handling
- Decimal result
- Binary result
- Hexadecimal result
- Step-by-step calculation

### GRS Division

- Decimal operands
- Decimal64 hexadecimal operands
- Result-sign determination
- Exponent calculation
- Coefficient division
- Guard, Round, and Sticky processing
- Multiple rounding modes
- Division-by-zero handling
- Infinity-related arithmetic
- NaN handling
- Decimal result
- Binary result
- Hexadecimal result
- Step-by-step calculation

### Interface

- Navigation between all four modules
- Responsive desktop and mobile layout
- Light and Dark themes
- Input examples
- Reset and clear controls
- Input validation
- Error messages
- Expandable step-by-step information
- Reusable result and step-display components

---

## Technologies Used

- React
- Vite
- JavaScript
- JSX
- CSS
- Vitest
- ESLint
- Git and GitHub
- GitHub Actions
- GitHub Pages

---

## Run Locally

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/PC5witch/CSARCH2-G5-S40-Machine5-Decimal64.git
cd CSARCH2-G5-S40-Machine5-Decimal64
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address printed by Vite in a web browser.

---

## Application Usage

Use the navigation bar to switch between:

1. Decimal64 Converter
2. Rounding Methods
3. GRS Subtraction
4. GRS Division

Enter the required operand or operands, select the appropriate input format and rounding settings when applicable, and perform the calculation.

The application displays the corresponding result together with relevant Decimal64 fields, GRS information, and step-by-step calculations.

Use the **Light/Dark** control in the navigation bar to change the application theme. The selected theme is saved by the browser.

For detailed instructions, see:

```text
docs/user-manual.md
```

---

## Testing

The project contains automated tests for the individual computational modules and the integrated application workflow.

Run the complete test suite using:

```bash
npm run test:run
```

Final automated verification:

```text
Test Files: 7 passed
Tests:      86 passed
```

Run ESLint using:

```bash
npm run lint
```

Create the production build using:

```bash
npm run build
```

The final integrated version passes the automated test suite, ESLint validation, and production build.

Detailed test cases are documented in:

```text
docs/test-cases.md
```

---

## Special Cases

The application includes handling for relevant Decimal64 and arithmetic special cases, including:

- Positive zero
- Negative zero
- Positive infinity
- Negative infinity
- NaN
- Overflow
- Underflow
- Invalid input
- Division by zero
- Zero divided by zero
- Infinity-related arithmetic
- Exact cancellation in subtraction

Additional information is available in:

```text
docs/special-cases.md
```

---

## Screenshots

Deployment and application screenshots are stored in:

```text
screenshots/deployment/
```

The screenshot set includes:

- Live application homepage
- Decimal64 Converter
- Rounding module
- GRS Subtraction module
- GRS Division module
- Mobile view
- GitHub repository homepage
- GitHub About website link

---

## Deployment

The application is deployed using **GitHub Pages** through **GitHub Actions**.

Live application:

https://pc5witch.github.io/CSARCH2-G5-S40-Machine5-Decimal64/

The production build is generated by Vite and automatically deployed from the `main` branch.

---

## Project Documentation

Additional documentation is available in the `docs/` directory:

```text
docs/
├── system-overview.md
├── special-cases.md
├── test-cases.md
├── user-manual.md
├── video-script.md
└── contribution-table.md
```

Video materials are stored in:

```text
video/
├── video-outline.md
└── youtube-link.txt
```

---

## Group Members and Contributions

The application was developed collaboratively, with responsibilities divided among the group members for Decimal64 conversion, rounding, GRS subtraction, GRS division, and final integration.

Detailed individual responsibilities and contributions are documented in:

```text
docs/contribution-table.md
```

---

## Known Limitations

- The application is intended primarily as an educational simulator for the required Machine 5 specifications.
- Decimal64 representation uses BID encoding and does not provide DPD encoding.
- Results are limited to the supported IEEE 754 decimal64 behavior implemented by the project.
- The application requires JavaScript to run in the browser.
- Clipboard functionality depends on browser support and permissions.

---

## References

- IEEE Standard for Floating-Point Arithmetic (IEEE 754)
- Course materials and specifications provided for Machine 5
- React documentation
- Vite documentation
- Vitest documentation
- GitHub Pages documentation

---

## Video Walkthrough

The final project walkthrough demonstrates:

- Live deployed application
- Decimal64 conversion
- Binary and hexadecimal representation
- Four rounding methods
- Guard, Round, and Sticky processing
- GRS subtraction
- GRS division
- Normal and special cases
- Invalid-input handling
- Responsive interface
- GitHub repository
- Deployment

**YouTube:** https://youtu.be/AIovKCBM0ws