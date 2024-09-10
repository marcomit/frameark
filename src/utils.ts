export function nanoid(length: number = 10) {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).slice(0, length);
}
export function getNodeFromId(id: string): HTMLElement | undefined {
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
