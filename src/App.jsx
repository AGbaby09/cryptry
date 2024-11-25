import { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextVariables from "./context/ContextVariables";
import CryptoDataTable from "./components/DaTAble/DaTAble";
import Landing from "./pages/Landing/Lando";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const { hideContact } = useContext(ContextVariables);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const setDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    setDimensions();
  }, [window.innerWidth]);

  return (
    <BrowserRouter>
      <main
        id="App"
        className="center scrollable"
        style={{ width: width, height: height }}
      >
        <Routes>
          <Route path={"/table"} element={<Landing />} />
          <Route path={"/"} element={<CryptoDataTable />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
