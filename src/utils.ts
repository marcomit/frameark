import { root } from "./render";
import { Content, TreeNode } from "./types";

function random(length: number = 10) {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .slice(0, length);
}

const globals = {
  state: 0,
  node: 0,
};

const TODO = new Proxy({}, {
  get(target, p, receiver) {
    throw new Error("TODO");
  },
})

function global<T extends keyof typeof globals>(
  provider: T,
  newValue:
    | (typeof globals)[T]
    | ((oldValue: (typeof globals)[T]) => (typeof globals)[T])
): number {
  if (typeof newValue === "function") {
    globals[provider] = newValue(globals[provider]);
  } else {
    globals[provider] = newValue;
  }
  return globals[provider];
}

function getNodeFromId(id: TreeNode["id"]) {
  let result: Content | undefined = undefined;
  function backtrack(currNode: Content) {
    if (!isNode(currNode) || result) {
      return;
    }
    for (const child of (currNode as TreeNode).children) {
      if (!isNode(child)) continue;
      if ((child as TreeNode).id === id) {
        result = child;
        return;
      }
      backtrack(child);
    }
  }
  backtrack(root);
  return result;
}

function getPathFromNode(head: Content, id: string) {
  function backtrack(
    node: Content,
    path: number[] = [0]
  ): number[] | undefined {
    if (!isNode(node)) return;
    if ((node as TreeNode).id === id) {
      return path; // Return the path when the node is found
    }
    for (let i = 0; i < (node as TreeNode).children.length; i++) {
      const result = backtrack((node as TreeNode).children[i], [...path, i]);
      if (result) return result; // Return the result if found
    }
    return undefined; // Return undefined if not found
  }
  return backtrack(head);
}

function getElementFromPath(node: TreeNode){
  var element: HTMLElement = document.body;
  for(let i = 0; i < node.path.length; i++){
    element = element.children[node.path[i]] as HTMLElement;
  }
  return element;
}

function isNode(content: Content): TreeNode | undefined {
  if (
    content &&
    typeof content === "object" &&
    "id" in content! &&
    "tag" in content!
  ) {
    return content;
  }
  return undefined;
}

export { getElementFromPath, getNodeFromId, getPathFromNode, global, isNode, random, TODO };
