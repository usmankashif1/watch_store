import RootNavigation from '@/src/navigation/RootNavigation'
import { persistor, store } from '@/src/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

const _layout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>

  )
}

export default _layout