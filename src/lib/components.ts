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

// This is thew stack to keep track of the components tree used to associate events, states, IDs etc
const path: number[] = [0];

/// This function add the IDs of the current component to the path
/// the IDs represent the depth of the component in the tree
export function renderToString(head: Content): string {
  if (typeof head !== 'object' || head === null) {
    return String(head);
  }
  const { tag, props, children = [] } = head;
  const attributes = Object.entries(props ?? {})
    .filter(([key]) => !key.startsWith('on'))
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const childrenHTML = [];
  for (let i = 0; i < children.length; i++) {
    path.push(i);
    const child = children[i];
    // Set the ID of the component on the child node if it has a TreeNode
    if (isNode(child)) {
      (child as TreeNode).id = path.join(' ');
    }

    childrenHTML.push(renderToString(child));
    path.pop();
  }

  return `<${tag}${attributes ? ' ' + attributes : ''}>${childrenHTML.join('')}</${tag}>`;
}

function getNodeFromId(id: string): HTMLElement | undefined {
  const path = id.split(' ').map(Number);
  let node: HTMLElement | undefined = document.body;
  for (let i = 0; i < path.length; i++) {
    if (!node) return undefined;
    const child = node.children[path[i]];
    if (!child) {
      return undefined;
    }
    node = child as HTMLElement;
  }
  return node;
}

export function loadEvents(head: Content){
  function dfs(curr: Content){
    const node = isNode(curr);
    if(node){
      if (typeof node.props === 'object' && node.props !== null) {
        const htmlNode = getNodeFromId(node.id);
        for (const [key, value] of Object.entries(node.props)) {
          if (key.startsWith('on')) {
            const callback = value;
            if (typeof callback === 'function') {
              if (htmlNode) {
                console.log('Adding event listener:', key.slice(2), 'to', htmlNode);
                htmlNode.addEventListener(key.slice(2), (e) => callback(e));
              }
            }
          }
          else {
            console.log(key, value);
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