import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useEntries from '../hooks/useEntries'

describe('useEntries', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with preset entries', () => {
    const { result } = renderHook(() => useEntries())
    expect(result.current.entries.length).toBe(5)
  })

  it('adds a new entry', () => {
    const { result } = renderHook(() => useEntries())
    act(() => {
      result.current.addEntry('测试日记')
    })
    expect(result.current.entries.length).toBe(6)
    expect(result.current.entries[0].text).toBe('测试日记')
  })

  it('deletes an entry', () => {
    const { result } = renderHook(() => useEntries())
    const firstId = result.current.entries[0].id
    act(() => {
      result.current.deleteEntry(firstId)
    })
    expect(result.current.entries.length).toBe(4)
    expect(result.current.entries.find(e => e.id === firstId)).toBeUndefined()
  })

  it('edits an entry', () => {
    const { result } = renderHook(() => useEntries())
    const firstId = result.current.entries[0].id
    act(() => {
      result.current.editEntry(firstId, '修改后的内容')
    })
    expect(result.current.entries[0].text).toBe('修改后的内容')
  })

  it('undoes a delete', () => {
    const { result } = renderHook(() => useEntries())
    const firstId = result.current.entries[0].id
    const firstText = result.current.entries[0].text
    act(() => {
      result.current.deleteEntry(firstId)
    })
    expect(result.current.entries.length).toBe(4)
    act(() => {
      result.current.undoDeleteEntry()
    })
    expect(result.current.entries.length).toBe(5)
    expect(result.current.entries[0].text).toBe(firstText)
  })

  it('imports entries', () => {
    const { result } = renderHook(() => useEntries())
    const newEntries = [{ id: 999, text: '导入的', time: '2026-01-01' }]
    act(() => {
      result.current.importEntries(newEntries)
    })
    expect(result.current.entries).toEqual(newEntries)
  })
})
