import {describe, it, expect} from 'vitest'
import accountsReducer, {
  addAccount,
  updateBalance,
  changeBalance,
  renameAccount,
  removeAccount,
} from './accountsSlice'

describe('accountsSlice', () => {
  it('should handle addAccount', () => {
    const initialState = {accounts: {}}
    const action = addAccount({id: '1', name: 'Main', balance: 100})
    const state = accountsReducer(initialState, action)
    expect(state.accounts['1']).toEqual({id: '1', name: 'Main', balance: 100})
  })

  it('should handle updateBalance', () => {
    const initialState = {accounts: {'1': {id: '1', name: 'Main', balance: 100}}}
    const action = updateBalance({id: '1', amount: 200})
    const state = accountsReducer(initialState, action)
    expect(state.accounts['1'].balance).toBe(200)
  })

  it('should handle changeBalance', () => {
    const initialState = {accounts: {'1': {id: '1', name: 'Main', balance: 100}}}
    const action = changeBalance({id: '1', delta: -50})
    const state = accountsReducer(initialState, action)
    expect(state.accounts['1'].balance).toBe(50)
  })

  it('should handle renameAccount', () => {
    const initialState = {accounts: {'1': {id: '1', name: 'Main', balance: 100}}}
    const action = renameAccount({id: '1', name: 'Savings'})
    const state = accountsReducer(initialState, action)
    expect(state.accounts['1'].name).toBe('Savings')
  })

  it('should handle removeAccount', () => {
    const initialState = {accounts: {'1': {id: '1', name: 'Main', balance: 100}}}
    const action = removeAccount({id: '1'})
    const state = accountsReducer(initialState, action)
    expect(state.accounts['1']).toBeUndefined()
  })
})
