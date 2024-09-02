import { Content, renderToString } from "./TreeNodes";

function mount(TreeNode: Content) {
  return renderToString(TreeNode);
}

export { mount };
