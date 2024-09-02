import { nanoid } from "../node_modules/nanoid/index";
import { TreeNodeId } from "./components";

const tree: Map<StateId, Set<TreeNodeId>> = new Map();

export interface State<T> {
  value: T
  id: StateId
}
type StateId = string


type RefReturn<T> = T extends object ? T : { value: T }
function ref<T>(value: T): RefReturn<T> {
  // Create the state and store it in the hashmap
  const stateId = nanoid(4);

  // Add the state to the map
  tree.set(stateId, new Set());

  const initial: RefReturn<T> = (typeof value === 'object' && value !== null ? value : { value }) as RefReturn<T>;
  return new Proxy<RefReturn<T>>(initial, {
    get(target, p, receiver) {// Store the path
    },
    set(target, p, newValue, receiver) {// Rerender all TreeNodes
      return true
    },
  })
}

export { ref };

