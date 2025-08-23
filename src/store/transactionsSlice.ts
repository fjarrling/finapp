import {createSelector, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {type RootState} from '@/store/store';

export const TRANSACTION_TYPES = ['income', 'expense'] as const

export type TransactionType = typeof TRANSACTION_TYPES[number]

export type TransactionId = string

export interface Transaction {
  id: TransactionId;
  accountId: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  description?: string | undefined;
}


interface TransactionsState {
  transactions: Record<TransactionId, Transaction>
}

const initialState: TransactionsState = {
  transactions: {}
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions[action.payload.id] = action.payload
    },
    removeTransaction: (state, action: PayloadAction<{ id: TransactionId }>) => {
      delete state.transactions[action.payload.id]
    },
    updateTransaction: (state, action: PayloadAction<{
      id: string,
      accountId?: string,
      amount?: number,
      type?: TransactionType
      description?: string,
      date?: string,
      categoryId?: string
    }>) => {
      const {id, ...changes} = action.payload;
      const targetTransaction = state.transactions[id];
      if (!targetTransaction) return;

      state.transactions[id] = {
        ...targetTransaction,
        ...changes,
      };
    },
  }
})

export const selectTransactionsMap = (state: RootState) =>
  state.transactions.transactions;


export const selectAllTransactions = createSelector(
  (state: RootState) => state.transactions.transactions,
  (transactions) => Object.values(transactions)
)

export const selectTransactionById = (id: string) =>
  (state: RootState): Transaction | undefined =>
    state.transactions.transactions[id];

export const selectIncomeTransactions = createSelector(
  selectAllTransactions,
  (transactions) =>
    transactions.filter(transaction => transaction.type === 'income')
)

export const selectExpenseTransactions = createSelector(
  selectAllTransactions,
  (transactions) =>
    transactions.filter(transaction => transaction.type === 'expense')
)

export const selectTransactionsByAccountId = createSelector(
  selectAllTransactions,
  (_: RootState, accountId: string) => accountId,
  (transactions, accountId) =>
    transactions.filter(transaction => transaction.accountId === accountId)
)

export const selectDashboardMetrics = createSelector(
  selectAllTransactions,
  (_: RootState, accountId: string) => accountId,
  (transactions, accountId) => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    let income = 0
    let expense = 0
    let lastMonthIncome = 0
    let lastMonthExpense = 0

    transactions.forEach(t => {
      if (accountId !== 'total' && t.accountId !== accountId) return

      const date = new Date(t.date)
      const isCurrentMonth = date.getMonth() === currentMonth && date.getFullYear() === currentYear
      const isLastMonth = date.getMonth() === prevMonth && date.getFullYear() === prevMonthYear

      if (isCurrentMonth) {
        if (t.type === 'income') income += t.amount
        if (t.type === 'expense') expense += t.amount
      } else if (isLastMonth) {
        if (t.type === 'income') lastMonthIncome += t.amount
        if (t.type === 'expense') lastMonthExpense += t.amount
      }
    })

    const savings = income - expense
    const lastMonthSavings = lastMonthIncome - lastMonthExpense

    const incomeDiff = lastMonthIncome ? Math.round(((income - lastMonthIncome) / lastMonthIncome) * 100) : 0
    const expenseDiff = lastMonthExpense ? Math.round(((expense - lastMonthExpense) / lastMonthExpense) * 100) : 0
    const savingsDiff = lastMonthSavings ? Math.round(((savings - lastMonthSavings) / lastMonthSavings) * 100) : 0

    return {income, expense, savings, incomeDiff, expenseDiff, savingsDiff}
  }
)

export const {addTransaction, removeTransaction, updateTransaction} = transactionsSlice.actions;

export default transactionsSlice.reducer;