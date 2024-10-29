// Here you must define a Proxy object to detect the state changes, with a unique ID
// the key is used to identify the state changes

import { rebuild } from "../core/components";
import { currentId } from "../core/tags";
import { getNodeFromId, global } from "../core/utils";
import { RefReturn } from "../types";

// the value is the path of the state changes
const listener: Map<number, Set<string>> = new Map<number, Set<string>>();
const states: Map<number, object> = new Map<number, object>();
function state<T>(value: T): RefReturn<T> {
  const stateId = global("state", (old) => old + 1);
  const proxy = recursiveProxy(value, stateId);
  if (states.has(stateId)) return states.get(stateId) as RefReturn<T>;
  states.set(stateId, proxy);
  return recursiveProxy(value, stateId);
}

/// PER GLI STATI
/// al 'finto' dom aggiungo {stateId.path[]}
/// e quando quando converto l'albero in html, faccio un replace
/// con il valore corretto

function recursiveProxy<T>(
  value: T,
  stateId: number,
  path: (string | symbol)[] = []
): RefReturn<T> {
  return new Proxy<RefReturn<T>>(
    (value && typeof value === "object" ? value : { value }) as RefReturn<T>,
    handler(stateId, path)
  );
}

// HANDLER
function handler<T extends object>(
  stateId: number,
  path: (string | symbol)[] = []
) {
  return {
    get(target: T, p: string | symbol, receiver: T) {
      if (!listener.has(stateId)) {
        listener.set(stateId, new Set<string>());
      }
      if (!listener.get(stateId)!.has((currentId + 1).toString())) {
        listener.get(stateId)!.add((currentId + 1).toString());
      }
      if (
        typeof target[p as keyof T] === "object" &&
        target[p as keyof T] !== null
      ) {
        return recursiveProxy(target[p as keyof T], stateId, [...path, p]);
      }
      return Reflect.get(target, p);
    },
    set(target: T, p: string | symbol, newValue: T[keyof T]) {
      // Reflect.set(target, p, newValue, receiver);
      // console.log(target, p, newValue);
      (target as any)[p] = newValue;
      listener.get(stateId)!.forEach((id) => {
        const node = getNodeFromId(id);
        if (node) console.log(node);
        if (node) rebuild<T>(node, newValue, stateId.toString(), [...path, p]);
      });

      return true;
    },
  };
}

function change<T>(state: T, callback: T | ((old: T) => T)): T {
  console.log(state);
  if (typeof callback === "function") {
    state = (callback as Function)(state);
  } else {
    state = callback;
  }
  console.log(state);
  return state;
}

export { change, state };

