import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PredictionsSection from "@/components/PredictionsSection";
import BudgetCalculator from "@/components/BudgetCalculator";
import CreditCardManager from "@/components/CreditCardManager";
import SpendingAnalytics from "@/components/SpendingAnalytics";
import Footer from "@/components/Footer";
import { useFinance } from "@/contexts/FinanceContext";

const Index = () => {
  const { expenses, monthlyIncome } = useFinance();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PredictionsSection />
        <BudgetCalculator />
        <CreditCardManager />
        <SpendingAnalytics expenses={expenses} monthlyIncome={monthlyIncome} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
