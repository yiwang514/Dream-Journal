import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDreams from '../hooks/useDreams'

describe('useDreams', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with preset dreams', () => {
    const { result } = renderHook(() => useDreams())
    expect(result.current.dreams.length).toBe(3)
  })

  it('adds a new dream', () => {
    const { result } = renderHook(() => useDreams())
    act(() => {
      result.current.addDream('新梦想', 10000)
    })
    expect(result.current.dreams.length).toBe(4)
    const newDream = result.current.dreams[3]
    expect(newDream.name).toBe('新梦想')
    expect(newDream.target).toBe(10000)
    expect(newDream.saved).toBe(0)
  })

  it('deletes a dream', () => {
    const { result } = renderHook(() => useDreams())
    const firstId = result.current.dreams[0].id
    act(() => {
      result.current.deleteDream(firstId)
    })
    expect(result.current.dreams.length).toBe(2)
  })

  it('edits a dream name', () => {
    const { result } = renderHook(() => useDreams())
    const firstId = result.current.dreams[0].id
    act(() => {
      result.current.editDream(firstId, { name: '新名称' })
    })
    expect(result.current.dreams[0].name).toBe('新名称')
  })

  it('deposits to a dream', () => {
    const { result } = renderHook(() => useDreams())
    const firstId = result.current.dreams[0].id
    const initialSaved = result.current.dreams[0].saved
    act(() => {
      result.current.deposit(firstId, 500)
    })
    expect(result.current.dreams[0].saved).toBe(initialSaved + 500)
  })

  it('does not deposit negative amount', () => {
    const { result } = renderHook(() => useDreams())
    const firstId = result.current.dreams[0].id
    const initialSaved = result.current.dreams[0].saved
    act(() => {
      result.current.deposit(firstId, -100)
    })
    expect(result.current.dreams[0].saved).toBe(initialSaved)
  })

  it('caps deposit at target', () => {
    const { result } = renderHook(() => useDreams())
    const firstDream = result.current.dreams[0]
    const overshoot = firstDream.target - firstDream.saved + 1000
    act(() => {
      result.current.deposit(firstDream.id, overshoot)
    })
    expect(result.current.dreams[0].saved).toBe(firstDream.target)
  })

  it('undoes a dream delete', () => {
    const { result } = renderHook(() => useDreams())
    const firstId = result.current.dreams[0].id
    act(() => {
      result.current.deleteDream(firstId)
    })
    expect(result.current.dreams.length).toBe(2)
    act(() => {
      result.current.undoDeleteDream()
    })
    expect(result.current.dreams.length).toBe(3)
  })

  it('imports dreams', () => {
    const { result } = renderHook(() => useDreams())
    const newDreams = [{
      id: 999,
      name: '导入的',
      target: 1000,
      saved: 500,
      barColor: 'from-rose-400 to-pink-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
    }]
    act(() => {
      result.current.importDreams(newDreams)
    })
    expect(result.current.dreams).toEqual(newDreams)
  })
})
