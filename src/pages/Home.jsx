import { useEffect } from "react";
import NavBar from "../components/Navbar";
import Main from "../components/Main";
import authService from "../services/authService";

export default function Home() {
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}
