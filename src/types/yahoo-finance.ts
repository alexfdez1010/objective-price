/**
 * Type definitions for Yahoo Finance quote response.
 * Based on yahoo-finance2 library structure.
 */
export interface YahooQuoteResponse {
  symbol: string;
  regularMarketPrice?: number;
  currency?: string;
  [key: string]: unknown;
}

/**
 * Type for the API quote response sent to the client.
 */
export interface QuoteApiResponse {
  symbol: string;
  price: number;
  currency: string;
}

/**
 * Type for the API exchange rate response sent to the client.
 */
export interface ExchangeRateApiResponse {
  from: string;
  to: string;
  rate: number;
}

/**
 * Type for API error responses.
 */
export interface ApiErrorResponse {
  error: string;
}
