import { path } from "./tags";

export interface State<T> {
  value: T
  id: StateId
}
type StateId = string

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
        (target as any)[p] = newValue;
        return true
      }
      return false
    },
  })
}
export { state };
