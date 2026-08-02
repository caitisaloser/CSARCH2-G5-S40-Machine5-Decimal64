# Test Cases

## GRS Subtraction Module

### Test Case SUB-01

| Field | Value |
|------|-------|
| GRS Subtraction |
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
|------|-------|
| GRS Subtraction |
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
|------|-------|
| GRS Subtraction |
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
|------|-------|
| GRS Subtraction |
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
|------|-------|
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
|------|-------|
| Module | GRS Subtraction |
| Purpose | Different exponents |
| Operand A | `1000` |
| Format A | Decimal |
| Operand B | `0.001` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `999.999` |
| Status | Pass|


### Test Case SUB-07

| Field | Value |
|------|-------|
| GRS Subtraction |
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
|------|-------|
| GRS Subtraction |
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
|------|-------|
| GRS Subtraction |
| Purpose | Both operands in hexadecimal |
| Operand A | Valid decimal64 hexadecimal for `12.5(31A000000000007D) |
| Format A | IEEE Decimal64 Hexadecimal |
| Operand B | Valid decimal64 hexadecimal for `3.2`(31A0000000000020) |
| Format B | IEEE Decimal64 Hexadecimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `9.3` |
| Status | Pass |




### Test Case SUB-10

| Field | Value |
|------|-------|
| GRS Subtraction |
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
|------|-------|
| GRS Subtraction |
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
|------|-------|
| GRS Subtraction |
| Purpose | Positive and negative zero |
| Operand A | `0` |
| Format A | Decimal |
| Operand B | `-0` |
| Format B | Decimal |
| Rounding Mode | Round-to-Nearest, Ties-to-Even |
| Expected Decimal | `0` |
| Status | Pass |