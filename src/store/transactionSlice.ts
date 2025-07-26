import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
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
    removeTransaction: (state, action: PayloadAction<{ id: string }>) => {
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
      const currentTransaction = state.transactions[id];
      if (!currentTransaction) return;

      state.transactions[id] = {
        ...currentTransaction,
        ...changes,
      };
    },
  }
})

export const selectTransactionsMap = (state: RootState) =>
  state.transactions.transactions;

export const selectAllTransactions = (state: RootState): Transaction[] =>
  Object.values(state.transactions.transactions);

export const selectTransactionById = (state: RootState, id: string): Transaction | undefined =>
  state.transactions.transactions[id];

export const selectTransactionsByAccountId = (state: RootState, accountId: string): Transaction[] =>
  Object.values(state.transactions.transactions).filter(t => t.accountId === accountId);

export const {addTransaction, removeTransaction, updateTransaction} = transactionsSlice.actions;
export default transactionsSlice.reducer;