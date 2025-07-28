import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DollarSign, PiggyBank, Heart, Coffee } from "lucide-react";

const BudgetCalculator = () => {
  const [income, setIncome] = useState<string>("");
  
  const monthlyIncome = parseFloat(income) || 0;
  const needs = monthlyIncome * 0.5;
  const wants = monthlyIncome * 0.3;
  const savings = monthlyIncome * 0.2;

  const pieData = [
    { name: 'Needs (50%)', value: needs, color: 'hsl(var(--chart-1))' },
    { name: 'Wants (30%)', value: wants, color: 'hsl(var(--chart-2))' },
    { name: 'Savings (20%)', value: savings, color: 'hsl(var(--chart-3))' }
  ];

  const barData = [
    { category: 'Needs', amount: needs, percentage: 50, color: 'hsl(var(--chart-1))' },
    { category: 'Wants', amount: wants, percentage: 30, color: 'hsl(var(--chart-2))' },
    { category: 'Savings', amount: savings, percentage: 20, color: 'hsl(var(--chart-3))' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm font-mono">${data.value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="budgeting" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            50-30-20 Budget Rule
          </h2>
          <p className="text-lg text-muted-foreground">
            A simple and effective budgeting method that allocates your after-tax income into three categories: 
            50% for needs, 30% for wants, and 20% for savings and debt repayment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Budget</CardTitle>
              <CardDescription>
                Enter your monthly after-tax income to see your 50-30-20 breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="income">Monthly After-Tax Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter your monthly income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {monthlyIncome > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-4 bg-chart-1/10 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-chart-1/20 flex items-center justify-center">
                          <Heart className="h-4 w-4 text-chart-1" />
                        </div>
                        <div>
                          <p className="font-medium">Needs (50%)</p>
                          <p className="text-sm text-muted-foreground">Housing, utilities, groceries</p>
                        </div>
                      </div>
                      <p className="text-lg font-mono font-semibold">${needs.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-chart-2/10 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-chart-2/20 flex items-center justify-center">
                          <Coffee className="h-4 w-4 text-chart-2" />
                        </div>
                        <div>
                          <p className="font-medium">Wants (30%)</p>
                          <p className="text-sm text-muted-foreground">Entertainment, dining out, hobbies</p>
                        </div>
                      </div>
                      <p className="text-lg font-mono font-semibold">${wants.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-chart-3/10 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-chart-3/20 flex items-center justify-center">
                          <PiggyBank className="h-4 w-4 text-chart-3" />
                        </div>
                        <div>
                          <p className="font-medium">Savings (20%)</p>
                          <p className="text-sm text-muted-foreground">Emergency fund, retirement, investments</p>
                        </div>
                      </div>
                      <p className="text-lg font-mono font-semibold">${savings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {monthlyIncome > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Visual Breakdown</CardTitle>
                <CardDescription>
                  See how your budget is distributed across categories
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
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {monthlyIncome > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Annual Projection</CardTitle>
              <CardDescription>
                Your budget breakdown for the entire year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `$${(value * 12 / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value * 12).toLocaleString()}`, 'Annual Amount']}
                      labelFormatter={(label) => `${label} Category`}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-chart-1">${(needs * 12).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Annual Needs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-2">${(wants * 12).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Annual Wants</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-3">${(savings * 12).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Annual Savings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-chart-1" />
                Needs (50%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Housing (rent/mortgage)</li>
                <li>• Utilities (electricity, gas, water)</li>
                <li>• Groceries and essential food</li>
                <li>• Transportation</li>
                <li>• Insurance premiums</li>
                <li>• Minimum debt payments</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Coffee className="h-5 w-5 text-chart-2" />
                Wants (30%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Dining out and entertainment</li>
                <li>• Hobbies and recreation</li>
                <li>• Shopping (non-essential)</li>
                <li>• Subscriptions and memberships</li>
                <li>• Travel and vacations</li>
                <li>• Personal care and beauty</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-chart-3" />
                Savings (20%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Emergency fund (3-6 months expenses)</li>
                <li>• Retirement contributions</li>
                <li>• Investment accounts</li>
                <li>• Extra debt payments</li>
                <li>• Short-term savings goals</li>
                <li>• Health Savings Account (HSA)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculator;