import { TreeNode } from "../types";
import { loadEvents, renderToString } from "./components";
import { global } from "./utils";

export var root: TreeNode;
function mount(head: TreeNode) {
  //TODO: replace this string with the tree node generated from the components
  document.body.innerHTML = renderToString(head);
  loadEvents(head);
  root = head;
  global("node", 0);
}

export { mount };
