# Rounding Methods Analysis

## 1. Objective

The **Rounding Methods Simulator** demonstrates the four IEEE 754 rounding methods required for **Machine 5: Decimal 64-Bit Floating-Point Machine**.

The module allows users to:

- Accept decimal or binary inputs.
- Validate user input and target precision.
- Separate retained and discarded digits or bits.
- Determine the **Guard, Round, and Sticky (GRS)** digits or bits.
- Apply the four rounding methods.

This simulator helps users understand how rounding decisions are made before decimal floating-point arithmetic operations such as subtraction and division.

---

## 2. Input Requirements

The simulator accepts the following inputs:

### Number

The input may be either a **decimal** or **binary** number.

**Decimal examples**

- `12.34567`
- `-8.125`
- `0.00555`
- `999.995`

**Binary examples**

- `101.1011`
- `-110.011`
- `0.00101`

Only binary digits (`0` and `1`) are accepted for binary input.

### Input Format

Users select one of the following formats:

- Decimal
- Binary

### Target Precision

The target precision specifies how many decimal digits or binary bits should be retained.

The value must:

- be a positive integer;
- be greater than zero; and
- be within the supported application limit. (64)

---

## 3. Output Requirements

For each rounding method, the simulator displays:

- Original value
- Retained digits or bits
- Discarded digits or bits
- Sign
- Guard digit or bit
- Round digit or bit
- Sticky digit or bit
- Rounding decision
- Rounded result
- Explanation

A comparison table summarizes the results of all four rounding methods.

---

## 4. Rounding Methods

| Method | Description |
|---------|-------------|
| **Chopping (Truncation)** | Removes all digits after the selected precision without changing the retained portion. |
| **Round-Up** | Rounds toward positive infinity. Positive values increase if discarded digits are nonzero, while negative values remain chopped. |
| **Round-Down** | Rounds toward negative infinity. Positive values remain chopped, while negative values increase in magnitude if discarded digits are nonzero. |
| **Round-to-Nearest (Ties-to-Even)** | Selects the nearest representable value. Halfway cases are rounded so the last retained digit becomes even, reducing rounding bias. |

### Example

| Input | Target Precision | Chopping | Round-Up | Round-Down | Nearest-Even |
|-------|-----------------:|---------:|---------:|-----------:|-------------:|
| 12.34567 | 3 decimal places | 12.345 | 12.346 | 12.345 | 12.346 |

---

## 5. Guard, Round, and Sticky (GRS)

Before applying a rounding method, the simulator identifies the **Guard**, **Round**, and **Sticky (GRS)** digits or bits.

### Decimal Example

| Item | Value |
|------|-------|
| Input | 12.3456789 |
| Target Precision | 3 decimal places |
| Retained Digits | 345 |
| Discarded Digits | 6789 |
| Guard Digit | 6 |
| Round Digit | 7 |
| Sticky Indicator | 1 |

For decimal values, the Sticky indicator is represented as a Boolean value. It becomes `1` if any non-zero discarded digits remain after the Round digit; otherwise, it is `0`.

### Binary Example

| Item | Value |
|------|-------|
| Input | 101.101101 |
| Target Precision | 4 fractional bits |
| Retained Bits | 1011 |
| Guard Bit | 0 |
| Round Bit | 1 |
| Sticky Bit | 0 |

For binary values, the simulator follows the IEEE 754 Guard, Round, and Sticky bit concept.

---

## 6. Algorithm

The simulator performs the following steps:

1. Validate the input number and target precision.
2. Separate the retained and discarded digits or bits.
3. Determine the Guard, Round, and Sticky (GRS) information.
4. Apply each of the four rounding methods.
5. Display the rounded results together with the explanation and comparison table.

---

## 7. Step-by-Step Example

### Input

| Parameter | Value |
|-----------|-------|
| Number | 12.34567 |
| Format | Decimal |
| Target Precision | 3 decimal places |

### Intermediate Values

| Item | Value |
|------|-------|
| Retained | 12.345 |
| Discarded | 67 |
| Guard | 6 |
| Round | 7 |
| Sticky | 0 |

### Results

| Method | Rounded Result |
|---------|---------------:|
| Chopping | 12.345 |
| Round-Up | 12.346 |
| Round-Down | 12.345 |
| Round-to-Nearest (Ties-to-Even) | 12.346 |

---

## 8. Test Cases

Automated testing was performed using **Vitest**.

The following scenarios were tested:

- Positive decimal values
- Negative decimal values
- Positive binary values
- Negative binary values
- Less-than-halfway cases
- Greater-than-halfway cases
- Tie-to-even cases
- Tie-to-odd cases
- Carry after rounding
- Zero
- Invalid decimal input
- Invalid binary input
- Invalid target precision

Manual browser testing was also performed to verify the graphical interface and displayed results.

---

## 9. Special Cases

The simulator correctly handles:

- Positive numbers
- Negative numbers
- Zero
- Exact halfway values
- Carry generated after rounding
- Invalid decimal input
- Invalid binary input
- Invalid target precision

Appropriate error messages are displayed whenever invalid input is detected.

---

## 10. Known Limitations

This module demonstrates the behavior of the four rounding methods only.


