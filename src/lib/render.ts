import { Content, renderToString } from "./components";

export var root: Content;

function mount(head: Content) {
  root = head;
  const mountNode = document.body;
  if (mountNode) {
    mountNode.innerHTML = renderToString(head);
  }
}

export { mount };
