
import { Config } from "../config/loadConfig";
import { round } from "./incomeTax";

export function calcMortgagePayment(principal: number, annualAPR: number, termYears: number) {
  if (principal <= 0) return { monthlyPayment: 0, annualPayment: 0 };
  if (annualAPR === 0) {
    const monthly = principal / (termYears * 12);
    return { monthlyPayment: round(monthly), annualPayment: round(monthly * 12) };
  }

  const r = annualAPR / 12;
  const n = termYears * 12;
  const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  
  return {
    monthlyPayment: round(monthly),
    annualPayment: round(monthly * 12)
  };
}
