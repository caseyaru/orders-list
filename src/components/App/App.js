import "./App.css";
import OrdersList from "../OrdersList/OrdersList";
import { useState } from "react";
import Loader from "../Loader/Loader";

function App() {
  return (
    <div className="App">
      <OrdersList/>
    </div>
  );
}

export default App;
