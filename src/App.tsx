import AppRouter from "@/components/AppRouter/AppRouter.tsx";
import {StrictMode} from "react";
import {Provider} from "react-redux";
import {persistor, store} from "@/store/store";
import {PersistGate} from 'redux-persist/integration/react'

function App() {

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AppRouter/>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

export default App
