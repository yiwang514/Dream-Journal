import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage, { loadFromStorage, saveToStorage } from '../hooks/useLocalStorage'

describe('loadFromStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns fallback when key does not exist', () => {
    expect(loadFromStorage('missing', 'default')).toBe('default')
  })

  it('returns parsed value when key exists', () => {
    localStorage.setItem('test', JSON.stringify({ a: 1 }))
    expect(loadFromStorage('test', {})).toEqual({ a: 1 })
  })

  it('returns fallback on invalid JSON', () => {
    localStorage.setItem('test', 'not-json')
    expect(loadFromStorage('test', 'fallback')).toBe('fallback')
  })
})

describe('saveToStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves data to localStorage', () => {
    saveToStorage('test', { a: 1 })
    expect(JSON.parse(localStorage.getItem('test')!)).toEqual({ a: 1 })
  })
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial value when no stored value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('returns stored value when it exists', () => {
    localStorage.setItem('test', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    expect(result.current[0]).toBe('stored')
  })

  it('updates value with direct value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    act(() => {
      result.current[1]('updated')
    })
    expect(result.current[0]).toBe('updated')
    expect(JSON.parse(localStorage.getItem('test')!)).toBe('updated')
  })

  it('updates value with function updater', () => {
    const { result } = renderHook(() => useLocalStorage('test', 0))
    act(() => {
      result.current[1](prev => prev + 1)
    })
    expect(result.current[0]).toBe(1)
  })
})
