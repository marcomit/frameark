// Here you must define a Proxy object to detect the state changes, with a unique ID
// the key is used to identify the state changes

import { rebuild } from "../components";
import { currentId } from "../tags";
import { getNodeFromId, global } from "../utils";

// the value is the path of the state changes
const listener: Map<number, Set<string>> = new Map<number, Set<string>>();

type RefReturn<T> = T extends object ? T : { value: T };
function state<T>(value: T): RefReturn<T> {
  return stateWithID(value, global("state", (old) => old + 1))
}

function stateWithID<T>(value: T, stateId: number): RefReturn<T> {
  return new Proxy<RefReturn<T>>(
    (value && typeof value === "object" ? value : { value }) as RefReturn<T>,
    handler(stateId)
  );
}

// HANDLER
function handler<T extends object>(stateId: number) {
  return {
    get(target: T, p: string | symbol, receiver: any) {
      if (!listener.has(stateId)) {
        listener.set(stateId, new Set<string>());
      }
      if (!listener.get(stateId)!.has((currentId + 1).toString())) {
        listener.get(stateId)!.add((currentId + 1).toString());
      }
      console.log(target, p, receiver, `{${stateId}|${p as string}}`)
      if(typeof target[p as keyof T] === 'object' && target[p as keyof T] !== null){
        return stateWithID(target[p as keyof T], stateId)
      }
      return `{${stateId}|${p as string}}`
      // return Reflect.get(target, p, receiver);
    },
    set(target: T, p: string | symbol, newValue: T[keyof T]) {
      console.log(p, newValue);
      if (p in target) {
        (target as any)[p] = newValue;

        listener.get(stateId)!.forEach((id) => {
          const node = getNodeFromId(id);
          if (node) rebuild(node, newValue);
        });

        return true;
      }
      return false;
    },
  };
}



export { state };
