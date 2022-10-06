import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import CreatePanics from "./pages/Panics/CreatePanics";
import ListsPanics from "./pages/Panics/ListsPanics";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createPanics" element={<CreatePanics />} />
        <Route path="/listsPanics" element={<ListsPanics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
