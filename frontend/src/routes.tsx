import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/InitialPage";
import CreatePresentation from "./pages/CreatePresentation";
import Presentation from "./pages/Presentation";

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
          <Route path="presentation/:title" Component={Presentation}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
