# Test Cases

## 1. Overview

This document records the functional and integration test cases for the **Machine 5 — Decimal 64-Bit Floating-Point Machine**.

Testing covers the four primary application modules:

1. Decimal64 Converter
2. Rounding Methods Simulator
3. GRS Subtraction Simulator
4. GRS Division Simulator

The test cases include normal inputs, special values, edge cases, invalid inputs, and cross-module behavior.

Automated testing is performed using **Vitest**, while interface behavior is also verified manually through the integrated web application.

---

# Decimal64 Converter Test Cases

## Test Case TC-CONV-01

**Test Case ID:** TC-CONV-01  
**Module:** Decimal64 Converter  
**Purpose:** Verify conversion of a normal positive decimal value.  
**Input:** `123.45`  
**Input Format:** Decimal  
**Rounding Mode:** N/A  
**Expected Output:** Valid Decimal64 BID encoding with a 64-bit binary representation and exactly 16 hexadecimal digits.  
**Actual Output:** Valid Decimal64 BID representation displayed successfully.  
**Status:** PASS  
**Screenshot File:** `converter-normal-positive.png`  
**Remarks:** Normal finite positive-value conversion.

---

## Test Case TC-CONV-02

**Test Case ID:** TC-CONV-02  
**Module:** Decimal64 Converter  
**Purpose:** Verify conversion of a negative decimal value.  
**Input:** `-98.765`  
**Input Format:** Decimal  
**Rounding Mode:** N/A  
**Expected Output:** Valid negative Decimal64 BID representation with the sign field set appropriately.  
**Actual Output:** Negative value encoded and displayed successfully.  
**Status:** PASS  
**Screenshot File:** `converter-negative.png`  
**Remarks:** Confirms handling of negative finite values.

---

## Test Case TC-CONV-03

**Test Case ID:** TC-CONV-03  
**Module:** Decimal64 Converter  
**Purpose:** Verify preservation of negative zero.  
**Input:** `-0`  
**Input Format:** Decimal  
**Rounding Mode:** N/A  
**Expected Output:** Decimal64 zero representation with the negative sign preserved.  
**Actual Output:** Negative zero encoded successfully.  
**Status:** PASS  
**Screenshot File:** `converter-negative-zero.png`  
**Remarks:** Tests signed-zero support.

---

## Test Case TC-CONV-04

**Test Case ID:** TC-CONV-04  
**Module:** Decimal64 Converter  
**Purpose:** Verify scientific-notation input.  
**Input:** `1.2345e10`  
**Input Format:** Decimal / Scientific Notation  
**Rounding Mode:** N/A  
**Expected Output:** Valid Decimal64 BID encoding representing the supplied scientific-notation value.  
**Actual Output:** Scientific-notation input encoded successfully.  
**Status:** PASS  
**Screenshot File:** `converter-scientific.png`  
**Remarks:** Confirms parser support for exponent notation.

---

## Test Case TC-CONV-05

**Test Case ID:** TC-CONV-05  
**Module:** Decimal64 Converter  
**Purpose:** Verify positive infinity handling.  
**Input:** `Infinity`  
**Input Format:** Decimal Special Value  
**Rounding Mode:** N/A  
**Expected Output:** Decimal64 positive-infinity representation.  
**Actual Output:** Positive infinity classified and encoded successfully.  
**Status:** PASS  
**Screenshot File:** `converter-positive-infinity.png`  
**Remarks:** IEEE 754 special-value test.

---

## Test Case TC-CONV-06

**Test Case ID:** TC-CONV-06  
**Module:** Decimal64 Converter  
**Purpose:** Verify NaN handling.  
**Input:** `NaN`  
**Input Format:** Decimal Special Value  
**Rounding Mode:** N/A  
**Expected Output:** Decimal64 NaN representation.  
**Actual Output:** NaN classified and encoded successfully.  
**Status:** PASS  
**Screenshot File:** `converter-nan.png`  
**Remarks:** IEEE 754 undefined-value test.

---

# Rounding Simulator Test Cases

## Test Case TC-RND-01

**Test Case ID:** TC-RND-01  
**Module:** Rounding Methods Simulator  
**Purpose:** Verify decimal input and comparison of all four rounding methods.  
**Input:** Valid decimal value containing discarded digits  
**Input Format:** Decimal  
**Rounding Mode:** All four methods  
**Expected Output:** Chopping, Round Up, Round Down, and Round-to-Nearest Ties-to-Even results are displayed.  
**Actual Output:** All four rounding results and explanations displayed successfully.  
**Status:** PASS  
**Screenshot File:** `rounding-decimal-all-methods.png`  
**Remarks:** Confirms integrated display of all required rounding methods.

---

## Test Case TC-RND-02

**Test Case ID:** TC-RND-02  
**Module:** Rounding Methods Simulator  
**Purpose:** Verify binary input support.  
**Input:** Valid binary value containing a fractional portion  
**Input Format:** Binary  
**Rounding Mode:** All four methods  
**Expected Output:** Binary value is accepted and rounded according to each supported method.  
**Actual Output:** Binary rounding completed successfully.  
**Status:** PASS  
**Screenshot File:** `rounding-binary.png`  
**Remarks:** Confirms binary validation and rounding support.

---

## Test Case TC-RND-03

**Test Case ID:** TC-RND-03  
**Module:** Rounding Methods Simulator  
**Purpose:** Verify Round-to-Nearest, Ties-to-Even behavior for an exact halfway case.  
**Input:** Decimal value producing an exact halfway discarded portion  
**Input Format:** Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** The retained value is selected so that the final retained digit is even.  
**Actual Output:** Tie-to-even rule applied successfully.  
**Status:** PASS  
**Screenshot File:** `rounding-ties-to-even.png`  
**Remarks:** Important IEEE 754 rounding edge case.

---

## Test Case TC-RND-04

**Test Case ID:** TC-RND-04  
**Module:** Rounding Methods Simulator  
**Purpose:** Verify invalid target-digit handling.  
**Input:** Valid number with invalid target-digit value  
**Input Format:** Decimal  
**Rounding Mode:** All methods  
**Expected Output:** Calculation is rejected and an error message is displayed.  
**Actual Output:** Validation error displayed without application failure.  
**Status:** PASS  
**Screenshot File:** `rounding-invalid-target.png`  
**Remarks:** Input-validation test.

---

# GRS Subtraction Test Cases

### Test Case SUB-01

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Positive minus positive |
| Operand A | `12.5` |
| Format A | Decimal |
| Operand B | `3.2` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `9.3` |
| Expected Hexadecimal | `31A000000000005D` |
| Status | Pass |

### Test Case SUB-02

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Positive minus negative |
| Operand A | `12.5` |
| Format A | Decimal |
| Operand B | `-3.2` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `15.7` |
| Status | Pass |

### Test Case SUB-03

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Negative minus positive |
| Operand A | `-12.5` |
| Format A | Decimal |
| Operand B | `3.2` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `-15.7` |
| Status | Pass |

### Test Case SUB-04

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Negative minus negative |
| Operand A | `-12.5` |
| Format A | Decimal |
| Operand B | `-3.2` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `-9.3` |
| Status | Pass |

### Test Case SUB-05

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Equal operands and exact cancellation |
| Operand A | `5.5` |
| Format A | Decimal |
| Operand B | `5.5` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `0` |
| Status | Pass |

### Test Case SUB-06

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Different exponents |
| Operand A | `1000` |
| Format A | Decimal |
| Operand B | `0.001` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `999.999` |
| Status | Pass |

### Test Case SUB-07

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Nonzero Guard, Round, and Sticky digits |
| Operand A | `1234567890123456` |
| Format A | Decimal |
| Operand B | `0.0000000000000001` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Guard | `9` |
| Expected Round | `9` |
| Expected Sticky | `1` |
| Expected Decimal | `1234567890123456` |
| Expected Hexadecimal | `31C462D53C8ABAC0` |
| Status | Pass |

### Test Case SUB-08

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Cancellation requiring normalization |
| Operand A | `1.0001` |
| Format A | Decimal |
| Operand B | `1.0000` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `0.0001` |
| Status | Pass |

### Test Case SUB-09

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Both operands in hexadecimal |
| Operand A | `31A000000000007D` (Decimal64 hexadecimal for `12.5`) |
| Format A | IEEE Decimal64 Hexadecimal |
| Operand B | `31A0000000000020` (Decimal64 hexadecimal for `3.2`) |
| Format B | IEEE Decimal64 Hexadecimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `9.3` |
| Status | Pass |

### Test Case SUB-10

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Infinity minus Infinity |
| Operand A | `Infinity` |
| Format A | Decimal |
| Operand B | `Infinity` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Result | `NaN` |
| Status | Pass |

### Test Case SUB-11

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | NaN input |
| Operand A | `NaN` |
| Format A | Decimal |
| Operand B | `5` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Result | `NaN` |
| Status | Pass |

### Test Case SUB-12

| Field | Value |
|---|---|
| Module | GRS Subtraction |
| Purpose | Positive and negative zero |
| Operand A | `0` |
| Format A | Decimal |
| Operand B | `-0` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `0` |
| Status | Pass |

---

# GRS Division Test Cases

## Test Case TC-DIV-01

**Test Case ID:** TC-DIV-01  
**Module:** GRS Division Simulator  
**Purpose:** Verify normal division using decimal operands.  
**Input:** Two valid finite decimal operands  
**Input Format:** Decimal / Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Valid quotient with GRS information and decimal, binary, and hexadecimal Decimal64 output.  
**Actual Output:** Division completed successfully.  
**Status:** PASS  
**Screenshot File:** `division-decimal.png`  
**Remarks:** Normal division workflow.

---

## Test Case TC-DIV-02

**Test Case ID:** TC-DIV-02  
**Module:** GRS Division Simulator  
**Purpose:** Verify hexadecimal operand support.  
**Input:** Valid Decimal64 hexadecimal operands  
**Input Format:** Hexadecimal / Hexadecimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Operands are decoded and division is completed successfully.  
**Actual Output:** Hexadecimal operands processed successfully.  
**Status:** PASS  
**Screenshot File:** `division-hexadecimal.png`  
**Remarks:** Confirms decoder and division integration.

---

## Test Case TC-DIV-03

**Test Case ID:** TC-DIV-03  
**Module:** GRS Division Simulator  
**Purpose:** Verify division by zero.  
**Input:** `5 ÷ 0`  
**Input Format:** Decimal / Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Positive infinity.  
**Actual Output:** Division-by-zero special case detected and infinity returned.  
**Status:** PASS  
**Screenshot File:** `division-by-zero.png`  
**Remarks:** Required arithmetic special case.

---

## Test Case TC-DIV-04

**Test Case ID:** TC-DIV-04  
**Module:** GRS Division Simulator  
**Purpose:** Verify zero divided by zero.  
**Input:** `0 ÷ 0`  
**Input Format:** Decimal / Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** NaN.  
**Actual Output:** NaN returned successfully.  
**Status:** PASS  
**Screenshot File:** `division-zero-by-zero.png`  
**Remarks:** Undefined arithmetic special case.

---

## Test Case TC-DIV-05

**Test Case ID:** TC-DIV-05  
**Module:** GRS Division Simulator  
**Purpose:** Verify infinity-related division.  
**Input:** `Infinity ÷ Infinity`  
**Input Format:** Decimal Special Values  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** NaN.  
**Actual Output:** Infinity-related special case detected successfully.  
**Status:** PASS  
**Screenshot File:** `division-infinity.png`  
**Remarks:** IEEE 754 special arithmetic case.

---

## Test Case TC-DIV-06

**Test Case ID:** TC-DIV-06  
**Module:** GRS Division Simulator  
**Purpose:** Verify GRS generation for a quotient requiring discarded digits.  
**Input:** Finite operands producing a non-terminating or precision-limited quotient  
**Input Format:** Decimal / Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Guard, Round, and Sticky information is generated and used in the rounding decision.  
**Actual Output:** GRS values and rounding explanation displayed successfully.  
**Status:** PASS  
**Screenshot File:** `division-grs-rounding.png`  
**Remarks:** Verifies the primary GRS division workflow.

---

# Integration Test Cases

## Test Case TC-INT-01

**Test Case ID:** TC-INT-01  
**Module:** Application Integration  
**Purpose:** Verify Decimal64 encoder and decoder compatibility.  
**Input:** Valid decimal value  
**Input Format:** Decimal  
**Rounding Mode:** N/A  
**Expected Output:** Encoded Decimal64 value can be decoded consistently.  
**Actual Output:** Encoder-decoder integration completed successfully.  
**Status:** PASS  
**Screenshot File:** N/A — automated test  
**Remarks:** Implemented in `tests/integration.test.js`.

---

## Test Case TC-INT-02

**Test Case ID:** TC-INT-02  
**Module:** Application Integration  
**Purpose:** Verify integration between rounding and Decimal64 encoding.  
**Input:** Valid decimal rounding case  
**Input Format:** Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Rounded result can be successfully encoded as Decimal64.  
**Actual Output:** Integration test passed.  
**Status:** PASS  
**Screenshot File:** N/A — automated test  
**Remarks:** Implemented in `tests/integration.test.js`.

---

## Test Case TC-INT-03

**Test Case ID:** TC-INT-03  
**Module:** Application Integration  
**Purpose:** Verify integration between subtraction and Decimal64 encoding.  
**Input:** Two valid decimal operands  
**Input Format:** Decimal / Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Subtraction produces a valid Decimal64 result.  
**Actual Output:** Integration test passed.  
**Status:** PASS  
**Screenshot File:** N/A — automated test  
**Remarks:** Implemented in `tests/integration.test.js`.

---

## Test Case TC-INT-04

**Test Case ID:** TC-INT-04  
**Module:** Application Integration  
**Purpose:** Verify integration between division and Decimal64 encoding.  
**Input:** Two valid decimal operands  
**Input Format:** Decimal / Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Division produces a valid Decimal64 result.  
**Actual Output:** Integration test passed.  
**Status:** PASS  
**Screenshot File:** N/A — automated test  
**Remarks:** Implemented in `tests/integration.test.js`.

---

## Test Case TC-INT-05

**Test Case ID:** TC-INT-05  
**Module:** Application Integration  
**Purpose:** Verify controlled error handling across integrated modules.  
**Input:** Invalid subtraction operand  
**Input Format:** Decimal  
**Rounding Mode:** Round-to-Nearest, Ties-to-Even  
**Expected Output:** Controlled error object/message instead of an application crash.  
**Actual Output:** Invalid input handled successfully.  
**Status:** PASS  
**Screenshot File:** N/A — automated test  
**Remarks:** Confirms integrated validation and error handling.

---

# Interface and Build Verification

## Test Case TC-UI-01

**Test Case ID:** TC-UI-01  
**Module:** Integrated User Interface  
**Purpose:** Verify desktop usability.  
**Input:** N/A  
**Input Format:** N/A  
**Rounding Mode:** N/A  
**Expected Output:** All four modules remain readable, accessible, and functional on a desktop-sized browser window.  
**Actual Output:** Desktop interface verified successfully.  
**Status:** PASS  
**Screenshot File:** `deployment-homepage.png`  
**Remarks:** Manual interface verification.

---

## Test Case TC-UI-02

**Test Case ID:** TC-UI-02  
**Module:** Integrated User Interface  
**Purpose:** Verify mobile responsiveness.  
**Input:** N/A  
**Input Format:** N/A  
**Rounding Mode:** N/A  
**Expected Output:** Navigation, inputs, buttons, outputs, and steps remain readable and usable at mobile width.  
**Actual Output:** Mobile interface verified successfully.  
**Status:** PASS  
**Screenshot File:** `deployment-mobile-view.png`  
**Remarks:** Manual responsive-design verification.

---

## Test Case TC-UI-03

**Test Case ID:** TC-UI-03  
**Module:** Integrated User Interface  
**Purpose:** Verify Light/Dark theme switching.  
**Input:** N/A  
**Input Format:** N/A  
**Rounding Mode:** N/A  
**Expected Output:** Theme changes successfully and the selected theme persists using browser storage.  
**Actual Output:** Light/Dark theme switching and persistence verified successfully.  
**Status:** PASS  
**Screenshot File:** `theme-switching.png`  
**Remarks:** Manual interface verification.

---

## Test Case TC-BUILD-01

**Test Case ID:** TC-BUILD-01  
**Module:** Complete Application  
**Purpose:** Verify production-build compatibility.  
**Input:** `npm run build`  
**Input Format:** Command  
**Rounding Mode:** N/A  
**Expected Output:** Vite production build completes without errors.  
**Actual Output:** Production build completed successfully.  
**Status:** PASS  
**Screenshot File:** `production-build.png`  
**Remarks:** Required final integration check.

---

## Test Case TC-LINT-01

**Test Case ID:** TC-LINT-01  
**Module:** Complete Application  
**Purpose:** Verify code-quality checks.  
**Input:** `npm run lint`  
**Input Format:** Command  
**Rounding Mode:** N/A  
**Expected Output:** ESLint completes with zero errors.  
**Actual Output:** ESLint completed with zero errors.  
**Status:** PASS  
**Screenshot File:** `eslint-pass.png`  
**Remarks:** Static code-quality verification.

---

# Test Summary

| Test Area | Result |
|---|---|
| Decimal64 Converter | PASS |
| Decimal64 Encoder | PASS |
| Decimal64 Decoder | PASS |
| Decimal64 Special Cases | PASS |
| Rounding Methods | PASS |
| GRS Subtraction | PASS |
| GRS Division | PASS |
| Cross-Module Integration | PASS |
| Invalid Input Handling | PASS |
| Desktop Interface | PASS |
| Mobile Interface | PASS |
| Light/Dark Theme | PASS |
| ESLint | PASS |
| Production Build | PASS |

The completed testing process verifies the major functional, arithmetic, interface, integration, and production-build requirements of the Decimal 64-Bit Floating-Point Machine.