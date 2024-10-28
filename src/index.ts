import { default as entry } from "./app";
import { mount, root } from "./core/render";

(() => {
  // First time run.
  // Add only the current index of the node
  // entry();
  // The second time track the prev IDs to create a unique index that refers to the HTML node
  mount(entry());
  // change the root to evaluate the path for each child
  mount(entry());
  console.log(root);
})();