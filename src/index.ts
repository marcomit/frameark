import { default as entry } from "./app";
import { mount } from "./render";


(()=>{
  console.log('---------------------------------')
  mount(entry())
})();
