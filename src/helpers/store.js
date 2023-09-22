import create from 'zustand'
import shallow from 'zustand/shallow'
import { subscribeWithSelector } from 'zustand/middleware'

const useStoreImpl = create(
  subscribeWithSelector((set) => {
    return {
      loaded: true,
    }
  }),
)

const useStore = (sel) => useStoreImpl(sel, shallow)
Object.assign(useStore, useStoreImpl)

const { getState, setState } = useStoreImpl

export { getState, setState }
export default useStore
