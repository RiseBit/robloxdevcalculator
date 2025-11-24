import Header from './components/Header';
import CalculatorCard from './components/CalculatorCard';
import EarningsEstimator from './components/EarningsEstimator';
import Footer from './components/Footer';
import { robuxToUsdConversion, usdToRobuxConversion } from './server';

export default function Home() {
  return (
    <div className="bg-bgPage min-h-screen text-textPrimary">
      <Header/>
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-5">
          
          <section className="text-center mb-16">
            <h2 className="text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">
              Developer Tools & Calculators
            </h2>
            <p className="text-xl text-textSecondary font-bold tracking-wide">Essential calculators for Roblox developers</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <CalculatorCard title="USD to Robux (DevEx)" placeholder="0.00" resultLabel="Robux" conversionType={"usdToRobux"}/>
            <CalculatorCard title="Robux (with Tax Covered)" placeholder="0" resultLabel="With Tax" conversionType={"robuxAfterTax"} />
            <CalculatorCard title="Robux (Tax Subtracted)" placeholder="0" resultLabel="After Tax" conversionType={"robuxBeforeTax"}/>
            <CalculatorCard title="Robux to USD (DevEx)" placeholder="0" resultLabel="USD" conversionType={"robuxToUsd"}/>
          </div>

          <EarningsEstimator/>
          
        </div>
      </main>

      <Footer/>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Roblox Dev Calculator",
            "description": "Free Roblox developer tools for calculating DevEx earnings and conversions",
            "url": "https://your-domain.com",
            "applicationCategory": "UtilitiesApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Person",
              "name": "Surya (RiseBit)",
              "jobTitle": "Full-Stack Roblox Developer"
            }
          })
        }}
      />
    </div>
  );
}