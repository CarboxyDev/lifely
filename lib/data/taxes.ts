import type { TaxBracket, TaxDeduction, TaxRecord } from '../types';

// US-style progressive tax brackets
export const incomeTaxBrackets: TaxBracket[] = [
  { minIncome: 0, maxIncome: 10000, rate: 10 },
  { minIncome: 10001, maxIncome: 40000, rate: 12 },
  { minIncome: 40001, maxIncome: 85000, rate: 22 },
  { minIncome: 85001, maxIncome: 160000, rate: 24 },
  { minIncome: 160001, maxIncome: 200000, rate: 32 },
  { minIncome: 200001, maxIncome: 500000, rate: 35 },
  { minIncome: 500001, maxIncome: Infinity, rate: 37 },
];

// Calculate income tax using progressive brackets
export function calculateIncomeTax(income: number, deductions: TaxDeduction[]): {
  taxableIncome: number;
  taxOwed: number;
  effectiveRate: number;
} {
  // Calculate total deductions
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  // Standard deduction (simplified)
  const standardDeduction = 12000;
  const allDeductions = Math.max(standardDeduction, totalDeductions);

  // Taxable income
  const taxableIncome = Math.max(0, income - allDeductions);

  // Calculate tax using progressive brackets
  let taxOwed = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of incomeTaxBrackets) {
    if (remainingIncome <= 0) break;

    const bracketWidth = bracket.maxIncome - bracket.minIncome;
    const incomeInBracket = Math.min(remainingIncome, bracketWidth);

    taxOwed += (incomeInBracket * bracket.rate) / 100;
    remainingIncome -= incomeInBracket;
  }

  const effectiveRate = income > 0 ? (taxOwed / income) * 100 : 0;

  return {
    taxableIncome: Math.round(taxableIncome),
    taxOwed: Math.round(taxOwed),
    effectiveRate: Math.round(effectiveRate * 100) / 100,
  };
}

// Calculate property tax (1-2% of property value annually)
export function calculatePropertyTax(propertyValue: number): number {
  const propertyTaxRate = 1.5; // 1.5% annually
  return Math.round((propertyValue * propertyTaxRate) / 100);
}

// Calculate capital gains tax
export function calculateCapitalGainsTax(
  totalInvested: number,
  currentValue: number,
  holdingMonths: number
): number {
  const gains = currentValue - totalInvested;

  if (gains <= 0) return 0; // No tax on losses

  // Long-term (held > 12 months) vs short-term capital gains
  const isLongTerm = holdingMonths > 12;
  const taxRate = isLongTerm ? 15 : 22; // 15% long-term, 22% short-term

  return Math.round((gains * taxRate) / 100);
}

// Generate available deductions based on player state
export function generateAvailableDeductions(
  studentLoanBalance: number,
  mortgagePayment: number,
  retirementContribution: number
): TaxDeduction[] {
  const deductions: TaxDeduction[] = [];

  // Student loan interest deduction (max $2500)
  if (studentLoanBalance > 0) {
    const studentLoanInterest = Math.min(2500, studentLoanBalance * 0.05);
    deductions.push({
      type: 'student-loan',
      amount: Math.round(studentLoanInterest),
      description: 'Student loan interest deduction',
    });
  }

  // Mortgage interest deduction
  if (mortgagePayment > 0) {
    const mortgageInterest = mortgagePayment * 12 * 0.7; // ~70% of payment is interest
    deductions.push({
      type: 'mortgage',
      amount: Math.round(mortgageInterest),
      description: 'Mortgage interest deduction',
    });
  }

  // Retirement contribution deduction
  if (retirementContribution > 0) {
    const annualContribution = retirementContribution * 12;
    const deductibleAmount = Math.min(annualContribution, 6000); // IRA contribution limit
    deductions.push({
      type: 'retirement',
      amount: Math.round(deductibleAmount),
      description: 'Retirement contribution deduction',
    });
  }

  return deductions;
}

// Calculate late filing penalty
export function calculateLateFilingPenalty(taxOwed: number, monthsLate: number): number {
  // 5% per month up to 25% maximum
  const penaltyRate = Math.min(25, monthsLate * 5);
  return Math.round((taxOwed * penaltyRate) / 100);
}

// Estimate quarterly tax withholding from salary
export function calculateTaxWithholding(monthlySalary: number): number {
  const annualSalary = monthlySalary * 12;
  const estimatedTax = calculateIncomeTax(annualSalary, []);
  const monthlyWithholding = estimatedTax.taxOwed / 12;
  return Math.round(monthlyWithholding);
}

// File taxes and generate tax record
export function fileTaxes(
  year: number,
  currentAge: number,
  annualIncome: number,
  withheld: number,
  deductions: TaxDeduction[]
): TaxRecord {
  const taxCalc = calculateIncomeTax(annualIncome, deductions);
  const taxPaid = withheld;
  const taxOwed = taxCalc.taxOwed;

  let refund = 0;
  let additionalOwed = 0;

  if (taxPaid > taxOwed) {
    refund = taxPaid - taxOwed;
  } else {
    additionalOwed = taxOwed - taxPaid;
  }

  return {
    id: `${Date.now()}-${Math.random()}`,
    year,
    filedAt: currentAge,
    incomeReported: annualIncome,
    taxOwed,
    taxPaid: taxPaid + additionalOwed,
    refund,
    penalty: 0, // No penalty if filed on time
    deductions,
  };
}

// Get tax bracket description
export function getTaxBracketDescription(income: number): string {
  for (const bracket of incomeTaxBrackets) {
    if (income >= bracket.minIncome && income <= bracket.maxIncome) {
      return `${bracket.rate}% bracket ($${bracket.minIncome.toLocaleString()} - $${
        bracket.maxIncome === Infinity ? '∞' : bracket.maxIncome.toLocaleString()
      })`;
    }
  }
  return 'Unknown bracket';
}
