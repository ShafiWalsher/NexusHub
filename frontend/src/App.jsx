import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Home from './container/Home';
import { Login } from "./components";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if (!user) navigate('/login');
  }, [input]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>

  )
}

export default App
