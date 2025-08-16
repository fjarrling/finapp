import ROUTES from "@/routes"
import { createBrowserRouter, RouterProvider } from "react-router"

const AppRouter = () => {
  const router = createBrowserRouter(ROUTES);
  return <RouterProvider router={router}/>;
};

export default AppRouter;
