import { Button } from "@/components/ui/button";
import { ArrowDown, TrendingUp, DollarSign, Target } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Financial Dashboard" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative max-w-6xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Predict Market Trends &
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Budget Smarter</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered price predictions for three key market categories, plus intelligent budgeting tools to help you manage your finances with the proven 50-30-20 rule.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('predictions')}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              View Predictions
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('budgeting')}
            >
              <DollarSign className="mr-2 h-5 w-5" />
              Budget Calculator
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-card border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">AI Predictions</h3>
            <p className="text-sm text-muted-foreground text-center">
              2-year price forecasts powered by advanced machine learning models
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-card border">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold">Smart Budgeting</h3>
            <p className="text-sm text-muted-foreground text-center">
              Implement the proven 50-30-20 rule for optimal financial planning
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-card border">
            <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-chart-2" />
            </div>
            <h3 className="font-semibold">Financial Insights</h3>
            <p className="text-sm text-muted-foreground text-center">
              Make informed decisions with data-driven market analysis
            </p>
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => scrollToSection('predictions')}
            className="animate-bounce"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;