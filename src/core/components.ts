import { ref } from "../hooks/ref";
import { Content, TreeNode } from "../types";
import { getElementFromPath, isNode } from "./utils";

const selfClosedTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

// export const path: number[] = [0];
function renderToString(head: Content): string {
  if (!isNode(head)) {
    // console.log(head);
    return String(head);
  }
  const { tag, props, children = [] } = head as TreeNode;

  return selfClosedTags.has(tag)
    ? /* here */
      `<${tag}/>`
    : `<${tag}>${children.map(renderToString).join("")}</${tag}>`;
}

function loadEvents(head: Content) {
  function dfs(curr: Content) {
    const node = isNode(curr);
    if (!node) return;
    const htmlNode = ref(node);
    for (const [key, value] of Object.entries(node.props)) {
      if (key.startsWith("on")) {
        // console.log(htmlNode, key.slice(2), value);
        if (typeof value === "function") {
          if (htmlNode) {
            htmlNode.addEventListener(key.slice(2), (e) => value(e));
          }
        }
      } else {
        if (htmlNode) {
          // console.log(htmlNode, key);
          (htmlNode as any)[key] = value;
        }
      }
    }
    for (const child of node.children) {
      dfs(child);
    }
  }

  dfs(head);
}

function rebuild<T extends object>(
  head: TreeNode,
  newValue: T[keyof T],
  stateId: string,
  path: (string | symbol)[]
) {
  const element = getElementFromPath(head);
  if (!element) {
    throw new Error("Bad state");
  }
  console.log(element);
  console.log(newValue);
  const stateIdentifier = `{${stateId}.${path.join(".")}}`;
  checkChildren(element, stateId, String(newValue));
}

function checkAttributes() {}

function checkChildren(
  element: HTMLElement,
  stateId: string,
  newValue: string
) {
  const content = element.innerHTML;
  element.innerHTML = content.replace(stateId, newValue);
}

export { loadEvents, rebuild, renderToString };
