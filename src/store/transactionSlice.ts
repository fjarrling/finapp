import {createSelector, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {type RootState} from '@/store/store';

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  description?: string | undefined;
  date: string
  categoryId?: string
}

type TransactionId = string

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

export const selectTransactionById = (state: RootState, id: string): Transaction | undefined =>
  state.transactions.transactions[id];


export const selectTransactionsByAccountId = createSelector(
  selectAllTransactions,
  (accountId: string) => accountId,
  (transactions, accountId) =>
    transactions.filter(transaction => transaction.accountId === accountId)
)

export const {addTransaction, removeTransaction, updateTransaction} = transactionsSlice.actions;
export default transactionsSlice.reducer;