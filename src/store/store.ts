import {configureStore} from '@reduxjs/toolkit'
import accountsReducer from './accountsSlice'
import transactionsReducer from './transactionSlice'
import categoriesReducer from './categoriesSlice'
import {useDispatch, useSelector, useStore} from 'react-redux'
import {localStorageMiddleware, loadFromLocalStorage} from './middlewares/localStorageMiddleware'
import type {Action, ThunkAction} from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
  preloadedState: loadFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()