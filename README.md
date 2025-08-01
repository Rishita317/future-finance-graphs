# Future Finance - Smart Budgeting & Expense Tracking

A comprehensive financial management application that combines price prediction, budgeting with the 50-30-20 rule, and intelligent credit card expense tracking with automatic categorization.

## Features

### 🎯 Price Predictions

- Advanced price prediction algorithms
- Historical data analysis
- Trend visualization with interactive charts

### 💰 50-30-20 Budget Calculator

- **50% for Needs**: Housing, utilities, groceries, transportation, insurance, healthcare
- **30% for Wants**: Dining out, entertainment, shopping, travel, hobbies, beauty
- **20% for Savings**: Emergency fund, retirement, investments, debt payment

### 💳 Credit Card & Expense Tracker

- **Add Multiple Credit Cards**: Track different cards with balances and limits
- **Automatic Expense Categorization**: Expenses are automatically categorized based on the 50-30-20 rule
- **Smart Subcategories**:
  - **Needs**: Housing/Rent, Utilities, Groceries, Transportation, Insurance, Healthcare
  - **Wants**: Dining Out, Entertainment, Shopping, Travel, Hobbies, Beauty/Personal Care
  - **Savings**: Emergency Fund, Retirement, Investments, Debt Payment

### 📊 Spending Analytics

- **Real-time Budget Performance**: Track how you're doing against the 50-30-20 rule
- **Spending Trends**: Visualize daily spending patterns over time
- **Category Breakdown**: See where your money is going with detailed charts
- **Smart Insights**: Get personalized recommendations and warnings
- **Time Range Analysis**: View data for week, month, quarter, or year

### 🎨 Modern UI/UX

- Dark/Light theme toggle
- Responsive design for all devices
- Interactive charts and visualizations
- Smooth navigation between sections

## How It Works

### Adding Credit Cards

1. Navigate to the "Cards" section
2. Click "Add New Card"
3. Enter card name, last 4 digits, credit limit, and current balance
4. Your card will be saved and ready for expense tracking

### Recording Expenses

1. Select a credit card from your saved cards
2. Enter the expense amount
3. Choose the appropriate subcategory (e.g., "Shopping" for new shoes)
4. Add a description (e.g., "New Nike shoes")
5. The system automatically categorizes it as "Wants" (30% category)

### Understanding the Categorization

- **Needs (50%)**: Essential expenses you can't live without
- **Wants (30%)**: Discretionary spending that enhances your lifestyle
- **Savings (20%)**: Money set aside for future financial security

### Analytics & Insights

- View your spending breakdown by category
- See how you're tracking against budget limits
- Get alerts when approaching budget thresholds
- Analyze spending trends over time
- Receive personalized financial insights

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Components**: Shadcn/ui with Tailwind CSS
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd future-finance-graphs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage Examples

### Example 1: Buying Shoes

- **Expense**: $100 for new shoes
- **Subcategory**: Shopping
- **Automatic Categorization**: Wants (30%)
- **Result**: Shows in "Wants" category with shopping icon

### Example 2: Grocery Shopping

- **Expense**: $150 for groceries
- **Subcategory**: Groceries
- **Automatic Categorization**: Needs (50%)
- **Result**: Shows in "Needs" category with utensils icon

### Example 3: Emergency Fund Contribution

- **Expense**: $200 for emergency fund
- **Subcategory**: Emergency Fund
- **Automatic Categorization**: Savings (20%)
- **Result**: Shows in "Savings" category with piggy bank icon

## Features in Detail

### Budget Calculator

- Enter your monthly after-tax income
- See instant breakdown of 50-30-20 allocation
- Visual pie chart and bar chart representations
- Annual projections and recommendations

### Credit Card Management

- Add multiple credit cards with different limits
- Track current balances automatically
- Remove cards and associated expenses
- Real-time balance updates

### Expense Tracking

- Automatic categorization based on subcategory selection
- Detailed expense history with dates and descriptions
- Visual indicators for each category
- Easy expense management

### Analytics Dashboard

- Time-based filtering (week/month/quarter/year)
- Budget performance tracking
- Spending trend analysis
- Top spending categories
- Personalized insights and recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Future Finance** - Making personal finance management smarter and more intuitive.
