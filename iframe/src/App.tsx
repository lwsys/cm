import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IframeMessage, pon } from "../../src";

function App() {
  const [count, setCount] = useState(0);
  // const [instance, setInstance] = useState<IframeMessage | null>(null)
  useEffect(() => {
    const temp = new IframeMessage({
      window: window.parent,
      "origin": 'http://127.0.0.1:3000'
    });
    temp?.on("hello", (req) => {
      console.log(req.data);
      return 'world'
    })
  }, []);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
