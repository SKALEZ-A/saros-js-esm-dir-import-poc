# [DLMM TS] getQuote Division-by-Zero on Tiny Input / Edge State

- **Severity**: Medium (runtime error blocks quoting)
- **Impact**: `getQuote` throws `Cannot divide by 0` for tiny amounts or specific bin states; integrators cannot obtain quotes or proceed to swaps.

## Affected SDK/Version
- `@saros-finance/dlmm-sdk` 1.4.0

## Environment
- OS: macOS
- Node: v23.11.0
- Mode: `MODE.MAINNET`

## Reproduction
1. Run this PoC:
   ```bash
   npm install
   npm start
   ```
2. It calls `getQuote` with `amount = 1n` and prints `getQuote error: Cannot divide by 0`.

Example output:
```
$ npm start
> ts-node --transpile-only index.ts
getQuote error: Cannot divide by 0
    at BigDecimal.divide (...)
    at LiquidityBookServices.getQuote (...)
```

- Files:
  - `package.json`
  - `index.ts`

## Expected
- Function returns a quote or a typed error (e.g., `InsufficientLiquidity`), not a runtime exception.

## Actual
- Runtime exception: `Cannot divide by 0`.

## Diagnostics (Root Cause)
- A denominator in the price/amount normalization path reaches zero for edge bin states or minimal amounts.

## Suggested Fixes
1. **Input/State guards**: check denominator and return a typed error if zero.
2. **Minimal precision normalization**: clamp tiny amounts to minimal precision thresholds or document minimum.
3. **Tests**: add unit tests for edge bins and tiny amounts; ensure the function returns an error type, not thrown exception.

## Verification Plan
- After fix, running this PoC should print a graceful error or a valid quote; no thrown exceptions.



## Submission Format (per listing)
- Target SDK: `@saros-finance/dlmm-sdk` must be submitted via a public link (e.g., GitHub repo or Gist) with the same details.
- Plan: Host this PoC as a public GitHub repo and share the link in the Superteam submission.
# saros-js-esm-dir-import-poc
