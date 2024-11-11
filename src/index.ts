export const psend = (
  {
    window,
    origin,
  }: {
    window: Window;
    origin: string;
  },
  name: string,
  req: any
) => {
  const payload = JSON.stringify({ name, data: req });
  window.postMessage(payload, origin);
};

export const pon = (name: string, cb: (data: any) => void) => {
  window.addEventListener("message", (event) => {
    console.log(event);
    const req = JSON.parse(event.data);
    if (req.name === name) {
      cb(req.data);
    }
  });
};
class IframeMessage {
  constructor() {
    window.addEventListener("message", (event) => {
      console.log(event);
      // const req = JSON.parse(event.data);
      // if (req.name === name) {
      //   cb(req.data);
      // }
    });
  }
  init;
}
