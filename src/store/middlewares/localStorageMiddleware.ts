// middlewares/localStorageMiddleware.ts
import type {Middleware} from '@reduxjs/toolkit'
import type {RootState} from "@/store/store.ts";

const STORAGE_KEY = 'financeApp'

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)

  try {
    const state: RootState = store.getState()
    const dataToSave = {
      accounts: state.accounts,
      transactions: state.transactions,
      categories: state.categories
    }
    console.log('Saving to localStorage:', dataToSave)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }

  return result
}

export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return undefined

    const parsed = JSON.parse(saved)

    if (parsed.accounts && parsed.transactions && parsed.categories) {
      return {
        accounts: parsed.accounts,
        transactions: parsed.transactions,
        categories: parsed.categories
      }
    }

    return undefined
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)
    return undefined
  }
}