import { loadEvents, renderToString, TreeNode } from "./components";

export var root: TreeNode;
function mount(head: TreeNode) {
  head.id = "0";
  //TODO: replace this string with the tree node generated from the components
  document.body.innerHTML = renderToString(head);
  // document.body.appendChild(treeNode)
  loadEvents(head);
  root = head;
}

export { mount };
