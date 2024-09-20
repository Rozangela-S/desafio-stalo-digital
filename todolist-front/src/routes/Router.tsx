import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/page";
import { Register } from "../pages/criar-conta/page";
import {Home} from "../pages/home/page";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/" element={ <Navigate to="/register" /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/home" element={ <Home /> } />
    </Routes>
  );
}
