import AppRouter from "@/components/AppRouter/AppRouter.tsx";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {StrictMode} from "react";

function App() {

  return (
    <StrictMode>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </StrictMode>
  )
}

export default App
