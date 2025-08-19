import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
  type Transaction,
  type TransactionId,
} from "@/store/transactionSlice";
import {changeBalance, selectAccountById} from "@/store/accountsSlice";
import {selectCategoryById} from "@/store/categoriesSlice";
import {selectTransactionById} from "@/store/transactionSlice";
import type {RootState} from "@/store/store";

export interface CreateTransactionData {
  accountId: string;
  amount: number;
  date: string;
  categoryId: string;
  description?: string;
}

export interface UpdateTransactionData {
  id: TransactionId;
  accountId?: string;
  amount?: number;
  date?: string;
  categoryId?: string;
  description?: string;
}

const calcBalanceChange = (amount: number, type: "income" | "expense") =>
  type === "income" ? Math.abs(amount) : -Math.abs(amount);

const genId = () => `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;


export const addTransactionThunk = createAsyncThunk<
  Transaction,
  CreateTransactionData,
  { state: RootState; rejectValue: string }
>("transactions/addTransactionThunk", async (data, {dispatch, getState, rejectWithValue}) => {
  const state = getState();

  const account = selectAccountById(data.accountId)(state);
  if (!account) return rejectWithValue(`Account ${data.accountId} not found`);

  const category = selectCategoryById(state, data.categoryId);
  if (!category) return rejectWithValue(`Category ${data.categoryId} not found`);

  const transaction: Transaction = {...data, id: genId(), amount: Math.abs(data.amount)};

  const balanceChange = calcBalanceChange(transaction.amount, category.type);

  dispatch(addTransaction(transaction));
  dispatch(changeBalance({id: data.accountId, delta: balanceChange}));

  return transaction;
});


export const removeTransactionThunk = createAsyncThunk<
  Transaction,
  TransactionId,
  { state: RootState; rejectValue: string }
>("transactions/removeTransactionThunk", async (id, {dispatch, getState, rejectWithValue}) => {
  const state = getState();

  const transaction = selectTransactionById(state, id);

  if (!transaction) return rejectWithValue(`Transaction ${id} not found`);

  const account = selectAccountById(transaction.accountId)(state);
  if (!account) return rejectWithValue(`Account ${transaction.accountId} not found`);

  const category = selectCategoryById(state, transaction.categoryId);
  if (!category) return rejectWithValue(`Category ${transaction.categoryId} not found`);

  const rollback = -calcBalanceChange(transaction.amount, category.type);

  dispatch(removeTransaction({id}));
  dispatch(changeBalance({id: transaction.accountId, delta: rollback}));

  return transaction;
});


export const updateTransactionThunk = createAsyncThunk<
  Transaction,
  UpdateTransactionData,
  { state: RootState; rejectValue: string }
>("transactions/updateTransactionThunk", async (updateData, {dispatch, getState, rejectWithValue}) => {
  const state = getState();

  const prev = selectTransactionById(state, updateData.id);

  if (!prev) return rejectWithValue(`Transaction ${updateData.id} not found`);

  const newAccountId = updateData.accountId ?? prev.accountId;
  const newCategoryId = updateData.categoryId ?? prev.categoryId;
  const newAmount = updateData.amount !== undefined ? Math.abs(updateData.amount) : prev.amount;

  const account = selectAccountById(newAccountId)(state);
  if (!account) return rejectWithValue(`Account ${newAccountId} not found`);

  const category = selectCategoryById(state, newCategoryId);
  if (!category) return rejectWithValue(`Category ${newCategoryId} not found`);

  // 1. Откатываем старое
  const oldCategory = selectCategoryById(state, prev.categoryId);
  if (!oldCategory) return rejectWithValue("Old category not found");

  const oldDelta = calcBalanceChange(prev.amount, oldCategory.type);
  dispatch(changeBalance({id: prev.accountId, delta: -oldDelta}));

  // 2. Обновляем транзакцию
  const updated: Transaction = {...prev, ...updateData, amount: newAmount};
  dispatch(updateTransaction(updated));

  // 3. Применяем новое изменение
  const newDelta = calcBalanceChange(newAmount, category.type);

  dispatch(changeBalance({id: newAccountId, delta: newDelta}));

  return updated;
});
