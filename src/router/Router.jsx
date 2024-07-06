import { useRoutes } from "react-router-dom";

import Activity from "../pages/Activity";
import Main from "../pages/Main";
import Chat from "../pages/Chat";

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/chat/:id",
    element: <Chat />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
];

export const RouteList = () => {
  const router = useRoutes(routes);
  return <> {router} </>;
};
