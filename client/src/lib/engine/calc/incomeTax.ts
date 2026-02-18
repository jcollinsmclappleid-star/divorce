
import { Config } from "../config/loadConfig";

export function round(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

export function calcPersonalAllowance(grossIncome: number, config: Config): number {
  const paConfig = config.taxModel.incomeTax.personalAllowance;
  if (!paConfig.taper.enabled || grossIncome <= paConfig.taper.startsAt) {
    return paConfig.amount;
  }
  
  const excess = Math.max(0, grossIncome - paConfig.taper.startsAt);
  const reduction = Math.floor(excess / 2) * paConfig.taper.reductionPer2Over;
  return Math.max(0, paConfig.amount - reduction);
}

export function calcIncomeTax(grossIncome: number, config: Config): number {
  const pa = calcPersonalAllowance(grossIncome, config);
  const taxableIncome = Math.max(0, grossIncome - pa);
  
  let tax = 0;
  const bands = config.taxModel.incomeTax.bands;
  
  for (const band of bands) {
    const from = band.from;
    const to = band.to === null ? Infinity : band.to;
    
    if (taxableIncome > from) {
      const taxableInBand = Math.min(taxableIncome, to) - from;
      tax += taxableInBand * band.rate;
    }
  }
  
  return round(tax);
}
