import AppRouter from "@/components/AppRouter/AppRouter";
import {StrictMode} from "react";
import {Provider} from "react-redux";
import {persistor, store} from "@/store/store";
import {PersistGate} from 'redux-persist/integration/react'
import {ThemeProvider} from "@/components/ThemeProvider/ThemeProvider";

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppRouter/>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

export default App
