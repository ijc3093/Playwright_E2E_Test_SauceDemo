// utils/priceCalculator.ts
/**
 * A Helper function for calculating predicted total price using item total and tax.
 */
export function calculateTotalPrice(itemTotal: number, tax: number): number {
    return parseFloat((itemTotal + tax).toFixed(2));
  }