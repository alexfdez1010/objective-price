import { NextRequest, NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
import type { YahooQuoteResponse } from '@/types/yahoo-finance';

const yahooFinance = new YahooFinance();

/**
 * GET handler for fetching exchange rate between two currencies.
 * @param request - The incoming request with 'from' and 'to' query parameters
 * @returns JSON response with exchange rate or error
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!from || !to) {
      return NextResponse.json(
        { error: "Both 'from' and 'to' currency parameters are required" },
        { status: 400 },
      );
    }

    // If currencies are the same, return rate of 1
    if (from === to) {
      return NextResponse.json({
        from,
        to,
        rate: 1,
      });
    }

    // Yahoo Finance uses format like "EURUSD=X" for currency pairs
    const symbol = `${from}${to}=X`;
    const quote = (await yahooFinance.quote(symbol)) as YahooQuoteResponse;

    if (!quote || !quote.regularMarketPrice) {
      return NextResponse.json(
        { error: 'Unable to fetch exchange rate' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      from,
      to,
      rate: quote.regularMarketPrice,
    });
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate data' },
      { status: 500 },
    );
  }
}
