import type {FC} from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import ROUTES from "@/routes";

const AppRouter: FC = () => {
  const router = createBrowserRouter(ROUTES)

  return <RouterProvider router={router}/>
}

export default AppRouter;