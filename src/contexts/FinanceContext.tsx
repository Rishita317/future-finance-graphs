import { createContext, useContext, useState, ReactNode } from "react";

interface CreditCard {
  id: string;
  name: string;
  lastFourDigits: string;
  limit: number;
  balance: number;
}

interface Expense {
  id: string;
  cardId: string;
  amount: number;
  description: string;
  category: "needs" | "wants" | "savings";
  subcategory: string;
  date: string;
}

interface FinanceContextType {
  monthlyIncome: number;
  setMonthlyIncome: (income: number) => void;
  cards: CreditCard[];
  addCard: (card: Omit<CreditCard, "id">) => void;
  removeCard: (cardId: string) => void;
  updateCardBalance: (cardId: string, newBalance: number) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id" | "date">) => void;
  removeExpense: (expenseId: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};

interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider = ({ children }: FinanceProviderProps) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addCard = (cardData: Omit<CreditCard, "id">) => {
    const newCard: CreditCard = {
      ...cardData,
      id: Date.now().toString(),
    };
    setCards((prev) => [...prev, newCard]);
  };

  const removeCard = (cardId: string) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    // Also remove all expenses for this card
    setExpenses((prev) => prev.filter((expense) => expense.cardId !== cardId));
  };

  const updateCardBalance = (cardId: string, newBalance: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, balance: newBalance } : card
      )
    );
  };

  const addExpense = (expenseData: Omit<Expense, "id" | "date">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const removeExpense = (expenseId: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
  };

  const value: FinanceContextType = {
    monthlyIncome,
    setMonthlyIncome,
    cards,
    addCard,
    removeCard,
    updateCardBalance,
    expenses,
    addExpense,
    removeExpense,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};
