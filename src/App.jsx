import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DetailDiary from "./pages/DetailDiary";
import Home from "./pages/Home";
import ListCards from "./pages/ListCards";
import { API, setAuthToken } from "./services/baseUrl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);

  // persist login user
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list-cards" element={<ListCards />} />
      <Route path="/detail/:id" element={<DetailDiary />} />
    </Routes>
  );
}

export default App;
