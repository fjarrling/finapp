import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/store/store';

export interface Account {
  id: string;
  name: string;
  balance: number;
}

type AccountId = string

interface AccountsState {
  accounts: Record<AccountId, Account>;
}

const initialState: AccountsState = {
  accounts: {}
}

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<{ id: string, name: string, balance?: number }>) => {
      state.accounts[action.payload.id] = {
        id: action.payload.id,
        name: action.payload.name,
        balance: action.payload.balance || 0
      }
    },
    removeAccount: (state, action: PayloadAction<{ id: string }>) => {
      delete state.accounts[action.payload.id]
    },
    updateBalance: (state, action: PayloadAction<{ id: string, amount: number }>) => {
      if (state.accounts[action.payload.id]) {
        state.accounts[action.payload.id].balance = action.payload.amount;
      }
    },
    changeBalance: (state, action: PayloadAction<{ id: string; delta: number }>) => {
      if (state.accounts[action.payload.id]) {
        state.accounts[action.payload.id].balance += action.payload.delta;
      }
    },
    renameAccount: (state, action: PayloadAction<{ id: string; name: string }>) => {
      if (state.accounts[action.payload.id]) {
        state.accounts[action.payload.id].name = action.payload.name;
      }
    },
  }
})

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export const selectAccountsArray = (state: RootState) =>
  Object.values(state.accounts.accounts);

export const selectAccountById = (id: string) => (state: RootState) =>
  state.accounts.accounts[id];

export const selectAccountBalance = (id: string) => (state: RootState) =>
  state.accounts.accounts[id]?.balance;

export const selectAccountName = (id: string) => (state: RootState) =>
  state.accounts.accounts[id]?.name;

export const {addAccount, removeAccount, updateBalance, renameAccount, changeBalance} = accountsSlice.actions;
export default accountsSlice.reducer;