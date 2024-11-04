import { ref } from "./ref";
import { getProxyFromId, state } from "./state";

const hooks = {
  state: state,
  ref: ref,
};

// function use<T extends keyof typeof hooks>(
//   hook: T
//   // ...args: Parameters<(typeof hooks)[T]> extends [infer A, ...infer Rest]
//   //   ? [A, ...Rest]
//   //   : []
// ) {
//   return hooks[hook];
// }
// export { use };

function use<T extends object>(state: T, callback: (state: T) => any) {
  const id = getProxyFromId(state);
  if (id === -1) console.log("Proxy not found");
  return `{{${id}.${callback(state)}}}`;
}

export default use;