import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface Expense {
  id: string;
  cardId: string;
  amount: number;
  description: string;
  category: "needs" | "wants" | "savings";
  subcategory: string;
  date: string;
}

interface SpendingAnalyticsProps {
  expenses: Expense[];
  monthlyIncome: number;
}

const SpendingAnalytics = ({
  expenses,
  monthlyIncome,
}: SpendingAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");

  const analytics = useMemo(() => {
    if (expenses.length === 0) return null;

    const now = new Date();
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const diffTime = now.getTime() - expenseDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      switch (timeRange) {
        case "week":
          return diffDays <= 7;
        case "month":
          return diffDays <= 30;
        case "quarter":
          return diffDays <= 90;
        case "year":
          return diffDays <= 365;
        default:
          return true;
      }
    });

    const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    const needsSpent = filteredExpenses
      .filter((e) => e.category === "needs")
      .reduce((sum, e) => sum + e.amount, 0);
    const wantsSpent = filteredExpenses
      .filter((e) => e.category === "wants")
      .reduce((sum, e) => sum + e.amount, 0);
    const savingsSpent = filteredExpenses
      .filter((e) => e.category === "savings")
      .reduce((sum, e) => sum + e.amount, 0);

    // Budget limits based on 50-30-20 rule
    const budgetLimits = {
      needs: monthlyIncome * 0.5,
      wants: monthlyIncome * 0.3,
      savings: monthlyIncome * 0.2,
    };

    // Calculate percentages
    const percentages = {
      needs:
        budgetLimits.needs > 0 ? (needsSpent / budgetLimits.needs) * 100 : 0,
      wants:
        budgetLimits.wants > 0 ? (wantsSpent / budgetLimits.wants) * 100 : 0,
      savings:
        budgetLimits.savings > 0
          ? (savingsSpent / budgetLimits.savings) * 100
          : 0,
    };

    // Group by subcategory
    const subcategoryData = filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.subcategory]) {
        acc[expense.subcategory] = {
          amount: 0,
          count: 0,
          category: expense.category,
        };
      }
      acc[expense.subcategory].amount += expense.amount;
      acc[expense.subcategory].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; count: number; category: string }>);

    // Convert to array and sort by amount
    const subcategoryArray = Object.entries(subcategoryData)
      .map(([name, data]) => ({
        name,
        amount: data.amount,
        count: data.count,
        category: data.category,
      }))
      .sort((a, b) => b.amount - a.amount);

    // Daily spending trend
    const dailyData = filteredExpenses.reduce((acc, expense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = { date, amount: 0, count: 0 };
      }
      acc[date].amount += expense.amount;
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, { date: string; amount: number; count: number }>);

    const dailyArray = Object.values(dailyData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      totalSpent,
      needsSpent,
      wantsSpent,
      savingsSpent,
      budgetLimits,
      percentages,
      subcategoryArray,
      dailyArray,
      averageDailySpending:
        dailyArray.length > 0
          ? dailyArray.reduce((sum, day) => sum + day.amount, 0) /
            dailyArray.length
          : 0,
    };
  }, [expenses, timeRange, monthlyIncome]);

  if (!analytics) {
    return (
      <section id="analytics" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Spending Analytics
            </h2>
            <p className="text-lg text-muted-foreground">
              Add some expenses to see detailed analytics and insights
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getStatusIcon = (percentage: number) => {
    if (percentage >= 90)
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (percentage >= 75)
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 75) return "text-yellow-500";
    return "text-green-500";
  };

  const pieData = [
    {
      name: "Needs",
      value: analytics.needsSpent,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Wants",
      value: analytics.wantsSpent,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Savings",
      value: analytics.savingsSpent,
      color: "hsl(var(--chart-3))",
    },
  ];

  return (
    <section id="analytics" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Spending Analytics
          </h2>
          <p className="text-lg text-muted-foreground">
            Detailed insights into your spending patterns and budget performance
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center mb-8">
          <Select
            value={timeRange}
            onValueChange={(value: "week" | "month" | "quarter" | "year") =>
              setTimeRange(value)
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold">
                    ${analytics.totalSpent.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Daily Average
                  </p>
                  <p className="text-2xl font-bold">
                    ${analytics.averageDailySpending.toFixed(0)}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Transactions
                  </p>
                  <p className="text-2xl font-bold">
                    {analytics.dailyArray.reduce(
                      (sum, day) => sum + day.count,
                      0
                    )}
                  </p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Budget Status
                  </p>
                  <p className="text-2xl font-bold">
                    {Math.max(
                      analytics.percentages.needs,
                      analytics.percentages.wants,
                      analytics.percentages.savings
                    ).toFixed(0)}
                    %
                  </p>
                </div>
                {getStatusIcon(
                  Math.max(
                    analytics.percentages.needs,
                    analytics.percentages.wants,
                    analytics.percentages.savings
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Budget Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Performance</CardTitle>
              <CardDescription>
                How you're tracking against the 50-30-20 rule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries({
                needs: {
                  spent: analytics.needsSpent,
                  limit: analytics.budgetLimits.needs,
                  percentage: analytics.percentages.needs,
                },
                wants: {
                  spent: analytics.wantsSpent,
                  limit: analytics.budgetLimits.wants,
                  percentage: analytics.percentages.wants,
                },
                savings: {
                  spent: analytics.savingsSpent,
                  limit: analytics.budgetLimits.savings,
                  percentage: analytics.percentages.savings,
                },
              }).map(([category, data]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{category}</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(data.percentage)}
                      <span
                        className={`font-mono ${getStatusColor(
                          data.percentage
                        )}`}
                      >
                        {data.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        data.percentage >= 90
                          ? "bg-destructive"
                          : data.percentage >= 75
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(data.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${data.spent.toLocaleString()} spent</span>
                    <span>${data.limit.toLocaleString()} budget</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Spending Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Spending Distribution</CardTitle>
              <CardDescription>
                Visual breakdown of your expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        "Amount",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Trends */}
        {analytics.dailyArray.length > 1 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Daily Spending Trend</CardTitle>
              <CardDescription>Track your spending over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.dailyArray}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        "Amount",
                      ]}
                      labelFormatter={(label) =>
                        new Date(label).toLocaleDateString()
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{
                        fill: "hsl(var(--primary))",
                        strokeWidth: 2,
                        r: 4,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Spending Categories */}
        {analytics.subcategoryArray.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top Spending Categories</CardTitle>
              <CardDescription>
                Your highest spending subcategories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.subcategoryArray.slice(0, 10)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        "Amount",
                      ]}
                    />
                    <Bar
                      dataKey="amount"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Positive Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analytics.percentages.needs < 50 && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    You're under budget on needs (
                    {(50 - analytics.percentages.needs).toFixed(1)}% remaining)
                  </span>
                </div>
              )}
              {analytics.percentages.wants < 30 && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    You're under budget on wants (
                    {(30 - analytics.percentages.wants).toFixed(1)}% remaining)
                  </span>
                </div>
              )}
              {analytics.percentages.savings < 20 && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    You're under budget on savings (
                    {(20 - analytics.percentages.savings).toFixed(1)}%
                    remaining)
                  </span>
                </div>
              )}
              {analytics.averageDailySpending < (monthlyIncome * 0.3) / 30 && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    Your daily spending is below the recommended average
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-yellow-500" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analytics.percentages.needs > 50 && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>
                    You're over budget on needs by{" "}
                    {(analytics.percentages.needs - 50).toFixed(1)}%
                  </span>
                </div>
              )}
              {analytics.percentages.wants > 30 && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>
                    You're over budget on wants by{" "}
                    {(analytics.percentages.wants - 30).toFixed(1)}%
                  </span>
                </div>
              )}
              {analytics.percentages.savings > 20 && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>
                    You're over budget on savings by{" "}
                    {(analytics.percentages.savings - 20).toFixed(1)}%
                  </span>
                </div>
              )}
              {analytics.averageDailySpending > (monthlyIncome * 0.3) / 30 && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>
                    Your daily spending is above the recommended average
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SpendingAnalytics;
