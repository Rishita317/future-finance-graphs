import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Plus,
  Trash2,
  ShoppingBag,
  Home,
  Car,
  Utensils,
  Gamepad2,
  Plane,
  Heart,
  Coffee,
  PiggyBank,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFinance } from "@/contexts/FinanceContext";

const CreditCardManager = () => {
  const {
    cards,
    addCard,
    removeCard,
    expenses,
    addExpense,
    updateCardBalance,
  } = useFinance();
  const [newCard, setNewCard] = useState({
    name: "",
    lastFourDigits: "",
    limit: "",
    balance: "",
  });
  const [newExpense, setNewExpense] = useState({
    cardId: "",
    amount: "",
    description: "",
    subcategory: "",
  });

  const subcategories = {
    needs: [
      { value: "housing", label: "Housing/Rent", icon: Home },
      { value: "utilities", label: "Utilities", icon: Home },
      { value: "groceries", label: "Groceries", icon: Utensils },
      { value: "transportation", label: "Transportation", icon: Car },
      { value: "insurance", label: "Insurance", icon: Heart },
      { value: "healthcare", label: "Healthcare", icon: Heart },
    ],
    wants: [
      { value: "dining", label: "Dining Out", icon: Utensils },
      { value: "entertainment", label: "Entertainment", icon: Gamepad2 },
      { value: "shopping", label: "Shopping", icon: ShoppingBag },
      { value: "travel", label: "Travel", icon: Plane },
      { value: "hobbies", label: "Hobbies", icon: Gamepad2 },
      { value: "beauty", label: "Beauty/Personal Care", icon: ShoppingBag },
    ],
    savings: [
      { value: "emergency", label: "Emergency Fund", icon: PiggyBank },
      { value: "retirement", label: "Retirement", icon: PiggyBank },
      { value: "investments", label: "Investments", icon: PiggyBank },
      { value: "debt", label: "Debt Payment", icon: PiggyBank },
    ],
  };

  const addCardHandler = () => {
    if (
      !newCard.name ||
      !newCard.lastFourDigits ||
      !newCard.limit ||
      !newCard.balance
    )
      return;

    addCard({
      name: newCard.name,
      lastFourDigits: newCard.lastFourDigits,
      limit: parseFloat(newCard.limit),
      balance: parseFloat(newCard.balance),
    });

    setNewCard({ name: "", lastFourDigits: "", limit: "", balance: "" });
  };

  const removeCardHandler = (cardId: string) => {
    removeCard(cardId);
  };

  const addExpenseHandler = () => {
    if (
      !newExpense.cardId ||
      !newExpense.amount ||
      !newExpense.description ||
      !newExpense.subcategory
    )
      return;

    // Determine category based on subcategory
    let category: "needs" | "wants" | "savings" = "wants";
    if (
      subcategories.needs.some((sub) => sub.value === newExpense.subcategory)
    ) {
      category = "needs";
    } else if (
      subcategories.savings.some((sub) => sub.value === newExpense.subcategory)
    ) {
      category = "savings";
    }

    addExpense({
      cardId: newExpense.cardId,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      category,
      subcategory: newExpense.subcategory,
    });

    // Update card balance
    updateCardBalance(
      newExpense.cardId,
      cards.find((c) => c.id === newExpense.cardId)?.balance ||
        0 + parseFloat(newExpense.amount)
    );

    setNewExpense({ cardId: "", amount: "", description: "", subcategory: "" });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "needs":
        return Heart;
      case "wants":
        return Coffee;
      case "savings":
        return PiggyBank;
      default:
        return ShoppingBag;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "needs":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "wants":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "savings":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSubcategoryIcon = (subcategory: string) => {
    const allSubcategories = [
      ...subcategories.needs,
      ...subcategories.wants,
      ...subcategories.savings,
    ];
    const found = allSubcategories.find((sub) => sub.value === subcategory);
    return found ? found.icon : ShoppingBag;
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const needsExpenses = expenses
    .filter((e) => e.category === "needs")
    .reduce((sum, e) => sum + e.amount, 0);
  const wantsExpenses = expenses
    .filter((e) => e.category === "wants")
    .reduce((sum, e) => sum + e.amount, 0);
  const savingsExpenses = expenses
    .filter((e) => e.category === "savings")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <section id="credit-cards" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Credit Card & Expense Tracker
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your credit card expenses and automatically categorize them
            according to the 50-30-20 budgeting rule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Credit Cards Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Credit Cards
              </CardTitle>
              <CardDescription>
                Manage your credit cards and track balances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Card */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Card
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardName">Card Name</Label>
                    <Input
                      id="cardName"
                      placeholder="e.g., Chase Sapphire"
                      value={newCard.name}
                      onChange={(e) =>
                        setNewCard({ ...newCard, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastFour">Last 4 Digits</Label>
                    <Input
                      id="lastFour"
                      placeholder="1234"
                      value={newCard.lastFourDigits}
                      onChange={(e) =>
                        setNewCard({
                          ...newCard,
                          lastFourDigits: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="limit">Credit Limit</Label>
                    <Input
                      id="limit"
                      type="number"
                      placeholder="5000"
                      value={newCard.limit}
                      onChange={(e) =>
                        setNewCard({ ...newCard, limit: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="balance">Current Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      placeholder="0"
                      value={newCard.balance}
                      onChange={(e) =>
                        setNewCard({ ...newCard, balance: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={addCardHandler} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </div>

              {/* Existing Cards */}
              <div className="space-y-3">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{card.name}</p>
                      <p className="text-sm text-muted-foreground">
                        **** {card.lastFourDigits}
                      </p>
                      <p className="text-sm">
                        Balance:{" "}
                        <span className="font-mono">
                          ${card.balance.toLocaleString()}
                        </span>{" "}
                        /
                        <span className="text-muted-foreground">
                          {" "}
                          ${card.limit.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCardHandler(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Expense */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Add Expense
              </CardTitle>
              <CardDescription>
                Record a new expense and it will be automatically categorized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="expenseCard">Credit Card</Label>
                <Select
                  value={newExpense.cardId}
                  onValueChange={(value) =>
                    setNewExpense({ ...newExpense, cardId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a card" />
                  </SelectTrigger>
                  <SelectContent>
                    {cards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name} (**** {card.lastFourDigits})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expenseAmount">Amount</Label>
                  <Input
                    id="expenseAmount"
                    type="number"
                    placeholder="100.00"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="expenseSubcategory">Category</Label>
                  <Select
                    value={newExpense.subcategory}
                    onValueChange={(value) =>
                      setNewExpense({ ...newExpense, subcategory: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(subcategories).map(
                        ([category, items]) => (
                          <div key={category}>
                            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </div>
                            {items.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                <div className="flex items-center gap-2">
                                  <item.icon className="h-4 w-4" />
                                  {item.label}
                                </div>
                              </SelectItem>
                            ))}
                          </div>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="expenseDescription">Description</Label>
                <Input
                  id="expenseDescription"
                  placeholder="e.g., New shoes from Nike"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <Button onClick={addExpenseHandler} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Expense Summary */}
        {expenses.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
              <CardDescription>
                Your spending categorized according to the 50-30-20 rule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-chart-1/10 rounded-lg border border-chart-1/20">
                  <Heart className="h-8 w-8 text-chart-1 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-chart-1">
                    ${needsExpenses.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Needs (50%)</p>
                </div>
                <div className="text-center p-4 bg-chart-2/10 rounded-lg border border-chart-2/20">
                  <Coffee className="h-8 w-8 text-chart-2 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-chart-2">
                    ${wantsExpenses.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Wants (30%)</p>
                </div>
                <div className="text-center p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                  <PiggyBank className="h-8 w-8 text-chart-3 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-chart-3">
                    ${savingsExpenses.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Savings (20%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Expenses */}
        {expenses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>
                Your latest transactions with automatic categorization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses
                  .slice()
                  .reverse()
                  .map((expense) => {
                    const card = cards.find((c) => c.id === expense.cardId);
                    const CategoryIcon = getCategoryIcon(expense.category);
                    const SubcategoryIcon = getSubcategoryIcon(
                      expense.subcategory
                    );

                    return (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${getCategoryColor(
                              expense.category
                            )}`}
                          >
                            <CategoryIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <SubcategoryIcon className="h-3 w-3" />
                              <span>{expense.subcategory}</span>
                              {card && <span>• {card.name}</span>}
                              <span>• {expense.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-semibold">
                            ${expense.amount.toLocaleString()}
                          </p>
                          <Badge
                            variant="outline"
                            className={getCategoryColor(expense.category)}
                          >
                            {expense.category}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default CreditCardManager;
