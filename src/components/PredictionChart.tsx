import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PredictionChartProps {
  title: string;
  category: string;
  data: Array<{
    date: string;
    historical: number | null;
    predicted: number | null;
    confidence?: number;
  }>;
  currentPrice: number;
  prediction2Year: number;
  color: string;
}

const PredictionChart = ({ title, category, data, currentPrice, prediction2Year, color }: PredictionChartProps) => {
  const changePercent = ((prediction2Year - currentPrice) / currentPrice) * 100;
  const isPositive = changePercent >= 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {data.historical && (
            <p className="text-sm">
              <span className="text-muted-foreground">Historical: </span>
              <span className="font-mono">${data.historical.toLocaleString()}</span>
            </p>
          )}
          {data.predicted && (
            <p className="text-sm">
              <span className="text-muted-foreground">Predicted: </span>
              <span className="font-mono">${data.predicted.toLocaleString()}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{category}</CardDescription>
          </div>
          <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1">
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-lg font-mono font-semibold">${currentPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">2-Year Prediction</p>
            <p className="text-lg font-mono font-semibold">${prediction2Year.toLocaleString()}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${category}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Historical data */}
              <Area
                type="monotone"
                dataKey="historical"
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${category})`}
                connectNulls={false}
              />
              
              {/* Predicted data */}
              <Area
                type="monotone"
                dataKey="predicted"
                stroke={color}
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <div className={`w-3 h-0.5 bg-[${color}]`} />
            <span>Historical</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-3 h-0.5 bg-[${color}] opacity-60`} style={{ borderTop: `1px dashed ${color}` }} />
            <span>Predicted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionChart;