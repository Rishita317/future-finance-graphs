import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PredictionsSection from "@/components/PredictionsSection";
import BudgetCalculator from "@/components/BudgetCalculator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PredictionsSection />
        <BudgetCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
