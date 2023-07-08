import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import UserCart from "./components/UserCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [cartItemIds, setCartItemIds] = useState([]);
  const userId = 101;
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home userId={userId} />}></Route>
          <Route
            exact
            path="/cart"
            element={<UserCart userId={userId} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
