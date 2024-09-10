import { loadEvents, renderToString, TreeNode } from "./components";

export var root: TreeNode;
function mount(head: TreeNode) {
  head.id = '0'
  document.body.innerHTML = renderToString(head);
  loadEvents(head);
  root = head
}

export { mount };
