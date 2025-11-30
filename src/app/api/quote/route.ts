import { NextRequest, NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
import type { YahooQuoteResponse } from '@/types/yahoo-finance';

const yahooFinance = new YahooFinance();

/**
 * GET handler for fetching asset quote from Yahoo Finance.
 * @param request - The incoming request with 'symbol' query parameter
 * @returns JSON response with current price or error
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbol parameter is required' },
        { status: 400 },
      );
    }

    const quote = (await yahooFinance.quote(symbol)) as YahooQuoteResponse;

    if (!quote || !quote.regularMarketPrice) {
      return NextResponse.json(
        { error: 'Unable to fetch quote for this symbol' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      symbol: quote.symbol,
      price: quote.regularMarketPrice,
      currency: quote.currency || 'USD',
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote data' },
      { status: 500 },
    );
  }
}
