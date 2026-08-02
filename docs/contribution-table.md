# Contribution Table

## 1. Overview

The **Machine 5 — Decimal 64-Bit Floating-Point Machine** was developed through a modular group structure.

The application was divided into four primary computational modules, with a fifth member responsible for application integration, presentation, testing coordination, documentation, deployment, and the final video walkthrough.

This structure allowed the computational components to be developed independently before being combined into the final React/Vite application.

---

## 2. Group Contribution Summary

| Member | Primary Responsibility | Main Module / Area |
|---|---|---|
| Member 1 - ROGACION, Rob Nigel | Decimal64 conversion and representation | Decimal64 Converter |
| Member 2 - RODRIGO, Betina Heart | Decimal and binary rounding methods | Rounding Simulator |
| Member 3 - LI, Bowen | Decimal64 subtraction using GRS | GRS Subtraction Simulator |
| Member 4 - CO, Caitlyn Hope | Decimal64 division using GRS | GRS Division Simulator |
| Member 5 - DE LA CALZADA, Wanda Jude | GUI, integration, testing coordination, documentation, deployment, and video | Final Integrated Application |

---

# 3. Member 1 — Decimal64 Converter

## Primary Responsibility

Member 1 was assigned the implementation of the **Decimal64 Converter** and the core Decimal64 representation functionality required by the application.

## Main Areas of Contribution

The assigned module covers:

- parsing decimal input;
- Decimal64 encoding;
- Decimal64 decoding and verification;
- Binary Integer Decimal (BID) representation;
- Decimal64 binary-field construction;
- hexadecimal representation;
- handling finite Decimal64 values;
- handling signed zero;
- handling Infinity and NaN;
- handling exponent and coefficient information; and
- converter-related automated testing.

## Integration with Final Application

Member 1's Decimal64 functionality is used directly by the Converter and is also shared by other modules that require Decimal64 encoding or decoding.

The encoder and decoder therefore serve as core components of the integrated system.

---

# 4. Member 2 — Rounding Methods

## Primary Responsibility

Member 2 was assigned the implementation of the **Rounding Methods Simulator**.

## Main Areas of Contribution

The assigned module covers the four required rounding methods:

1. Chopping
2. Round Up
3. Round Down
4. Round-to-Nearest, Ties-to-Even

The module also covers:

- decimal rounding;
- binary rounding;
- target-digit processing;
- retained and discarded digit processing;
- rounding decisions;
- rounding explanations; and
- rounding-related automated testing.

## Integration with Final Application

The Rounding Simulator is integrated as one of the four main application sections.

Its rounding functionality is also conceptually shared with the GRS arithmetic modules, where discarded information is used to determine the final rounded result.

---

# 5. Member 3 — GRS Subtraction

## Primary Responsibility

Member 3 was assigned the implementation of the **GRS Subtraction Simulator**.

## Main Areas of Contribution

The assigned module covers:

- Decimal64 subtraction;
- decimal operand support;
- hexadecimal Decimal64 operand support;
- mixed-format operand support;
- exponent comparison;
- exponent alignment;
- coefficient subtraction;
- normalization;
- Guard, Round, and Sticky processing;
- application of rounding behavior;
- special subtraction conditions;
- final Decimal64 result generation; and
- subtraction-related automated testing.

## Integration with Final Application

The Subtraction Simulator is integrated into the shared application interface and uses common Decimal64 encoding, decoding, validation, result-display, and step-display functionality where applicable.

---

# 6. Member 4 — GRS Division

## Primary Responsibility

Member 4 was assigned the implementation of the **GRS Division Simulator**.

## Main Areas of Contribution

The assigned module covers:

- Decimal64 division;
- decimal operand support;
- hexadecimal Decimal64 operand support;
- coefficient division;
- result-sign calculation;
- exponent calculation;
- discarded-digit processing;
- Guard, Round, and Sticky generation;
- rounding decisions;
- normalization;
- overflow handling;
- division-related special cases;
- final Decimal64 result generation; and
- division-related automated testing.

Special arithmetic conditions include cases involving:

- zero;
- Infinity;
- NaN; and
- division by zero.

## Integration with Final Application

The Division Simulator is integrated as one of the four primary application modules and uses the shared Decimal64 representation functionality to produce its final binary and hexadecimal results.

---

# 7. Member 5 — Integration and Presentation Lead

## Primary Responsibility

Member 5 serves as the **Integration and Presentation Lead**.

The primary responsibility is to combine the computational modules created by Members 1–4 into one complete, consistent, tested, documented, deployable, and presentable web application.

---

## 7.1 Main Application Integration

Member 5 is responsible for integrating the four main modules into the final React application:

- Decimal64 Converter;
- Rounding Methods Simulator;
- GRS Subtraction Simulator; and
- GRS Division Simulator.

The integrated application provides a common navigation system that allows users to move between the four modules without leaving the application.

---

## 7.2 Shared User Interface

Member 5 created and/or integrated shared interface functionality including:

- main application layout;
- module navigation;
- reusable step-by-step output;
- reusable result presentation;
- reusable error presentation;
- common input validation;
- shared constants and labels;
- application-wide styling;
- responsive layout behavior; and
- Light/Dark theme support.

Relevant files include:

```text
src/App.jsx
src/components/Navigation.jsx
src/components/StepDisplay.jsx
src/components/ResultDisplay.jsx
src/components/ErrorMessage.jsx
src/utils/inputValidator.js
src/utils/constants.js
src/styles/global.css
src/styles/converter.css
src/styles/rounding.css
src/styles/arithmetic.css
```

---

## 7.3 Responsive Design

Member 5 coordinated the final responsive behavior of the application.

The integrated interface was manually checked using:

- desktop-sized browser layouts; and
- mobile-sized browser layouts.

The final interface maintains usable navigation, input controls, buttons, result cards, Decimal64 output, and step-by-step information when the browser width is reduced.

---

## 7.4 Theme Integration

Member 5 integrated application-wide Light and Dark themes.

The selected theme is stored using browser local storage so the user's preference can persist between sessions.

---

## 7.5 Integration Testing

Member 5 created:

```text
tests/integration.test.js
```

The integration suite verifies communication between major application components.

Integration testing covers:

- Decimal64 encoder and decoder compatibility;
- rounding and Decimal64 encoding;
- subtraction and Decimal64 encoding;
- division and Decimal64 encoding; and
- controlled invalid-input handling.

The integration tests complement the module-specific unit tests created for the individual computational components.

---

## 7.6 Testing Coordination and Code Quality

Member 5 coordinated final application-level verification.

The final project is checked using:

```bash
npm run test:run
```

for automated testing,

```bash
npm run lint
```

for static code-quality checking, and:

```bash
npm run build
```

for production-build verification.

The final integrated application is expected to complete the automated test suite, ESLint validation, and Vite production build successfully.

---

## 7.7 Documentation

Member 5 is responsible for organizing and completing the final project documentation.

Documentation includes:

```text
README.md
docs/system-overview.md
docs/special-cases.md
docs/test-cases.md
docs/user-manual.md
docs/video-script.md
docs/contribution-table.md
video/video-outline.md
video/youtube-link.txt
```

The documentation covers:

- overall system architecture;
- Decimal64 special cases;
- functional and integration test cases;
- application usage;
- individual member contributions;
- installation and execution;
- deployment;
- final video presentation; and
- project references.

---

## 7.8 Deployment

Member 5 is responsible for deploying the final integrated application using a compatible web-hosting platform.

Deployment responsibilities include:

- producing the production build;
- deploying the application;
- testing the live website;
- testing all four modules after deployment;
- checking the website using another browser or device;
- verifying page refresh behavior;
- saving the required deployment screenshots;
- adding the live website link to the README; and
- adding the live website link to the GitHub repository's Website field.

---

## 7.9 Deployment Evidence

The required deployment evidence is stored under:

```text
screenshots/deployment/
```

Required screenshots include:

```text
deployment-homepage.png
deployment-decimal64-converter.png
deployment-rounding-module.png
deployment-subtraction-module.png
deployment-division-module.png
deployment-mobile-view.png
github-repository-homepage.png
github-about-website-link.png
```

---

## 7.10 Video Walkthrough

Member 5 coordinates the final **5–8 minute video walkthrough**.

The walkthrough demonstrates:

- the deployed website;
- Decimal64 conversion;
- formatted binary output;
- hexadecimal output;
- all four rounding methods;
- GRS subtraction;
- GRS division;
- normal cases;
- special cases;
- edge cases;
- invalid-input handling;
- the GitHub repository; and
- the deployment link.

The final video is uploaded to YouTube as either **Public** or **Unlisted**.

The verified YouTube link is then added to:

```text
README.md
video/youtube-link.txt
```

---

# 8. Shared Integration

Although each member has a primary assigned responsibility, the final application depends on interaction between the modules.

Examples of shared functionality include:

- arithmetic modules using Decimal64 encoding and decoding;
- GRS concepts appearing in rounding and arithmetic operations;
- shared validation between interface components;
- shared presentation of results and calculation steps; and
- integration tests verifying communication between independently developed modules.

The final system therefore represents the combined work of all five assigned areas rather than four isolated calculators.

---

# 9. Final Contribution Summary

| Development Area | Primary Member |
|---|---|
| Decimal64 Converter | Member 1 |
| Decimal64 Encoder / Decoder | Member 1 |
| Rounding Methods | Member 2 |
| GRS Subtraction | Member 3 |
| GRS Division | Member 4 |
| Main Application Integration | Member 5 |
| Navigation and Shared GUI | Member 5 |
| Responsive Design | Member 5 |
| Integration Testing | Member 5 |
| Testing Coordination | Member 5 |
| Final Documentation | Member 5 |
| Deployment | Member 5 |
| Deployment Evidence | Member 5 |
| Video Walkthrough Coordination | Member 5 |

---

# 10. Collaboration and Version Control

The project uses **Git and GitHub** for collaborative development and version control.

Individual modules are developed separately before being integrated into the final application.

Feature branches and commits allow changes to be reviewed and tested before they are incorporated into the final project.

The final repository contains the source code, automated tests, documentation, deployment information, and presentation materials required for submission.