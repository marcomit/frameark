import { TreeNodeId } from "./components";
import { nanoid } from "./utils";

const tree: Map<StateId, Set<TreeNodeId>> = new Map();
const componentStack: TreeNodeId[] = [];

export interface State<T> {
  value: T
  id: StateId
}
type StateId = string


type RefReturn<T> = T extends object ? T : { value: T }
function ref<T>(value: T): RefReturn<T> {
  const stateId = nanoid(4);
  tree.set(stateId, new Set());
  test``
  const initial: RefReturn<T> = (typeof value === 'object' && value !== null ? value : { value }) as RefReturn<T>;
  return new Proxy<RefReturn<T>>(initial, {
    get(target, p, receiver) {
      // Track all components in the current render stack
      const currentComponents = [...componentStack];
      currentComponents.forEach(componentId => {
        tree.get(stateId)?.add(componentId);
      });
      return Reflect.get(target, p, receiver);
    },
    set(target, p, newValue, receiver) {
      return true
    },
  });
}

function test(par: TemplateStringsArray) {

}



// Helper functions to manage the component stack
export function pushComponent(componentId: TreeNodeId) {
  componentStack.push(componentId);
}

export function popComponent() {
  componentStack.pop();
}

export { ref };

