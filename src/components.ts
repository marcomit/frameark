import { ref } from "./hooks/ref";
import { Content, TreeNode } from "./types";
import { isNode } from "./utils";

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
    ? `<${tag}/>`
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

function rebuild(head: TreeNode) {
  console.log(renderToString(head));
}

export { loadEvents, rebuild, renderToString };
