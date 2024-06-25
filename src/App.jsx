import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Menu from "./components/Menu";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
