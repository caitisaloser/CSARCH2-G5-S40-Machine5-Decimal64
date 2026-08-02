# User Manual

## 1. Introduction

The **Machine 5 — Decimal 64-Bit Floating-Point Machine** is an interactive web application for demonstrating IEEE 754 decimal64 representation, rounding, subtraction, and division.

The application contains four main modules:

1. Decimal64 Converter
2. Rounding Methods Simulator
3. GRS Subtraction Simulator
4. GRS Division Simulator

Each module provides interactive inputs and detailed outputs to help users understand how Decimal64 values and arithmetic operations are processed.

---

# 2. Opening the Application

## Local Version

To run the application locally, ensure that **Node.js** and **npm** are installed.

Open a terminal in the project directory and install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display a local address in the terminal.

Open the displayed address in a web browser.

A typical local address is:

```text
http://localhost:5173/
```

The exact port may vary depending on the development environment.

## Deployed Version

The final deployed version can be accessed through the live website link provided in the project README and GitHub repository.

---

# 3. Navigating the Application

The navigation bar provides access to the four main modules:

- **Converter**
- **Rounding**
- **Subtraction**
- **Division**

Select the corresponding navigation button to open a module.

Only the selected module is displayed, allowing the user to move between the four tools without leaving the application.

---

# 4. Light and Dark Mode

The navigation bar contains a **Light/Dark** theme button.

Select the button to switch between:

- Light Mode
- Dark Mode

The selected theme is saved in the browser using local storage.

When the application is opened again using the same browser, the previously selected theme is restored.

---

# 5. Using the Decimal64 Converter

The Decimal64 Converter converts decimal input into an IEEE 754 decimal64 representation using **Binary Integer Decimal (BID)** encoding.

## Step 1: Open the Converter

Select:

```text
Converter
```

from the navigation bar.

## Step 2: Enter a Decimal Value

Enter a value into the **Decimal input** field.

Examples include:

```text
123.45
-98.765
-0
1.2345e10
9.999e-20
Infinity
-Infinity
NaN
```

Example buttons are also provided for quickly loading supported sample values.

## Step 3: Convert the Value

Select:

```text
Convert
```

The system validates the input and performs the Decimal64 conversion.

## Step 4: Read the Result

The result area displays information including:

- classification;
- encoding method;
- hexadecimal representation;
- formatted 64-bit binary representation;
- raw 64-bit binary representation;
- sign field;
- combination field;
- exponent continuation;
- coefficient continuation;
- coefficient information;
- exponent information; and
- step-by-step conversion details.

Some fields are displayed only when they apply to the selected value.

---

# 6. Understanding the Converter Output

## Classification

The classification identifies the type of Decimal64 value.

Examples include finite values and special values such as:

```text
Infinity
NaN
Zero
```

## Encoding

The application uses:

```text
BID
```

which stands for **Binary Integer Decimal**.

## Hexadecimal Representation

A Decimal64 value contains 64 bits.

Since one hexadecimal digit represents four bits:

```text
64 ÷ 4 = 16
```

a complete Decimal64 hexadecimal representation contains exactly:

```text
16 hexadecimal digits
```

## Binary Representation

The converter displays the complete 64-bit representation.

The formatted output separates the major Decimal64 fields to make the representation easier to interpret.

The raw output displays the complete bit sequence.

---

# 7. Understanding Decimal64 Fields

A Decimal64 BID representation contains several major fields.

## Sign

The sign field determines whether the value is positive or negative.

```text
0 = Positive
1 = Negative
```

## Combination Field

The combination field contributes to the encoding of the exponent and coefficient information and is also used in special Decimal64 representations.

## Exponent Continuation

The exponent continuation contains additional exponent information.

## Coefficient Continuation

The coefficient continuation stores the remaining encoded coefficient information.

Together, these fields form the complete 64-bit Decimal64 representation.

---

# 8. Resetting the Converter

Select:

```text
Reset
```

to clear the current converter input, result, and error state.

A new value may then be entered.

---

# 9. Using the Rounding Simulator

The Rounding Simulator demonstrates four rounding methods:

1. Chopping
2. Round Up
3. Round Down
4. Round-to-Nearest, Ties-to-Even

The simulator can process decimal and binary values.

## Step 1: Open the Rounding Module

Select:

```text
Rounding
```

from the navigation bar.

## Step 2: Select the Input Format

Choose the required format:

```text
Decimal
```

or:

```text
Binary
```

## Step 3: Enter the Number

Enter a valid value using the selected format.

For decimal input, the value must contain decimal digits in a supported numerical form.

For binary input, only:

```text
0
1
.
-
```

may appear where appropriate.

## Step 4: Select the Target Digits

Specify the number of digits or bits that should be retained.

The target must be a valid positive integer within the supported range.

## Step 5: Perform the Rounding

Start the rounding calculation using the module's calculation control.

The simulator processes the same input using all four supported rounding methods.

---

# 10. Interpreting the Rounding Results

For each rounding method, the simulator may display:

- original value;
- retained portion;
- discarded portion;
- Guard value;
- Round value;
- Sticky value;
- rounding decision;
- final rounded result; and
- explanation.

This allows the results of the four rounding methods to be compared directly.

---

# 11. Rounding Methods

## Chopping

Chopping removes the discarded portion without incrementing the retained value.

It effectively truncates the value at the selected precision.

## Round Up

Round Up moves toward positive infinity when the discarded information requires a directed rounding adjustment.

For positive values with a non-zero discarded portion, the retained value may be incremented.

## Round Down

Round Down moves toward negative infinity when the discarded information requires a directed rounding adjustment.

For negative values with a non-zero discarded portion, the magnitude of the retained value may be increased in the negative direction.

## Round-to-Nearest, Ties-to-Even

This method selects the nearest representable value.

When the discarded portion is exactly halfway between two possible results, the result whose final retained digit is even is selected.

This is the IEEE 754 ties-to-even rule.

---

# 12. Understanding GRS

GRS refers to:

- **Guard**
- **Round**
- **Sticky**

These values summarize discarded information beyond the retained precision.

## Guard

The Guard value is the first discarded position after the retained portion.

## Round

The Round value represents the next discarded position after the Guard position.

## Sticky

The Sticky value indicates whether meaningful non-zero information remains after the Guard and Round positions.

Together, GRS information helps determine whether a retained value should be incremented during rounding.

GRS information is particularly important in the Rounding, Subtraction, and Division modules.

---

# 13. Using the Subtraction Simulator

The GRS Subtraction Simulator performs Decimal64 subtraction while showing the intermediate processing steps.

## Step 1: Open the Module

Select:

```text
Subtraction
```

from the navigation bar.

## Step 2: Enter Operand A

Enter the first operand.

## Step 3: Select the Format of Operand A

Select the appropriate input format.

The simulator supports Decimal64-compatible decimal and hexadecimal input.

## Step 4: Enter Operand B

Enter the value to subtract from Operand A.

The operation performed is:

```text
Operand A - Operand B
```

## Step 5: Select the Format of Operand B

The second operand may use the same format as Operand A or a different supported format.

This allows:

```text
Decimal - Decimal
Hexadecimal - Hexadecimal
Decimal - Hexadecimal
Hexadecimal - Decimal
```

## Step 6: Select the Rounding Mode

Choose the required rounding behavior from the options provided by the simulator.

## Step 7: Perform the Calculation

Select the subtraction/calculation button.

The system validates and parses or decodes both operands before performing the operation.

---

# 14. Interpreting Subtraction Steps

The subtraction process may include:

1. parsing or decoding the operands;
2. comparing exponents;
3. aligning operands to a compatible exponent;
4. shifting coefficient information where required;
5. identifying discarded information;
6. performing coefficient subtraction;
7. determining the result sign;
8. normalizing the result;
9. calculating GRS information;
10. applying the selected rounding mode; and
11. encoding the final Decimal64 result.

The exact steps displayed depend on the operands and arithmetic condition.

---

# 15. Subtraction Results

The final subtraction output provides the resulting Decimal64 information.

Depending on the result and interface section, the user can inspect:

- decimal result;
- binary Decimal64 representation;
- hexadecimal Decimal64 representation;
- GRS information;
- rounding decision; and
- calculation steps.

This allows the user to inspect both the final answer and the process used to produce it.

---

# 16. Mixed-Format Subtraction

The Subtraction Simulator supports mixed input formats.

For example, Operand A may be entered as a decimal value while Operand B is supplied as a Decimal64 hexadecimal representation.

The hexadecimal operand is decoded before the arithmetic operation is performed.

This allows the Decimal64 encoder, decoder, and arithmetic modules to work together within the same calculation.

---

# 17. Exact Cancellation

When equal values are subtracted:

```text
x - x
```

the mathematical result is zero.

Example:

```text
5.25 - 5.25
```

produces:

```text
0
```

The simulator recognizes this condition and returns the appropriate zero result.

---

# 18. Using the Division Simulator

The GRS Division Simulator performs Decimal64 division and displays the intermediate quotient, exponent, GRS, and rounding processes.

## Step 1: Open the Module

Select:

```text
Division
```

from the navigation bar.

## Step 2: Enter the Dividend

Enter the value that will be divided.

## Step 3: Select the Dividend Format

Choose the corresponding input format.

## Step 4: Enter the Divisor

Enter the value that will divide the dividend.

The operation is:

```text
Dividend ÷ Divisor
```

## Step 5: Select the Divisor Format

Select the appropriate format for the divisor.

Decimal and Decimal64 hexadecimal operands are supported.

## Step 6: Select the Rounding Mode

Choose the required rounding method.

## Step 7: Perform the Division

Select the division/calculation control.

The system validates both operands and checks for arithmetic special cases before performing ordinary coefficient division.

---

# 19. Interpreting Division Steps

For a normal finite calculation, the Division Simulator may perform the following:

1. parse or decode both operands;
2. determine the sign of the result;
3. calculate the initial result exponent;
4. divide the operand coefficients;
5. adjust the exponent according to the division scale;
6. identify discarded digits;
7. calculate Guard, Round, and Sticky values;
8. determine the rounding action;
9. apply an increment where required;
10. handle a rounding carry where necessary;
11. normalize the final coefficient and exponent; and
12. encode the result as Decimal64.

The step-by-step output explains the relevant stages of the calculation.

---

# 20. Division Results

The Division Simulator displays information including:

- final decimal result;
- formatted binary Decimal64 representation;
- hexadecimal Decimal64 representation;
- Guard value;
- Round value;
- Sticky value;
- rounding explanation; and
- step-by-step processing.

Special arithmetic cases may display additional explanatory information.

---

# 21. Division by Zero

The Division Simulator checks division-by-zero conditions before ordinary division is performed.

For a finite non-zero value divided by zero:

```text
5 ÷ 0
```

the expected special result is:

```text
Infinity
```

with the sign determined by the operands.

For:

```text
0 ÷ 0
```

the result is:

```text
NaN
```

---

# 22. Infinity and NaN

The application supports Decimal64 special values including:

```text
Infinity
-Infinity
NaN
```

Special-value arithmetic is checked before ordinary arithmetic processing where required.

Examples include:

```text
Infinity ÷ Infinity → NaN
0 ÷ 0               → NaN
finite ÷ Infinity   → Zero
Infinity ÷ finite   → Infinity
```

Signs are preserved where applicable.

---

# 23. Input Examples

Several modules provide example inputs that can be selected directly from the interface.

Example controls are useful for:

- quickly demonstrating a module;
- checking normal cases;
- checking edge cases; and
- learning the expected input format.

Selecting an example fills the relevant input fields without requiring the values to be typed manually.

---

# 24. Reset and Clear Controls

Modules provide Reset or Clear functionality where applicable.

Use these controls to:

- clear entered values;
- remove the previous result;
- remove previous error messages; and
- prepare the module for another calculation.

Resetting one module does not require restarting the complete application.

---

# 25. Error Messages

When invalid input is detected, the application displays an error instead of performing an invalid calculation.

Examples of invalid input include:

```text
abc
12..3
--12
```

or an invalid binary value such as:

```text
10201
```

Possible error conditions include:

- invalid decimal number;
- invalid binary number;
- invalid hexadecimal representation;
- missing input;
- invalid target digits; and
- unsupported input format.

When an error appears:

1. read the displayed message;
2. correct the affected input;
3. confirm that the correct input format is selected; and
4. perform the calculation again.

The application does not need to be restarted after an input error.

---

# 26. Reading Binary Output

A Decimal64 binary representation contains:

```text
64 bits
```

The formatted representation separates important fields to make the value easier to inspect.

When interpreting the binary result, identify:

1. the sign;
2. the combination field;
3. the exponent continuation; and
4. the coefficient continuation.

The raw representation may also be displayed when the uninterrupted 64-bit value is required.

---

# 27. Reading Hexadecimal Output

The hexadecimal representation is a compact representation of the same 64-bit Decimal64 value.

Because each hexadecimal digit represents four binary bits:

```text
16 hexadecimal digits × 4 bits = 64 bits
```

A complete Decimal64 hexadecimal result therefore contains exactly:

```text
16 hexadecimal digits
```

Hexadecimal Decimal64 values can also be used as operands in the supported arithmetic modules.

---

# 28. Step-by-Step Output

The application is designed to show more than the final answer.

Step-by-step sections explain relevant operations such as:

- input parsing;
- Decimal64 field construction;
- exponent processing;
- coefficient processing;
- exponent alignment;
- coefficient arithmetic;
- GRS calculation;
- rounding decisions;
- normalization; and
- final Decimal64 encoding.

Where expandable output is available, select the corresponding section to reveal additional details.

---

# 29. Mobile and Smaller Screens

The interface is responsive and can be used on smaller browser windows and mobile-sized displays.

When the available width becomes smaller:

- content is allowed to wrap;
- controls remain accessible;
- result sections remain readable; and
- long Decimal64 output is contained within the interface.

For the best experience with detailed step-by-step calculations, landscape orientation or a larger screen may provide additional viewing space.

---

# 30. Recommended Demonstration Sequence

For a quick demonstration of the complete application:

1. Open the **Converter**.
2. Convert a normal value such as `123.45`.
3. Convert a special value such as `Infinity` or `NaN`.
4. Open **Rounding** and demonstrate the four rounding methods.
5. Demonstrate an exact ties-to-even case.
6. Open **Subtraction** and perform a normal decimal subtraction.
7. Demonstrate a mixed-format subtraction.
8. Open **Division** and perform a normal finite division.
9. Demonstrate division by zero.
10. Inspect the binary and hexadecimal outputs.
11. Switch between Light and Dark mode.
12. Reduce the browser width to demonstrate responsive behavior.

---

# 31. Troubleshooting

## The Application Does Not Start Locally

Confirm that Node.js and npm are installed:

```bash
node --version
npm --version
```

Install project dependencies:

```bash
npm install
```

Then start the application:

```bash
npm run dev
```

## The Input Is Rejected

Confirm that:

- the correct input format is selected;
- decimal input contains valid decimal characters;
- binary input contains only `0` and `1` where appropriate;
- hexadecimal input is a valid Decimal64 hexadecimal representation; and
- required fields are not empty.

## The Previous Result Is Still Displayed

Use the module's Reset or Clear control before entering a new example if necessary.

## A Special Value Appears Instead of a Finite Result

Review the step-by-step explanation.

The calculation may have encountered a defined special condition such as:

- division by zero;
- NaN propagation;
- infinity arithmetic;
- overflow; or
- underflow.

---

# 32. Additional Documentation

Additional technical information is available in:

```text
docs/system-overview.md
docs/special-cases.md
docs/test-cases.md
```

These documents provide further information about the system architecture, special Decimal64 cases, and application testing.