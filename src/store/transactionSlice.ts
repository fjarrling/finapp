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

export const selectTransactionById = (id: string) => (state: RootState): Transaction | undefined =>
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

// TODO export const selectDashboardMetrics

export const {addTransaction, removeTransaction, updateTransaction} = transactionsSlice.actions;

export default transactionsSlice.reducer;