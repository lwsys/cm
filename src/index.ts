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
    const req = JSON.parse(event.data);
    if (req.name === name) {
      cb(req.data);
    }
  });
};
const createId = () => Math.random().toString(36).substr(2, 9)

type CB = (data: any) => unknown
enum MessageTypes {
  Request = "request",
  Process = 'process',
  Response = "response",
}
type Payload<T = any> = {
  name: string,
  data: T,
  iframeEvent: boolean,
  type: MessageTypes,
  id: string
}

export class IframeMessage {
  cbMap: Record<string, CB[]> = {}
  private targetWindow: Window;
  private targetOrigin: string;
  constructor({ window, origin }: { window: Window; origin: string }
  ) {
    this.targetWindow = window;
    this.targetOrigin = origin;
    this.addListener()
  }

  private cb = (event: MessageEvent) => {
    const req = event.data;
    if (!req.iframeEvent) return
    if (this.cbMap[req.name]) {
      this.cbMap[req.name].forEach(cb => {
        const resp = cb(req)
        if (req.type === MessageTypes.Request) {
          this.rawSend({ id: req.id, name: req.name, type: MessageTypes.Response }, resp)
        }
      });
    }
  }

  addListener() {
    window.addEventListener("message", this.cb)
  }
  removeListener() {
    window.removeEventListener("message", this.cb)
  }

  private rawSend<T = any>({
    name,
    id,
    type
  }: {
    name: string,
    id: string,
    type: MessageTypes
  },
    data: T,
  ): Promise<Payload> {
    return new Promise((resolve) => {
      const payload: Payload = { name, data, iframeEvent: true, type, id };

      const onceCallback = (data: Payload) => {
        if (data?.id === id) {
          if (data.type === MessageTypes.Response) {
            resolve(data);
            this.off(name, onceCallback);
          }
        }
      };

      this.on(name, onceCallback);

      this.targetWindow.postMessage(payload, this.targetOrigin);
    })
  }


  send<T = any>(name: string,
    data: T
  ) {
    return this.rawSend<T>({
      name,
      id: createId(),
      type: MessageTypes.Request
    }, data)
  }


  async on<T = any>(name: string, cb: (data: Payload<T>) => unknown) {
    this.cbMap[name] ??= [];
    this.cbMap[name].push(cb);
  }

  async once<T = any>(name: string | {
    name: string;
    id?: string;
  }, cb: (data: T) => void) {
    let fullFilter = typeof name === "string" ? { name } : name;
    const onceCallback = (data: any) => {
      if (data?.id === fullFilter.id) {
        cb(data);
        this.off(fullFilter.name, onceCallback);
      }
    };
    this.on(fullFilter.name, onceCallback);
  }
  async off<T = any>(name: string, cb: (data: T) => void) {
    this.cbMap[name] = this.cbMap[name].filter((item) => item !== cb);
  }
}
