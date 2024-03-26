import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/InitialPage";
import CreatePresentation from "./pages/CreatePresentation";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path="/"></Route>
          <Route
            Component={CreatePresentation}
            path="/create-presentation"
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
