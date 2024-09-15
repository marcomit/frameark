import { ref } from "./ref";
import { state } from "./state";

const hooks = {
  state: state,
  ref: ref,
};

function use<T extends keyof typeof hooks>(
  hook: T
  // ...args: Parameters<(typeof hooks)[T]> extends [infer A, ...infer Rest]
  //   ? [A, ...Rest]
  //   : []
) {
  return hooks[hook];
}
export { use };
