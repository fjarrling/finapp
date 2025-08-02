import {createSelector, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '@/store/store';

export const CURRENCIES = ["RUB", "USD", "EUR"] as const;

export type Currency = typeof CURRENCIES[number];

// TODO: вынести отдельно в конфиг валюты
// TODO: Переосмыслить баланс, сделать чтобы баланс высчитывался на основе массива транзакций.

export interface Account {
  id: AccountId;
  name: string;
  balance: number;
  currency: Currency;
  description?: string;
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
      currency?: Currency;
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
    changeCurrency: (state, action: PayloadAction<{ id: AccountId; currency: Currency }>) => {
      if (state.accounts[action.payload.id]) {
        state.accounts[action.payload.id].currency = action.payload.currency;
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

export const selectAccountCurrency = (id: string) => (state: RootState) =>
  state.accounts.accounts[id]?.currency;

export const selectAccountsByCurrency = createSelector(
  selectAllAccounts,
  (accounts) =>
    accounts.reduce((acc, account) => {
      if (!acc[account.currency]) {
        acc[account.currency] = [];
      }
      acc[account.currency].push(account);
      return acc;
    }, {} as Record<Currency, Account[]>)
)

export const selectTotalBalanceByCurrency = createSelector(
  selectAllAccounts,
  (accounts) =>
    accounts.reduce((acc, account) => {
      if (!acc[account.currency]) {
        acc[account.currency] = 0;
      }
      acc[account.currency] += account.balance;
      return acc;
    }, {} as Record<Currency, number>)
)

export const selectTotalBalance = createSelector(
  selectAllAccounts,
  (accounts) =>
    accounts.reduce((sum, account) => sum + account.balance, 0)
)

export const {
  addAccount,
  removeAccount,
  updateAccount,
  updateBalance,
  renameAccount,
  changeBalance,
  changeCurrency
} = accountsSlice.actions;

export default accountsSlice.reducer;