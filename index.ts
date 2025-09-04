import { LiquidityBookServices, MODE } from '@saros-finance/dlmm-sdk';
import { PublicKey } from '@solana/web3.js';

const POOL = new PublicKey('EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD');
const BASE = new PublicKey('C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9');
const QUOTE = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

async function main() {
  const svc = new LiquidityBookServices({ mode: MODE.MAINNET });
  const amount = BigInt(1);
  const slippage = 0.5;
  try {
    const quote = await svc.getQuote({
      amount,
      isExactInput: true,
      swapForY: true,
      pair: POOL,
      tokenBase: BASE,
      tokenQuote: QUOTE,
      tokenBaseDecimal: 6,
      tokenQuoteDecimal: 6,
      slippage
    });
    console.log('Quote:', quote);
  } catch (e) {
    console.error('getQuote error:', (e as Error).message);
  }
}

main().catch((e) => {
  console.error('DLMM repro error:', e);
  process.exit(1);
});
