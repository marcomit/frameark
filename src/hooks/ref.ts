import { TreeNode } from "../types";

function ref(node: TreeNode): HTMLElement | undefined {
  const path = node.path;
  let htmlNode: HTMLElement | undefined = document.body;
  for (let i = 0; i < path.length; i++) {
    if (!htmlNode) return undefined;
    const child = htmlNode.children[path[i]];
    if (!child) {
      return undefined;
    }
    htmlNode = child as HTMLElement;
  }
  return htmlNode;
}

export { ref };
