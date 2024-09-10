import { TreeNodeId } from "./components";
import { mount, root } from "./render";
import { path } from "./tags";

const tree: Map<StateId, Set<TreeNodeId>> = new Map();
const componentStack: TreeNodeId[] = [];

export interface State<T> {
  value: T
  id: StateId
}
type StateId = string


type RefReturn<T> = T extends object ? T : { value: T }
function reactive<T extends object>(value: T): T{
  return new Proxy<T>(value, {
    get(target, prop) {
      return Reflect.get(target, prop)
    },
    set(target, p, newValue, receiver) {
      return true
    },
  })
}

function state<T>(value: T){
  if(typeof value === 'object' && value){
    return reactive(value)
  }
  return ref(value)
}

function ref<T>(value: T):{value: T}{
  return new Proxy<{value: T}>({value}, {
    get(target, prop) {
      console.log(path)
      return Reflect.get(target, prop)
    },
    set(target, p, newValue) {
      if(p in target){
        mount(root);
        (target as any)[p] = newValue;
        return true
      }
      return false
    },
  })
}

// Helper functions to manage the component stack
export function pushComponent(componentId: TreeNodeId) {
  componentStack.push(componentId);
}

export function popComponent() {
  componentStack.pop();
}

export { state };
