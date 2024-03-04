import "./App.css";
import OrdersList from "../OrdersList/OrdersList";
import { useState } from "react";
import Loader from "../Loader/Loader";

function App() {
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      {/* {isLoading ? (
        <div className="app__loader-container">
          <Loader />
        </div>
      ) : (
        <OrdersList isLoading={isLoading} setIsLoading={setIsLoading} />
      )} */}
      <OrdersList/>
    </div>
  );
}

export default App;
