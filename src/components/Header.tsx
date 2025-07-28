import { TrendingUp, Calculator, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">PricePredictor</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('predictions')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Predictions</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('budgeting')}
            className="flex items-center space-x-2"
          >
            <Calculator className="h-4 w-4" />
            <span>50-30-20 Rule</span>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;