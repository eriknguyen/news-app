import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { StoreManager } from '@/data/storeManager'

const STORE_KEY = 'viewHistory'

type ViewHistoryContextValue = {
  viewHistory: Record<string, number[]>
  addView: (title: string) => void
  clearHistory: () => void
}

const ViewHistoryContext = createContext<ViewHistoryContextValue | undefined>(
  undefined
)

const useViewHistory = () => {
  const context = useContext(ViewHistoryContext)
  if (!context) {
    throw new Error('useViewHistory must be used within a ViewHistoryProvider')
  }
  return context
}

const useLastView = (title: string) => {
  const context = useContext(ViewHistoryContext)
  if (!context) {
    throw new Error('useViewHistory must be used within a ViewHistoryProvider')
  }

  if (!title) {
    return null
  }

  const history = context.viewHistory[title]
  if (history && history.length > 1) {
    return history[0]
  } else {
    return null
  }
}

const ViewHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreManager | undefined>()
  const [viewHistory, setViewHistory] = useState<Record<string, number[]>>({})

  useEffect(() => {
    const ls = StoreManager.getInstance()
    setStore(ls)
    const persistedState = ls.getItem(STORE_KEY)
    if (persistedState) {
      setViewHistory(JSON.parse(persistedState))
    }
  }, [])

  const addView = (title: string) => {
    const timestamp = Date.now()
    const newHistory = {
      ...viewHistory,
      [title]: [...(viewHistory[title] || []), timestamp].sort((a, b) => b - a),
    }
    setViewHistory(newHistory)
    if (store) {
      store.setItem(STORE_KEY, JSON.stringify(newHistory))
    }
  }

  const clearHistory = () => {
    setViewHistory({})
    if (store) {
      store.setItem(STORE_KEY, JSON.stringify({}))
    }
  }

  const viewHistoryContextValue: ViewHistoryContextValue = {
    viewHistory,
    addView,
    clearHistory,
  }

  return (
    <ViewHistoryContext.Provider value={viewHistoryContextValue}>
      {children}
    </ViewHistoryContext.Provider>
  )
}

export { useLastView, useViewHistory, ViewHistoryProvider }
export type { ViewHistoryContextValue }
