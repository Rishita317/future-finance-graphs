import { TrendingUp, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">PricePredictor</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered price predictions and smart budgeting tools to help you make informed financial decisions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>AI Price Predictions</li>
              <li>50-30-20 Budget Rule</li>
              <li>Market Analysis</li>
              <li>Financial Planning</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Technology Sector</li>
              <li>Real Estate Market</li>
              <li>Commodity Prices</li>
              <li>Market Trends</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Rishita317/Price_Predictor_AIML_Project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 w-9 rounded-md border bg-background hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="mailto:contact@pricepredictor.com" 
                className="flex items-center justify-center h-9 w-9 rounded-md border bg-background hover:bg-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Based on AI/ML models from the Price Predictor project
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2024 PricePredictor. Built with advanced AI models for educational and informational purposes.</p>
          <p className="mt-1">Disclaimer: Past performance does not guarantee future results. Invest responsibly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;