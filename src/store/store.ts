import {configureStore} from '@reduxjs/toolkit'
import accountsReducer from './accountsSlice';
import transactionsReducer from './transactionSlice';
import {useDispatch, useSelector, useStore} from "react-redux";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();