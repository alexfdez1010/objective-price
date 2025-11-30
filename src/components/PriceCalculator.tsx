'use client';

import { useState, useEffect } from 'react';
import {
  calculateGainLoss,
  convertCurrency,
  formatGainLoss,
  isValidPositiveNumber,
} from '@/lib/calculator';
import type {
  QuoteApiResponse,
  ExchangeRateApiResponse,
  ApiErrorResponse,
} from '@/types/yahoo-finance';

/**
 * Main calculator component for tracking asset gains/losses.
 * Fetches real-time data from Yahoo Finance and calculates potential gains/losses.
 */
export default function PriceCalculator() {
  const [symbol, setSymbol] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [assetCurrency, setAssetCurrency] = useState<string>('USD');
  const [displayCurrency, setDisplayCurrency] = useState<'USD' | 'EUR'>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * Fetches the current price for the given asset symbol.
   */
  const fetchCurrentPrice = async () => {
    if (!symbol.trim()) {
      setError('Please enter a valid symbol');
      return;
    }

    setLoading(true);
    setError('');
    setCurrentPrice(null);

    try {
      const response = await fetch(
        `/api/quote?symbol=${encodeURIComponent(symbol.trim())}`,
      );
      const data: QuoteApiResponse | ApiErrorResponse = await response.json();

      if (!response.ok || 'error' in data) {
        setError('error' in data ? data.error : 'Failed to fetch asset price');
        return;
      }

      setCurrentPrice(data.price);
      setAssetCurrency(data.currency);
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching price:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches exchange rate when display currency changes.
   */
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (assetCurrency === displayCurrency) {
        setExchangeRate(1);
        return;
      }

      try {
        const response = await fetch(
          `/api/exchange-rate?from=${assetCurrency}&to=${displayCurrency}`,
        );
        const data: ExchangeRateApiResponse | ApiErrorResponse =
          await response.json();

        if (response.ok && 'rate' in data) {
          setExchangeRate(data.rate);
        }
      } catch (err) {
        console.error('Error fetching exchange rate:', err);
      }
    };

    if (currentPrice !== null) {
      fetchExchangeRate();
    }
  }, [assetCurrency, displayCurrency, currentPrice]);

  /**
   * Calculates the gain/loss in the selected display currency.
   */
  const calculateResult = (): {
    formatted: string;
    colorClass: string;
  } | null => {
    if (
      currentPrice === null ||
      !isValidPositiveNumber(quantity) ||
      !isValidPositiveNumber(targetPrice)
    ) {
      return null;
    }

    const gainLossInAssetCurrency = calculateGainLoss(
      currentPrice,
      parseFloat(targetPrice),
      parseFloat(quantity),
    );

    const gainLossInDisplayCurrency = convertCurrency(
      gainLossInAssetCurrency,
      exchangeRate,
    );

    return formatGainLoss(gainLossInDisplayCurrency, displayCurrency);
  };

  const result = calculateResult();

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Objective Price Calculator
        </h1>

        {/* Asset Symbol Input */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="symbol"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Asset Symbol
            </label>
            <div className="flex gap-2">
              <input
                id="symbol"
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="e.g., AAPL, TSLA, BTC-USD"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                disabled={loading}
              />
              <button
                onClick={fetchCurrentPrice}
                disabled={loading || !symbol.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : 'Fetch Price'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}

          {/* Current Price Display */}
          {currentPrice !== null && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current Price
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {assetCurrency === 'EUR' ? '€' : '$'}
                {currentPrice.toFixed(2)}
              </p>
            </div>
          )}

          {/* Quantity Input */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              min="0"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Target Price Input */}
          <div>
            <label
              htmlFor="targetPrice"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Target Price
            </label>
            <input
              id="targetPrice"
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="Enter target price"
              min="0"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Currency
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setDisplayCurrency('USD')}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                  displayCurrency === 'USD'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setDisplayCurrency('EUR')}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                  displayCurrency === 'EUR'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                EUR (€)
              </button>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Potential Gain/Loss
              </p>
              <p className={`text-4xl font-bold ${result.colorClass}`}>
                {result.formatted}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
