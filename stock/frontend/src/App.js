import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import StockContext from "./context/StockContext";
import ThemeContext from "./context/ThemeContext";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Auth/Home/Home";
import Signup from "./Auth/Signup/Signup";
import Login from "./Auth/Login/Login";
import NavBar from "./header/NavBar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("NFLX");

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const user = localStorage.getItem("token");

  return (

    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>

        <NavBar/>

        <Routes>
          { isLoggedIn && 
            <Route path="/" exact element={<Home/>} />
          }  
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>  

      </StockContext.Provider>
    </ThemeContext.Provider>

  );
}

export default App;
