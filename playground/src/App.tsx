import "./App.css";
import { psend } from "../../src";
import { useRef } from "react";

function App() {
  const ref = useRef<HTMLIFrameElement>(null);

  return (
    <>
      <button
        onClick={() => {
          psend(
            {
              window: ref.current!.contentWindow!,
              origin:
                "https://friendly-palm-tree-p7p49vqxp5736xv-4000.app.github.dev/",
            },
            "hello",
            "req"
          );
        }}
      >
        click me
      </button>
      <iframe
        style={{ width: "100vw", height: "100vh" }}
        ref={ref}
        src="https://friendly-palm-tree-p7p49vqxp5736xv-4000.app.github.dev/"
      />
    </>
  );
}

export default App;
