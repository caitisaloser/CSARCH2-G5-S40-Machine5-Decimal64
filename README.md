# Machine 5 — Decimal 64-Bit Floating-Point Machine

A React/Vite web application for studying decimal64 conversion, rounding, and decimal floating-point arithmetic.

## Implemented modules

- Decimal-to-decimal64 converter using **IEEE 754 Binary Integer Decimal (BID)** encoding
- Decimal64 decoder/verifier
- Positive and negative finite numbers, signed zero, subnormal values, infinity, NaN, overflow, underflow, scientific notation, and input validation
- Four-method rounding simulator: chopping, round-up, round-down, and round-to-nearest ties-to-even

The Decimal64 Converter consistently uses BID, not Densely Packed Decimal (DPD). Technical details and a worked example are in [`docs/decimal64-analysis.md`](docs/decimal64-analysis.md).

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Use the top navigation to switch between the Decimal64 Converter and the existing Rounding Simulator.

Use the **Light/Dark** button in the navigation bar to change the color theme. The selected theme is saved in the browser and reused the next time the application opens.

## Test and build

```bash
npm run test:run
npm run build
```

## Decimal64 converter outputs

For each accepted value, the interface shows:

- classification and BID encoding label;
- sign, combination, exponent-continuation, and coefficient-continuation fields;
- raw and consistently spaced 64-bit binary output;
- exactly 16 hexadecimal digits; and
- the complete parsing, normalization, biasing, and assembly steps.

## Remaining group deliverables

Subtraction, division, final shared documentation, deployment, screenshots, and the YouTube walkthrough are to be ompleted by the assigned members respectively.