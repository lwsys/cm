import "./App.css";
import { IframeMessage, psend } from "../../src";
import { useEffect, useRef, useState } from "react";
const URL = 'http://127.0.0.1:4000'
// const URL = 'https://friendly-palm-tree-p7p49vqxp5736xv-4000.app.github.dev/'
function App() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [instance, setInstance] = useState<IframeMessage>()
  useEffect(() => {
    if (ref.current) {
      const dom = new IframeMessage({
        window: ref.current.contentWindow!,
        origin: URL,
      });
      setInstance(dom)
    }
  }, [ref.current])
  return (
    <>
      <button
        onClick={async () => {
          const resp = await instance?.send('hello', 'req')
          console.log('resp', resp);

        }}
      >
        click me
      </button>
      <iframe
        style={{ width: "100vw", height: "100vh" }}
        ref={ref}
        src={URL}
      />
    </>
  );
}

export default App;
