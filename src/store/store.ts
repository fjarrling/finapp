import {configureStore, type Action, type ThunkAction, combineReducers} from '@reduxjs/toolkit'
import {useDispatch, useSelector, useStore} from 'react-redux'
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import accountsReducer from './accountsSlice'
import transactionsReducer from './transactionsSlice'
import categoriesReducer from './categoriesSlice'

const rootReducer = combineReducers({
  accounts: accountsReducer,
  transactions: transactionsReducer,
  categories: categoriesReducer,
})

const persistedConfig = {
  key: 'finApp',
  storage,
}

const persistedReducer = persistReducer(persistedConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()