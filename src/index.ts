import { default as entry } from "./app";
import { mount, root } from "./render";


(()=>{
  mount(entry())
  console.log(root)
})();
