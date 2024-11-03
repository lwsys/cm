type MessageData = {
  uri: string;
  data: any;
};
export const psend = <
  T extends {
    postMessage: (message: string, option?: WindowPostMessageOptions) => void;
  }
>(
  target: T,
  uri: string,
  req: any
) => {
  // window.addEventListener("message", (target) => {
  //   target.source?.postMessage("");
  // });
  const payload = JSON.stringify({ uri, data: req });
  target.postMessage(payload);
};

export const pon = (target: Window, uri: string, cb: (data: any) => void) => {
  target.addEventListener("message", (event) => {
    const req = JSON.parse(event.data);
    if (req.uri === uri) {
      cb(req.data);
    }
  });
};
