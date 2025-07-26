import {configureStore} from '@reduxjs/toolkit'
import accountsReducer from './accountsSlice';
import transactionsReducer from './transactionSlice';
import categoriesSlice from "./categoriesSlice";
import {useDispatch, useSelector, useStore} from "react-redux";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
    categories: categoriesSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();