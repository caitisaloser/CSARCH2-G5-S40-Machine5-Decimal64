# Machine 5 — Decimal 64-Bit Floating-Point Machine

A React/Vite web application for studying decimal64 conversion, rounding, and decimal floating-point arithmetic.

## Implemented Modules

The application currently integrates four main modules:

- **Decimal64 Converter**
  - Converts decimal input into IEEE 754 decimal64 format.
  - Uses **Binary Integer Decimal (BID)** encoding.
  - Supports finite values, signed zero, subnormal values, infinity, NaN, overflow, underflow, and scientific notation.
  - Displays the 64-bit binary representation, hexadecimal representation, Decimal64 fields, and step-by-step conversion process.

- **Rounding Simulator**
  - Demonstrates four rounding methods:
    - Chopping
    - Round Up
    - Round Down
    - Round-to-Nearest, Ties-to-Even
  - Supports decimal and binary input.
  - Displays retained and discarded digits together with Guard, Round, and Sticky (GRS) information.

- **GRS Subtraction Simulator**
  - Performs Decimal64 subtraction using decimal or hexadecimal operands.
  - Supports mixed input formats.
  - Demonstrates exponent alignment, coefficient subtraction, normalization, and GRS-based rounding.
  - Displays operand information, exponent alignment, GRS values, final Decimal64 output, and step-by-step calculations.

- **GRS Division Simulator**
  - Performs Decimal64 division using decimal or hexadecimal operands.
  - Demonstrates coefficient division, exponent calculation, GRS generation, and rounding.
  - Handles special cases such as zero, infinity, NaN, overflow, and underflow.
  - Displays the final decimal, binary, and hexadecimal representations together with the calculation steps.

The Decimal64 implementation consistently uses **BID encoding rather than Densely Packed Decimal (DPD)**.

Detailed technical documentation is available in the [`docs`](docs/) directory.

## Run Locally

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install the project dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local address displayed by Vite in a web browser.

Use the top navigation bar to switch between the four modules:

- Converter
- Rounding
- Subtraction
- Division

Use the **Light/Dark** button in the navigation bar to change the color theme. The selected theme is saved in the browser and reused the next time the application opens.

## Test and Build

Run the automated test suite:

```bash
npm run test:run
```

Create a production build:

```bash
npm run build
```

## Testing

The project uses **Vitest** for automated testing.

The test suite currently covers:

- Decimal64 encoding
- Decimal64 decoding
- Decimal64 special cases
- Rounding methods
- GRS division
- Cross-module integration

Integration tests verify that the major modules work correctly with the shared Decimal64 encoding and decoding functionality.

Run the complete test suite with:

```bash
npm run test:run
```

## Project Structure

```text
src/
├── arithmetic/      # Shared arithmetic, GRS, subtraction, and division logic
├── components/      # React user interface components
├── decimal64/       # Decimal64 parsing, encoding, decoding, and formatting
├── rounding/        # Rounding algorithms and controller
├── styles/          # Application and module styles
├── utils/           # Shared validation, constants, and helper utilities
└── App.jsx          # Main application integration

tests/
├── decimal64Encoder.test.js
├── decimal64Decoder.test.js
├── specialCases.test.js
├── rounding.test.js
├── subtractionGRS.test.js
├── divisionGRS.test.js
└── integration.test.js

docs/
├── decimal64-analysis.md
├── subtraction-analysis.md
└── division-analysis.md
```

## Shared Interface Components

The integrated interface uses reusable React components to maintain consistent behavior across modules:

- `Navigation.jsx` — module navigation and theme controls
- `StepDisplay.jsx` — reusable step-by-step calculation display
- `ResultDisplay.jsx` — reusable Decimal64 result display
- `ErrorMessage.jsx` — consistent validation and error feedback

The interface supports both **desktop and mobile layouts** and includes persistent **Light/Dark** theme selection.

## Decimal64 converter outputs

For each accepted value, the interface shows:

- classification and BID encoding label;
- sign, combination, exponent-continuation, and coefficient-continuation fields;
- raw and consistently spaced 64-bit binary output;
- exactly 16 hexadecimal digits; and
- the complete parsing, normalization, biasing, and assembly steps.

## Remaining group deliverables

Subtraction, division, final shared documentation, deployment, screenshots, and the YouTube walkthrough are to be ompleted by the assigned members respectively.