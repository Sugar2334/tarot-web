// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tirada from "./pages/Tirada";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tirada" element={<Tirada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
