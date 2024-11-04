import Signal from "./signal";

namespace Mark {
  export class Node {
    public node: HTMLElement;
    public id: string;
    public tag: HTMLElementTagNameMap;
    public path: string[];
    public dependencies: Signal<any>[];
    constructor(
      node: HTMLElement,
      id: string,
      tag: HTMLElementTagNameMap,
      path: string[]
    ) {
      this.node = node;
      this.id = id;
      this.tag = tag;
      this.path = path;
      this.dependencies = [];
      this.node = document.createElement("");
    }
  }
}

export default Mark;
