import {createSelector, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/store/store';

export interface Account {
  id: AccountId;
  name: string;
  balance: number;
  description?: string;
}

type AccountId = string

interface AccountsState {
  accounts: Record<AccountId, Account>;
}

const initialState: AccountsState = {
  accounts: {
    't-bank': {
      id: 't-bank',
      name: 'T-bank',
      balance: 1235,
    }
  }
}

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts[action.payload.id] = action.payload;
    },
    removeAccount: (state, action: PayloadAction<{ id: AccountId }>) => {
      delete state.accounts[action.payload.id]
    },
    updateAccount: (state, action: PayloadAction<{
      id: AccountId,
      name?: string;
      balance?: number;
      description?: string;
    }>) => {
      const {id, ...changes} = action.payload;
      const targetAccount = state.accounts[id];
      if (!targetAccount) return
      state.accounts[id] = {
        ...targetAccount,
        ...changes,
      }
    },
    updateBalance: (state, action: PayloadAction<{ id: AccountId, amount: number }>) => {
      if (state.accounts[action.payload.id]) {
        state.accounts[action.payload.id].balance = action.payload.amount;
      }
    },
    changeBalance: (state, action: PayloadAction<{ id: AccountId; delta: number }>) => {
      if (state.accounts[action.payload.id]) {
        state.accounts[action.payload.id].balance += action.payload.delta;
      }
    },
    renameAccount: (state, action: PayloadAction<{ id: AccountId; name: string }>) => {
      if (state.accounts[action.payload.id]) {
        state.accounts[action.payload.id].name = action.payload.name;
      }
    },
  }
})

export const selectAccountsMap = (state: RootState) => state.accounts.accounts;

export const selectAllAccounts = createSelector(
  (state: RootState) => state.accounts.accounts,
  (accounts) => Object.values(accounts)
)

export const selectAccountById = (id: string) => (state: RootState) =>
  state.accounts.accounts[id];

export const selectAccountBalance = (id: string) => (state: RootState) =>
  state.accounts.accounts[id]?.balance;

export const selectAccountName = (id: string) => (state: RootState) =>
  state.accounts.accounts[id]?.name;

export const selectTotalBalance = createSelector(
  selectAllAccounts,
  (accounts) =>
    accounts.reduce((sum, account) => sum + account.balance, 0)
)

export const {addAccount, removeAccount, updateBalance, renameAccount, changeBalance} = accountsSlice.actions;
export default accountsSlice.reducer;