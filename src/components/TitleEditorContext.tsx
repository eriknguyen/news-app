import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { StoreManager } from '@/data/storeManager'

const STORE_KEY = 'titleMap'

type TitleMapContextValue = {
  titleMap: Record<string, string>
  updateTitle: (raw: string, custom: string) => void
}

const TitleMapContext = createContext<TitleMapContextValue | undefined>(
  undefined
)

const useTitleMap = () => {
  const context = useContext(TitleMapContext)
  if (!context) {
    throw new Error('useTitleMap must be used within a TitleMapProvider')
  }
  return context
}

const TitleMapProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreManager | undefined>()
  const [titleMap, setTitleMap] = useState<Record<string, string>>({})

  useEffect(() => {
    const ls = StoreManager.getInstance()
    setStore(ls)
    const persistedState = ls.getItem(STORE_KEY)
    if (persistedState) {
      setTitleMap(JSON.parse(persistedState))
    }
  }, [])

  const updateTitle = (raw: string, custom: string) => {
    setTitleMap((prevMap) => {
      const newMap = { ...prevMap, [raw]: custom }
      if (store) {
        store.setItem(STORE_KEY, JSON.stringify(newMap))
      }
      return newMap
    })
  }

  const titleMapContextValue: TitleMapContextValue = {
    titleMap,
    updateTitle,
  }

  return (
    <TitleMapContext.Provider value={titleMapContextValue}>
      {children}
    </TitleMapContext.Provider>
  )
}

export { TitleMapProvider, useTitleMap }
export type { TitleMapContextValue }
