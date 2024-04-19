import { useEffect, useState } from "react";
import reactLogo from "/pokepedia-ball.png";
import viteLogo from "/vite.svg";
import "./App.css";
import PreLoader from "./components/PreLoader/PreLoader";
import PokeSearch from "./components/PokeSearch.tsx";
import PokeDisplay from "./components/PokeDisplay.tsx";
import PokeFooter from "./components/PokeFooter.tsx";

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Poképedia";
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading && <PreLoader />}
      {!isLoading && (
        <>
          <a></a>
          <a target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <div>
            <PokeDisplay />

            <PokeFooter />
          </div>
        </>
      )}
    </>
  );
}

export default App;
