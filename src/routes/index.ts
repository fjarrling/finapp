import type {RouteObject} from "react-router";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import Transactions from "@/pages/Transactions";
import RootLayout from "@/Layouts/RootLayout/RootLayout";
import Categories from "@/pages/Categories";


const ROUTES: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/accounts",
        Component: Accounts
      },
      {
        path: "/categories",
        Component: Categories
      },
      {
        path: "/transactions",
        Component: Transactions
      }

    ]
  },
];

export default ROUTES;
