import PriceCalculator from '@/components/PriceCalculator';

/**
 * Home page component displaying the price calculator.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <PriceCalculator />
    </div>
  );
}
