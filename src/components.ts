import { getNodeFromId } from "./utils";

export type Tag = keyof HTMLElementTagNameMap;
export type Event = keyof DocumentEventMap;
export type EventArgs = HTMLElementEventMap;
export type TreeNodeId = string
export type EventHandler<K extends Event> = (this: Document, ev: DocumentEventMap[K]) => any;
export type Content = string | number | boolean | null | undefined | TreeNode;
export type ElementAttributes<T extends Tag> = Partial<HTMLElementTagNameMap[T]>;
export type ElementEvents = Partial<DocumentEventMap>;

export type ElementProps<T extends Tag> = ElementAttributes<T> & ElementEvents;

export type Capitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S;
export type TreeNode = {
  id: TreeNodeId;
  tag: Tag;
  props: ElementProps<Tag>;
  children: Content[];
  $: <K extends keyof ElementProps<Tag>>(
    attr: K,
    value: ElementProps<Tag>[K]
  ) => TreeNode;
}

const autoclosedTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

// export const path: number[] = [0];
export function renderToString(head: Content): string {
  if (typeof head !== 'object' || head === null) {
    return String(head);
  }
  const { tag, props, children = [] } = head;
  const attributes = Object.entries(props ?? {})
    .filter(([key]) => !key.startsWith('on'))
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  return autoclosedTags.has(tag) ? `<${tag} ${attributes} />` : `<${tag}>${children.map(renderToString).join('')}</${tag}>`;
}

export function loadEvents(head: Content){
  function dfs(curr: Content){
    const node = isNode(curr);
    if(node){
      if (typeof node.props === 'object' && node.props !== null) {
        const htmlNode = getNodeFromId(node.id);
        for (const [key, value] of Object.entries(node.props)) {
          if (key.startsWith('on')) {
            if (typeof value === 'function') {
              if (htmlNode) {
                htmlNode.addEventListener(key.slice(2), (e) => value(e));
              }
            }
          }
          else {
            if (htmlNode) {
              (htmlNode as any)[key] = value;
            }
          }
        }
      } else {
        console.log('Node props is not an object or is null:', node.props);
      }
      for(const child of node.children){
        dfs(child);
      }
    }
  }
  dfs(head)
}


export function isNode(content: Content): TreeNode | undefined {
  if(typeof content === 'object' && 'id' in content!){
    return content;
  }
  return undefined;
}
