import type {RouteObject} from "react-router";
import Home from "@/pages/Home";


const ROUTES: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
];

export default ROUTES;
