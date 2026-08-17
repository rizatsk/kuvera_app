# Kuvera - Financial Tracking & Market Analysis App

## Overview

Kuvera is a React Native application built with Expo and EAS that provides comprehensive financial management and market data tracking capabilities for Indonesian users.

## Core Features

### 1. Financial Tracking

- **Income/Expense Logging**: Record and categorize incoming and outgoing transactions with timestamps
- **Category Management**: Organize transactions by custom or predefined categories
- **Balance Overview**: Real-time financial summary with total balance display
- **Transaction History**: Searchable and filterable transaction records
- **Budget Limits**: Set and monitor spending limits per category

### 2. Financial Reporting

- **Report Generation**: Detailed analysis of spending patterns and trends
- **Period Analysis**:
  - Daily summaries
  - Monthly/yearly breakdowns
  - Comparative analysis across periods
- **Export Capabilities**: Generate PDF/CSV financial reports
- **Visual Charts**: Pie charts, bar graphs for expense distribution
- **Income vs Expense Analysis**: Monthly comparison metrics

### 3. Market Data Integration

- **IDX Stocks**: Real-time Indonesian stock exchange data with price tracking
- **Precious Metals**:
  - Pegadaian Gold prices (daily updates)
  - ANTAM Gold prices (live quotes)
- **Real-time Updates**: Push notifications for significant price changes
- **Watchlist**: Save favorite stocks and metals for quick access

## Environment & Tech Stack Specifications

- **Runtime:** Node.js v22.22.0 (LTS/Stable features focus)
- **Frontend/Mobile:** React v19.1.0, React Native v0.81.5, Expo v54.0.33, @react-navigation/native v7.1.8
- **State Management:** React-Redux v9.2.0, @reduxjs/toolkit v2.9.0
- **Validation Form:** yup v1.7.1, formik v2.4.6
- **Unit Test:** jest v29.7.0, jest-expo v54.0.17, @testing-library/react-native v13.3.3
- **Development Language:** typescript v5.9.2, ts-node v10.9.2, @types/jest v29.5.14, @types/react v19.1.0
- **Package Calendar:** react-native-calendars v1.1313.0

## Project Structure

```
kuvera-app/
├── android/                          # For setup android native
├── app/                              # Pages application
│   ├── (non-private)/                # Grouping pages non-private/no-have access-token
│   │   ├── login/
│   │   │   └── index.tsx
│   │   └── _layout.tsx
│   ├── (private)/                    # Groping pages use private/have access-token
│   │   ├── (tabs)/
│   │   ├── add-transaction/
│   │   ├── category/
│   │   ├── detail-transaction/
│   │   ├── edit/
│   │   ├── price-gold/
│   │   ├── privacy-polic/
│   │   ├── stock-idx/
│   │   ├── success/
│   │   ├── terms-of-service/
│   │   ├── update-profile/
│   │   └── _layout.tsx
│   ├── _layout.tsx
│   ├── modal.tsx
│   └── provider.tsx
├── assets/                           # Save data assets for images/videos/fonts
│   ├── fonts/
│   └── images/
├── components/                       # Components a needed for pages
│   ├── input/
│   │   ├── date-time-input/
│   │   ├── input-field/
│   │   ├── radio-input/
│   │   └── text-input/
│   ├── modal-bottom/
│   ├── page/
│   │   ├── add-transaction/
│   │   ├── detail-transction/
│   │   ├── edit-transaction/
│   │   ├── home/
│   │   ├── profile/
│   │   ├── stock-idx/
│   │   ├── transaction-by-category/
│   │   └── transactions/
├── constants/
│   ├── environment.ts
│   ├── theme.ts                      # Theme application for get color, and get fonts
│   └── variable.ts                   # Variable for filter list by weight gold antam
├── helper/                           # Function helper for components
│   ├── get-pictures/
│   ├── validation/
├── hooks/                            # Custom hooks for component/pages
├── ios/                              # For setup ios native
├── service/                          # API handlers
│   ├── account/
│   ├── auth/
│   ├── category-spend/
│   ├── gold-price/
│   ├── stock-idx/
│   └── transaction /
├── states/                          # State managements for redux
│   ├── auth-user/
│   ├── categories-spend/
│   ├── gold-antam-price/
│   ├── home-refresh/
│   ├── preload/
│   ├── stock-idx/
│   ├── transaction/
│   ├── visible-loading/
│   ├── action.ts                    # Action for reducer Redux
│   └── index.ts                     # Redux store
├── .gitignore
├── .env.development
├── app.config.js
├── eslint.config.js
├── jest.config.ts
├── package.json
└── tsconfig.json
```

## Coding Standards & Constraints

- **TypeScript Strict Mode:** Mandatory usage of strict mode; the use of `any` types is strictly forbidden[cite: 2].
- **Type Separation:** All `interfaces` and `types` must be separated from the logic or component file (e.g., into `types.ts` or `[filename].types.ts`).
- **Path Aliasing:** Use `@/` path aliases for all internal project mappings and imports.
- **Linting:** Code must adhere to **ESLint** configurations.
- **Naming Convention:** Variables and function names must be clear, descriptive, and meaningful.
- **Component Design:** Use **Functional Components** only and follow **Atomic Design Patterns**[cite: 2].
- **Performance:** Proactively use `useMemo` for expensive calculations and `useCallback` for stable function references[cite: 2].
- **Styling:** Use `StyleSheet` in React Native or integrated styling solutions consistent with Expo 54[cite: 2].

## State & Infrastructure

- **State Updates:** Ensure immutable state updates via RTK's built-in **Immer** integration[cite: 2].
- **Async Operations:** Handle loading and error states explicitly using **RTK ExtraReducers**[cite: 2].
- **Secrets & Environment:** All secret variables must be added to `.env.development`. Never hardcode sensitive data.

## AI Communication & Workflow Protocol

- **Ambiguity Check:** If a prompt is ambiguous or lacks detail, **you must ask for clarification** before writing any code.
- **Dependency Management:** You **must ask for permission** before adding new packages or changing existing versions in `package.json`.
- **Pre-Coding Breakdown:** Before providing code, you must output a plan:
  1. **Feature Objective:** Concise summary of the task[cite: 2].
  2. **Architecture Impact:** List of affected slices, components, or services[cite: 2].
  3. **Logic Flow:** Step-by-step breakdown of the logic[cite: 2].
  4. **File Map:** List of files to be created or modified[cite: 2].

## Output Format

- Provide code in modular, copy-pasteable blocks.
- Include brief comments for complex business logic.
- Always provide the specific `yarn add [package]` command if a new dependency is approved.

## 4. Testing Requirements (Unit Testing)

- **Coverage:** Every new component, helper function, or Redux Slice must include a corresponding unit test file (e.g., `[filename].test.tsx`).
- **Testing Standards:**
  - Test components for rendering correctness and user interactions (fireEvent).
  - Test Redux Slices for initial state and correct action handling.
  - Mock external dependencies and API calls; do not perform actual network requests in tests.
- **Location:** All test files must be placed inside the `/tests` root directory.
- **Folder Structure:** The directory structure inside `/tests` must mirror the source code structure.
  - _Example:_ If the component is at `src/components/common/Button.tsx`, the test must be at `tests/components/common/Button.test.tsx`.

## Git rules

After every changes or addition, always commit before continuing.
