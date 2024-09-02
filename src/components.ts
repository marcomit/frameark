import { nanoid } from "../node_modules/nanoid/index";

export type Tag = keyof HTMLElementTagNameMap;
export type Event = keyof DocumentEventMap;
export type TreeNodeId = string
export type TreeNode = {
  id: TreeNodeId;
  tag: Tag;
  props: Map<string, string | EventHandler>;
  children: Content[];
  attr: (attr: string, value: any) => void;
  on: (event: Event, callback: EventHandler) => void;
}

type EventHandler = (...args: any[]) => void;
export type Content = string | number | boolean | null | undefined | TreeNode;

export function renderToString(content: Content): string {
  if (typeof content !== 'object' || content === null) {
    return String(content);
  }

  const { tag, props, children } = content;
  const attributes = Array.from(props.entries())
    .filter(([key]) => !key.startsWith('on'))
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const childrenHtml = children.map(renderToString).join('');

  return `<${tag}${attributes ? ' ' + attributes : ''}>${childrenHtml}</${tag}>`;
}

