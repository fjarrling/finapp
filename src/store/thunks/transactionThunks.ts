import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
  type Transaction,
  type TransactionId,
  type TransactionType,
} from "@/store/transactionSlice";
import {changeBalance, selectAccountById} from "@/store/accountsSlice";
import {selectCategoryById} from "@/store/categoriesSlice";
import {selectTransactionById} from "@/store/transactionSlice";
import type {RootState} from "@/store/store";

export interface CreateTransactionData {
  id: TransactionId;
  accountId: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  description?: string;
}

export interface UpdateTransactionData {
  id: TransactionId;
  type?: TransactionType;
  accountId?: string;
  amount?: number;
  date?: string;
  categoryId?: string;
  description?: string;
}

const calcBalanceDelta = (amount: number, type: TransactionType) =>
  type === "income" ? Math.abs(amount) : -Math.abs(amount);

export const addTransactionThunk = createAsyncThunk<
  Transaction,
  CreateTransactionData,
  { state: RootState; rejectValue: string }
>("transactions/addTransactionThunk", async (payload, {dispatch, getState, rejectWithValue}) => {
  const state = getState();

  const account = selectAccountById(payload.accountId)(state);
  if (!account) return rejectWithValue(`Account ${payload.accountId} not found`);

  const category = selectCategoryById(payload.categoryId)(state);
  if (!category) return rejectWithValue(`Category ${payload.categoryId} not found`);

  const transaction: Transaction = {...payload, amount: Math.abs(payload.amount)};

  const balanceDelta = calcBalanceDelta(transaction.amount, category.type);

  dispatch(addTransaction(transaction));
  dispatch(changeBalance({id: payload.accountId, delta: balanceDelta}));

  return transaction;
});


export const removeTransactionThunk = createAsyncThunk<
  Transaction,
  TransactionId,
  { state: RootState; rejectValue: string }
>("transactions/removeTransactionThunk", async (transactionId, {dispatch, getState, rejectWithValue}) => {
  const state = getState();

  const transaction = selectTransactionById(transactionId)(state);

  if (!transaction) return rejectWithValue(`Transaction ${transactionId} not found`);

  const account = selectAccountById(transaction.accountId)(state);
  if (!account) return rejectWithValue(`Account ${transaction.accountId} not found`);

  const category = selectCategoryById(transaction.categoryId)(state);
  if (!category) return rejectWithValue(`Category ${transaction.categoryId} not found`);

  const rollback = -calcBalanceDelta(transaction.amount, category.type);

  dispatch(removeTransaction({id: transactionId}));
  dispatch(changeBalance({id: transaction.accountId, delta: rollback}));

  return transaction;
});


export const updateTransactionThunk = createAsyncThunk<
  Transaction,
  UpdateTransactionData,
  { state: RootState; rejectValue: string }
>("transactions/updateTransactionThunk", async (payload, {dispatch, getState, rejectWithValue}) => {
  const state = getState();

  const prevTransaction = selectTransactionById(payload.id)(state);

  if (!prevTransaction) return rejectWithValue(`Transaction ${payload.id} not found`);

  const newAccountId = payload.accountId ?? prevTransaction.accountId;
  const newCategoryId = payload.categoryId ?? prevTransaction.categoryId;
  const newAmount = payload.amount !== undefined ? Math.abs(payload.amount) : prevTransaction.amount;

  const account = selectAccountById(newAccountId)(state);
  if (!account) return rejectWithValue(`Account ${newAccountId} not found`);

  const category = selectCategoryById(newCategoryId)(state);
  if (!category) return rejectWithValue(`Category ${newCategoryId} not found`);

  // 1. Откатываем старое
  const prevCategory = selectCategoryById(prevTransaction.categoryId)(state);
  if (!prevCategory) return rejectWithValue("Old category not found");

  const oldDelta = calcBalanceDelta(prevTransaction.amount, prevCategory.type);
  dispatch(changeBalance({id: prevTransaction.accountId, delta: -oldDelta}));

  // 2. Обновляем транзакцию
  const updatedTransaction: Transaction = {...prevTransaction, ...payload, amount: newAmount};
  dispatch(updateTransaction(updatedTransaction));

  // 3. Применяем новое изменение
  const newDelta = calcBalanceDelta(newAmount, category.type);

  dispatch(changeBalance({id: newAccountId, delta: newDelta}));

  return updatedTransaction;
});
