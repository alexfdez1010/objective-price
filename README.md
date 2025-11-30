# Objective Price Calculator 📈

A **real-time financial asset calculator** that helps investors and traders track potential gains and losses on their investments. Built with Next.js 15, React 19, and integrated with Yahoo Finance API for live market data.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8)](https://tailwindcss.com/)
[![Yahoo Finance](https://img.shields.io/badge/Yahoo_Finance-API-purple)](https://github.com/gadicc/yahoo-finance2)

## 🎯 Overview

**Objective Price Calculator** is a web application designed to help investors make informed decisions by calculating potential gains or losses based on target prices. The application fetches real-time market data from Yahoo Finance and supports multiple currencies, making it ideal for international investors.

### Key Use Cases

- **Investment Planning** - Calculate potential returns before making investment decisions
- **Portfolio Management** - Track target prices for multiple assets
- **Risk Assessment** - Visualize potential losses with clear color-coded indicators
- **Multi-Currency Trading** - View gains/losses in USD or EUR with real-time exchange rates
- **Cryptocurrency Trading** - Support for crypto assets (BTC-USD, ETH-USD, etc.)
- **Stock Market Analysis** - Real-time data for stocks, ETFs, and indices

### Target Audience

- **Retail Investors** - Individual investors managing personal portfolios
- **Day Traders** - Active traders needing quick gain/loss calculations
- **Financial Advisors** - Professionals demonstrating scenarios to clients
- **Students** - Learning about investment calculations and market dynamics
- **International Investors** - Trading across different currency zones

## 🎯 Philosophy

This application embodies **professional software engineering principles**:

- **SOLID Principles** - Applied rigorously across all code
- **Design Pattern Driven** - Appropriate patterns for maintainability and scalability
- **Documentation First** - Comprehensive TSDoc/JSDoc for all functions, classes, and hooks
- **Testing as Priority** - Unit and E2E tests with real API integration
- **Code Quality** - Strict linting, formatting, and file size limits (200 lines max)
- **Type Safety** - Full TypeScript strict mode enforcement

See [AGENTS.md](./AGENTS.md) for agent development guidelines and principles.

## ✨ Features

### Application Features

- **Real-Time Price Fetching** - Live market data from Yahoo Finance API
- **Asset Symbol Search** - Support for stocks, ETFs, cryptocurrencies, and indices
- **Gain/Loss Calculation** - Automatic calculation based on current price, target price, and quantity
- **Visual Indicators** - Color-coded results (green for gains, red for losses)
- **Multi-Currency Support** - Toggle between USD ($) and EUR (€) display
- **Real-Time Exchange Rates** - Automatic currency conversion using live rates
- **Decimal Precision** - Support for fractional shares and precise pricing
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support** - Automatic theme adaptation
- **Error Handling** - Clear error messages for invalid symbols or network issues

### Technical Stack

- **[Next.js 15.5.4](https://nextjs.org/docs)** - React framework with App Router and Server Components
- **[React 19.1.0](https://react.dev/)** - Latest React with hooks and client components
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Full type safety across the application
- **[TailwindCSS 4.x](https://tailwindcss.com/)** - Modern utility-first CSS framework
- **[yahoo-finance2 3.10.2](https://github.com/gadicc/yahoo-finance2)** - Reliable Yahoo Finance API integration

### Testing Infrastructure

- **[Vitest](https://vitest.dev/)** - Fast unit testing for calculation logic
- **[Playwright](https://playwright.dev/)** - E2E testing with real Yahoo Finance API calls
- **22 Unit Tests** - Complete coverage of calculation functions
- **9 E2E Tests** - Full application flow validation with real data
- **No Mocks in E2E** - True end-to-end testing with live API integration
- **Multi-Browser Testing** - Chromium, Firefox, and WebKit support

### Code Quality Tools

- **[ESLint](https://eslint.org/)** - Next.js and TypeScript linting rules
- **[Prettier](https://prettier.io/)** - Consistent code formatting
- **Pre-commit hooks** - Automated testing and formatting before commits
- **Strict TypeScript** - Maximum type safety configuration

### API Architecture

- **RESTful API Routes** - Clean separation of concerns
- **`/api/quote`** - Fetches real-time asset prices from Yahoo Finance
- **`/api/exchange-rate`** - Retrieves live currency exchange rates
- **Type-Safe Responses** - Full TypeScript interfaces for API data
- **Error Handling** - Comprehensive error management and user feedback
- **Rate Limiting Ready** - Structured for production rate limiting implementation

## 📋 Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher
- **Internet connection** - Required for Yahoo Finance API calls
- **Git** for version control (optional)

## 🚀 Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/alexfdez1010/objective-price.git
cd objective-price

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the calculator.

### 3. Using the Calculator

1. **Enter Asset Symbol** - Type any valid Yahoo Finance symbol:
   - Stocks: `AAPL`, `GOOGL`, `TSLA`, `MSFT`
   - Crypto: `BTC-USD`, `ETH-USD`, `DOGE-USD`
   - Indices: `^GSPC` (S&P 500), `^DJI` (Dow Jones)
   - International: `NESN.SW`, `SAP.DE`, `7203.T`

2. **Fetch Current Price** - Click "Fetch Price" to get real-time data

3. **Enter Your Position**:
   - **Quantity**: Number of shares/units you own (supports decimals)
   - **Target Price**: Your desired sell price

4. **View Results**:
   - Gain/loss is calculated automatically
   - Green = profit, Red = loss
   - Toggle between USD and EUR display

### 4. Example Scenarios

**Stock Investment:**

```
Symbol: AAPL
Quantity: 100
Target Price: $200
→ Shows potential gain/loss based on current AAPL price
```

**Cryptocurrency:**

```
Symbol: BTC-USD
Quantity: 0.5
Target Price: $50000
→ Calculates profit on half a Bitcoin
```

**International Stock (EUR):**

```
Symbol: SAP.DE
Quantity: 50
Target Price: €150
Currency: EUR
→ Shows results in Euros with live exchange rate
```

## 📜 Available Scripts

### Development

- **`npm run dev`** - Start development server with Turbopack (hot reload)
- **`npm run build`** - Build optimized production bundle
- **`npm run start`** - Start production server (requires build first)
- **`npm run launch`** - Build and start production server

### Code Quality

- **`npm run lint`** - Run ESLint to check code quality
- **`npm run format`** - Format all code with Prettier
- **`npm run lint-format`** - Lint and format (mandatory before commits)
- **`npm run pre-commit`** - Run full test suite and code quality checks

### Testing

- **`npm test`** - Run complete test suite (unit + E2E)
- **`npm run test:unit`** - Run unit tests for calculation logic (22 tests)
- **`npm run test:integration`** - Run integration tests (placeholder)
- **`npm run test:e2e`** - Run E2E tests with real Yahoo Finance API (9 tests)
- **`npm run playwright`** - Open Playwright UI for interactive test debugging
- **`npm run test:specific`** - Run specific Playwright test by name

## 🏗️ Project Structure

```
objective-price/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── quote/
│   │   │   │   └── route.ts          # Yahoo Finance quote API
│   │   │   └── exchange-rate/
│   │   │       └── route.ts          # Currency exchange rate API
│   │   ├── layout.tsx            # Root layout with metadata
│   │   ├── page.tsx              # Main calculator page
│   │   └── globals.css           # Global styles and Tailwind
│   ├── components/
│   │   └── PriceCalculator.tsx   # Main calculator component
│   ├── lib/
│   │   └── calculator.ts         # Calculation utility functions
│   └── types/
│       └── yahoo-finance.ts      # TypeScript type definitions
├── tests/
│   ├── unit/
│   │   └── calculator.test.ts    # Unit tests (22 tests)
│   ├── integration/          # Integration tests (placeholder)
│   ├── e2e/
│   │   └── example.spec.ts       # E2E tests (9 tests)
│   └── setup.ts              # Test configuration
├── public/                   # Static assets (favicon, etc.)
├── .vscode/                  # VS Code settings
├── eslint.config.mjs         # ESLint configuration
├── playwright.config.ts      # Playwright E2E test config
├── vitest.config.ts          # Vitest unit test config
├── tsconfig.json             # TypeScript strict configuration
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS for Tailwind
├── .prettierrc               # Prettier code formatting
├── .env.example              # Environment variables template
└── AGENTS.md                 # AI development guidelines
```

## 🧪 Testing Strategy

### Unit Tests (22 tests)

Located in `tests/unit/calculator.test.ts`, these test calculation logic in isolation:

- **calculateGainLoss** - 5 tests covering positive/negative gains, decimals, edge cases
- **convertCurrency** - 5 tests for currency conversion with various exchange rates
- **formatGainLoss** - 6 tests for USD/EUR formatting with color coding
- **isValidPositiveNumber** - 6 tests for input validation

```bash
npm run test:unit  # Fast execution (~170ms)
```

### End-to-End Tests (9 tests)

Located in `tests/e2e/example.spec.ts`, these test the complete application with **real Yahoo Finance API calls**:

- Calculator UI rendering and input fields
- Real-time price fetching for valid/invalid symbols
- Gain/loss calculation with live data
- Currency switching (USD ↔ EUR) with real exchange rates
- Decimal quantity and price handling
- Button state management

**Important:** E2E tests use **no mocks** - they verify the entire system including external API integration.

```bash
npm run test:e2e  # Includes build + multi-browser testing (~40s)
```

### Test Coverage

- **Calculation Logic**: 100% coverage of all utility functions
- **API Routes**: Validated through E2E tests with real data
- **User Flows**: Complete calculator workflow tested
- **Error Handling**: Invalid symbols and network errors covered

## 📊 Technical Implementation

### Calculation Logic

The core calculation is straightforward but precise:

```typescript
// Gain/Loss = (Target Price - Current Price) × Quantity
const gainLoss = (targetPrice - currentPrice) * quantity;

// Currency conversion
const convertedAmount = gainLoss * exchangeRate;
```

### API Integration

**Quote Endpoint** (`/api/quote`):

```typescript
// Fetches real-time asset data
GET /api/quote?symbol=AAPL

Response:
{
  "symbol": "AAPL",
  "price": 175.43,
  "currency": "USD"
}
```

**Exchange Rate Endpoint** (`/api/exchange-rate`):

```typescript
// Fetches currency conversion rates
GET /api/exchange-rate?from=USD&to=EUR

Response:
{
  "from": "USD",
  "to": "EUR",
  "rate": 0.92
}
```

### Component Architecture

- **PriceCalculator** (Client Component) - Main UI with state management
- **API Routes** (Server-side) - Yahoo Finance integration
- **Calculator Utils** (Pure Functions) - Testable calculation logic
- **Type Definitions** - Full TypeScript safety

### State Management

Uses React hooks for simple, effective state:

- `useState` for form inputs and results
- `useEffect` for automatic exchange rate updates
- No external state management needed (keeps it simple)

## 🚀 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

The application will be available at `http://localhost:3000`

### Deployment Platforms

This application can be deployed to:

- **[Vercel](https://vercel.com)** (Recommended) - Zero configuration, automatic deployments
- **[Netlify](https://netlify.com)** - Simple static site hosting
- **[Railway](https://railway.app)** - Full-stack deployment
- **[Fly.io](https://fly.io)** - Global edge deployment
- **Docker** - Containerized deployment

### Environment Variables

No environment variables required! The application works out of the box.

**Optional configurations:**

- Rate limiting for API routes
- Custom Yahoo Finance API keys (if needed in future)
- Analytics integration

### Performance Considerations

- **Server-Side API Routes** - Keeps API keys secure, reduces client load
- **Turbopack** - Fast development builds
- **React 19** - Optimized rendering and hydration
- **TailwindCSS 4** - Minimal CSS bundle size
- **No Database** - Stateless architecture, easy to scale

## 🔧 Configuration Files

- **`tsconfig.json`** - TypeScript strict mode, path aliases
- **`eslint.config.mjs`** - Next.js and TypeScript rules
- **`.prettierrc`** - Single quotes, trailing commas, 2-space tabs
- **`vitest.config.ts`** - Node environment, 10s timeout
- **`playwright.config.ts`** - Multi-browser E2E testing

## 📚 Resources

### Official Documentation

- [Next.js 15 Documentation](https://nextjs.org/docs) - App Router, Server Components, API Routes
- [React 19 Documentation](https://react.dev/) - Hooks, Components, Best Practices
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type System, Strict Mode
- [TailwindCSS 4 Documentation](https://tailwindcss.com/docs) - Utility Classes, Customization
- [yahoo-finance2 Documentation](https://github.com/gadicc/yahoo-finance2) - API Methods, Symbol Format
- [Vitest Documentation](https://vitest.dev/) - Unit Testing, Assertions
- [Playwright Documentation](https://playwright.dev/) - E2E Testing, Browser Automation

### Yahoo Finance Symbol Format

- **US Stocks**: `AAPL`, `GOOGL`, `MSFT`, `TSLA`
- **Cryptocurrencies**: `BTC-USD`, `ETH-USD`, `DOGE-USD`
- **Indices**: `^GSPC` (S&P 500), `^DJI` (Dow Jones), `^IXIC` (NASDAQ)
- **International Stocks**: `NESN.SW` (Swiss), `SAP.DE` (German), `7203.T` (Japanese)
- **ETFs**: `SPY`, `QQQ`, `VOO`
- **Forex**: `EURUSD=X`, `GBPUSD=X`

## 🔧 Development Guidelines

### Code Quality Standards

- **File Size Limit**: Maximum 200 lines per file (enforced)
- **Documentation**: TSDoc/JSDoc for all functions and components
- **Testing**: Unit tests for logic, E2E tests for user flows
- **Type Safety**: Strict TypeScript mode, no `any` types
- **SOLID Principles**: Applied throughout the codebase

### Before Committing

```bash
# Run the pre-commit check
npm run pre-commit

# This will:
# 1. Run all tests (unit + E2E)
# 2. Lint the code
# 3. Format with Prettier
```

## ❓ FAQ

**Q: Does this require a Yahoo Finance API key?**
A: No! The yahoo-finance2 library uses Yahoo's public data without authentication.

**Q: What assets are supported?**
A: Any asset available on Yahoo Finance - stocks, crypto, ETFs, indices, forex, commodities.

**Q: Can I add more currencies?**
A: Yes! Modify the currency selector in `PriceCalculator.tsx` and the API will handle any currency pair.

**Q: Why no database?**
A: This is a stateless calculator. Each calculation is independent, no data persistence needed.

**Q: How accurate are the prices?**
A: Prices are real-time from Yahoo Finance, typically delayed by 15-20 minutes for stocks (real-time for crypto).

**Q: Can I use this for production trading?**
A: This is a calculator tool for planning. Always verify prices on your broker's platform before trading.

## 👥 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Run `npm run pre-commit` to ensure quality
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🚀 Future Enhancements

Potential features for future versions:

- **Portfolio Mode** - Track multiple assets simultaneously
- **Historical Charts** - Visualize price history and targets
- **Price Alerts** - Notifications when target prices are reached
- **More Currencies** - Support for additional global currencies
- **Export Results** - Save calculations as PDF or CSV
- **Percentage Gains** - Show gains as percentage in addition to absolute values
- **Stop Loss Calculator** - Calculate risk management levels
- **Mobile App** - Native iOS/Android applications

---

**Built with ❤️ using Next.js 15, React 19, and Yahoo Finance API**
