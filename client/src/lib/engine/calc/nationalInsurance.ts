
import { Config } from "../config/loadConfig";
import { round } from "./incomeTax";

export function calcNationalInsurance(grossIncome: number, config: Config): number {
  const niConfig = config.taxModel.nationalInsurance.employeeClass1;
  let ni = 0;
  
  for (const band of niConfig.bands) {
    const from = band.from;
    const to = band.to === null ? Infinity : band.to;
    
    if (grossIncome > from) {
      const incomeInBand = Math.min(grossIncome, to) - from;
      ni += incomeInBand * band.rate;
    }
  }
  
  return round(ni);
}
