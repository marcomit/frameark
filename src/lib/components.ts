import { listener } from "./listener";
import { root } from "./render";

export type Tag = keyof HTMLElementTagNameMap;
export type Event = keyof DocumentEventMap;
export type TreeNodeId = string
export type TreeNode = {
  id: TreeNodeId;
  tag: Tag;
  props: Map<string, string | EventHandler>;
  children: Content[];
  attr: (attr: string, value: any) => TreeNode;
  on: (event: Event, callback: EventHandler) => TreeNode;
}
export type EventHandler = (...args: any[]) => void;
export type Content = string | number | boolean | null | undefined | TreeNode;

const path: number[] = [];


/// This function add the IDs of the current component to the path
/// the IDs represent the depth of the component in the tree
export function renderToString(head: Content): string {
  if (typeof head !== 'object' || head === null) {
    return String(head);
  }

  const { tag, props, children } = head;
  const attributes = Array.from(props.entries())
    .filter(([key]) => !key.startsWith('on'))
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const events = Array.from(props.entries())
    .filter(([key]) => key.startsWith('on'));

  const childrenHTML = [];

  for (let i = 0; i < children.length; i++) {

    path.push(i);
    const child = children[i];
    if (child && typeof child === 'object' && 'id' in child) {
      (child as TreeNode).id = path.join(' ');
    }
    console.log(child)

    childrenHTML.push(renderToString(child));
    path.pop();
  }

  return `<${tag}${attributes ? ' ' + attributes : ''}>${childrenHTML.join('')}</${tag}>`;
}

function getNodeFromId(id: string): TreeNode | undefined {
  const path = id.split(' ').map(Number);

  return undefined;
}