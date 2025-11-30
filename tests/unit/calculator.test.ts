import { describe, it, expect } from 'vitest';
import {
  calculateGainLoss,
  convertCurrency,
  formatGainLoss,
  isValidPositiveNumber,
} from '@/lib/calculator';

describe('calculateGainLoss', () => {
  it('should calculate positive gain correctly', () => {
    const result = calculateGainLoss(100, 150, 10);
    expect(result).toBe(500);
  });

  it('should calculate loss correctly', () => {
    const result = calculateGainLoss(100, 80, 10);
    expect(result).toBe(-200);
  });

  it('should return zero when target equals current price', () => {
    const result = calculateGainLoss(100, 100, 10);
    expect(result).toBe(0);
  });

  it('should handle decimal quantities', () => {
    const result = calculateGainLoss(100, 110, 2.5);
    expect(result).toBe(25);
  });

  it('should handle decimal prices', () => {
    const result = calculateGainLoss(99.99, 100.01, 100);
    expect(result).toBeCloseTo(2, 2);
  });
});

describe('convertCurrency', () => {
  it('should convert currency correctly with rate > 1', () => {
    const result = convertCurrency(100, 1.2);
    expect(result).toBe(120);
  });

  it('should convert currency correctly with rate < 1', () => {
    const result = convertCurrency(100, 0.85);
    expect(result).toBe(85);
  });

  it('should return same amount when rate is 1', () => {
    const result = convertCurrency(100, 1);
    expect(result).toBe(100);
  });

  it('should handle negative amounts', () => {
    const result = convertCurrency(-100, 1.2);
    expect(result).toBe(-120);
  });

  it('should handle decimal exchange rates', () => {
    const result = convertCurrency(100, 0.9234);
    expect(result).toBeCloseTo(92.34, 2);
  });
});

describe('formatGainLoss', () => {
  it('should format positive USD value with green color', () => {
    const result = formatGainLoss(150.5, 'USD');
    expect(result.formatted).toBe('+$150.50');
    expect(result.colorClass).toBe('text-green-600');
  });

  it('should format negative USD value with red color', () => {
    const result = formatGainLoss(-75.25, 'USD');
    expect(result.formatted).toBe('-$75.25');
    expect(result.colorClass).toBe('text-red-600');
  });

  it('should format positive EUR value with green color', () => {
    const result = formatGainLoss(200.99, 'EUR');
    expect(result.formatted).toBe('+€200.99');
    expect(result.colorClass).toBe('text-green-600');
  });

  it('should format negative EUR value with red color', () => {
    const result = formatGainLoss(-50.5, 'EUR');
    expect(result.formatted).toBe('-€50.50');
    expect(result.colorClass).toBe('text-red-600');
  });

  it('should format zero with positive formatting', () => {
    const result = formatGainLoss(0, 'USD');
    expect(result.formatted).toBe('+$0.00');
    expect(result.colorClass).toBe('text-green-600');
  });

  it('should round to 2 decimal places', () => {
    const result = formatGainLoss(123.456789, 'USD');
    expect(result.formatted).toBe('+$123.46');
  });
});

describe('isValidPositiveNumber', () => {
  it('should return true for valid positive integers', () => {
    expect(isValidPositiveNumber('10')).toBe(true);
    expect(isValidPositiveNumber('1')).toBe(true);
    expect(isValidPositiveNumber('1000')).toBe(true);
  });

  it('should return true for valid positive decimals', () => {
    expect(isValidPositiveNumber('10.5')).toBe(true);
    expect(isValidPositiveNumber('0.1')).toBe(true);
    expect(isValidPositiveNumber('99.99')).toBe(true);
  });

  it('should return false for zero', () => {
    expect(isValidPositiveNumber('0')).toBe(false);
    expect(isValidPositiveNumber('0.0')).toBe(false);
  });

  it('should return false for negative numbers', () => {
    expect(isValidPositiveNumber('-10')).toBe(false);
    expect(isValidPositiveNumber('-0.5')).toBe(false);
  });

  it('should return false for non-numeric strings', () => {
    expect(isValidPositiveNumber('abc')).toBe(false);
    expect(isValidPositiveNumber('')).toBe(false);
    expect(isValidPositiveNumber('10a')).toBe(false);
  });

  it('should return false for special values', () => {
    expect(isValidPositiveNumber('NaN')).toBe(false);
    expect(isValidPositiveNumber('Infinity')).toBe(false);
  });
});
