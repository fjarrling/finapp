import AppRouter from "@/components/AppRouter/AppRouter.tsx";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {StrictMode} from "react";
import {loadDefaultCategories} from "@/store/categoriesSlice";

function App() {
  store.dispatch(loadDefaultCategories())

  return (
    <StrictMode>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </StrictMode>
  )
}

export default App
