import PredictionChart from "./PredictionChart";

const PredictionsSection = () => {
  // Generate sample data for demonstration
  const generateSampleData = (startPrice: number, endPrice: number, volatility: number = 0.1) => {
    const data = [];
    const months = 24; // 2 years
    const historicalMonths = 12; // 1 year of historical data
    
    // Historical data (past 12 months)
    for (let i = -historicalMonths; i <= 0; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      const progress = (i + historicalMonths) / historicalMonths;
      const basePrice = startPrice + (startPrice * 0.2 * progress); // Some growth in historical data
      const randomVariation = (Math.random() - 0.5) * 2 * volatility * basePrice;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        historical: Math.round(basePrice + randomVariation),
        predicted: null,
        confidence: null
      });
    }
    
    // Predicted data (next 24 months)
    for (let i = 1; i <= months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      const progress = i / months;
      const basePrice = startPrice + (endPrice - startPrice) * progress;
      const randomVariation = (Math.random() - 0.5) * 2 * volatility * basePrice;
      const confidence = Math.max(60, 95 - (i * 1.5)); // Decreasing confidence over time
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        historical: null,
        predicted: Math.round(basePrice + randomVariation),
        confidence: Math.round(confidence)
      });
    }
    
    return data;
  };

  const predictions = [
    {
      title: "Technology Sector",
      category: "tech",
      currentPrice: 45000,
      prediction2Year: 62000,
      data: generateSampleData(45000, 62000, 0.15),
      color: "hsl(var(--chart-1))"
    },
    {
      title: "Real Estate Market",
      category: "real-estate",
      currentPrice: 385000,
      prediction2Year: 425000,
      data: generateSampleData(385000, 425000, 0.08),
      color: "hsl(var(--chart-2))"
    },
    {
      title: "Commodity Prices",
      category: "commodities",
      currentPrice: 1950,
      prediction2Year: 2180,
      data: generateSampleData(1950, 2180, 0.12),
      color: "hsl(var(--chart-3))"
    }
  ];

  return (
    <section id="predictions" className="py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Price Predictions
          </h2>
          <p className="text-lg text-muted-foreground">
            Our advanced machine learning models analyze historical trends, market patterns, and economic indicators 
            to provide accurate 2-year price forecasts across key market sectors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {predictions.map((prediction, index) => (
            <PredictionChart
              key={index}
              title={prediction.title}
              category={prediction.category}
              data={prediction.data}
              currentPrice={prediction.currentPrice}
              prediction2Year={prediction.prediction2Year}
              color={prediction.color}
            />
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-muted/50 rounded-lg max-w-4xl mx-auto">
          <h3 className="font-semibold mb-3">About Our Predictions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="mb-2">
                <strong>Technology Sector:</strong> Tracks major tech companies and emerging technologies, 
                including AI, cloud computing, and semiconductor markets.
              </p>
              <p>
                <strong>Real Estate Market:</strong> Analyzes residential property values, considering 
                interest rates, demographics, and regional economic factors.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Commodity Prices:</strong> Monitors precious metals, energy, and agricultural 
                commodities with global supply and demand analysis.
              </p>
              <p className="text-xs">
                <em>Disclaimer: These predictions are based on AI models and historical data. 
                Past performance does not guarantee future results.</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionsSection;