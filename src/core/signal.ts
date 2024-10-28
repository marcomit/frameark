import { RefReturn } from "../types";
import { rebuild } from "./components";
import { currentId } from "./tags";
import { getNodeFromId, global } from "./utils";

class Signal<T> {
  private listeners: Set<string> = new Set();
  private id: string = global("state", (old) => old + 1).toString();

  constructor(value: T) {}
  private recursiveProxy<V>(
    value: V,
    stateId: string,
    path: (string | symbol)[] = []
  ) {
    return new Proxy<RefReturn<T>>(
      (typeof value === "object" ? value : { value }) as RefReturn<T>,
      this.handler(stateId, path)
    );
  }
  private handler<V extends object>(
    stateId: string,
    path: (string | symbol)[]
  ): ProxyHandler<V> {
    return {
      get: (target: V, p: string | symbol) => {
        if (!this.listeners.has((currentId + 1).toString())) {
          this.listeners.add((currentId + 1).toString());
        }
        if (
          typeof target[p as keyof V] === "object" &&
          target[p as keyof V] !== null
        ) {
          return this.recursiveProxy(target[p as keyof V], stateId, [
            ...path,
            p,
          ]);
        }
        return Reflect.get(target, p);
      },
      set: (
        target: V,
        p: string | symbol,
        newValue: V[keyof V],
        receiver: V
      ) => {
        // Reflect.set(target, p, newValue);
        console.log(target, p, newValue);

        this.listeners.forEach((id) => {
          const node = getNodeFromId(id);
          if (node) rebuild<V>(node, newValue, stateId, [...path, p]);
        });

        return true;
      },
    };
  }
}

export default Signal;
