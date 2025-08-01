import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type RootState} from "@/store/store.ts";

type CategoryType = 'income' | 'expense'

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  description?: string | undefined;
}

type CategoryId = string

interface CategoriesState {
  categories: Record<CategoryId, Category>
}

const initialState: CategoriesState = {
  categories: {}
}



const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
      addCategory: (state, action: PayloadAction<Category>) => {
        state.categories[action.payload.id] = action.payload
      },
      removeCategory: (state, action: PayloadAction<{ id: CategoryId }>) => {
        delete state.categories[action.payload.id]
      },
      updateCategory: (state, action: PayloadAction<{
        id: string;
        name?: string;
        type?: CategoryType;
        description?: string | undefined;
      }>) => {
        const {id, ...changes} = action.payload
        const targetCategory = state.categories[id]
        if (!targetCategory) return
        state.categories[id] = {
          ...targetCategory,
          ...changes
        }
      },

    }
  }
)

export const selectCategoriesMap = (state: RootState) =>
  state.categories.categories

export const selectAllCategories = createSelector(
  (state: RootState) => state.categories.categories,
  (categories) => Object.values(categories)
)

export const selectCategoryById = (state: RootState, id: CategoryId) =>
  state.categories.categories[id]

export const selectIncomeCategories = createSelector(
  selectAllCategories,
  (categories) => categories.filter(category => category.type === 'income')
)

export const selectExpenseCategories = createSelector(
  selectAllCategories,
  (categories) => categories.filter(category => category.type === 'expense')
)

export const {addCategory, removeCategory, updateCategory} = categoriesSlice.actions
export default categoriesSlice.reducer