import type {RouteObject} from "react-router";
import Home from "@/pages/Home";
import Accounts from "@/pages/Accounts";


const ROUTES: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/accounts",
    Component: Accounts
  }
];

export default ROUTES;
