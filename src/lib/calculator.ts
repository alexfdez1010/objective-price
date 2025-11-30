/**
 * Calculates the gain or loss based on current price, target price, and quantity.
 * @param currentPrice - The current price of the asset
 * @param targetPrice - The target price set by the user
 * @param quantity - The quantity of the asset owned
 * @returns The calculated gain/loss value
 */
export function calculateGainLoss(
  currentPrice: number,
  targetPrice: number,
  quantity: number,
): number {
  return (targetPrice - currentPrice) * quantity;
}

/**
 * Converts an amount from one currency to another using the exchange rate.
 * @param amount - The amount to convert
 * @param exchangeRate - The exchange rate from source to target currency
 * @returns The converted amount
 */
export function convertCurrency(amount: number, exchangeRate: number): number {
  return amount * exchangeRate;
}

/**
 * Formats a number as currency with proper sign and color indication.
 * @param value - The value to format
 * @param currency - The currency code (USD or EUR)
 * @returns Object with formatted string and color class
 */
export function formatGainLoss(
  value: number,
  currency: string,
): { formatted: string; colorClass: string } {
  const isPositive = value >= 0;
  const sign = isPositive ? '+' : '-';
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const symbol = currency === 'EUR' ? '€' : '$';

  const formatted = `${sign}${symbol}${Math.abs(value).toFixed(2)}`;

  return { formatted, colorClass };
}

/**
 * Validates if a string is a valid positive number.
 * @param value - The string to validate
 * @returns True if valid, false otherwise
 */
export function isValidPositiveNumber(value: string): boolean {
  if (!value || value.trim() === '') {
    return false;
  }
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num > 0;
}
