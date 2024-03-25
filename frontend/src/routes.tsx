import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/InitialPage";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path="/"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
