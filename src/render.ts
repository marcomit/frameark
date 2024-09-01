import { Content, renderToString } from "./components";

function mount(component: Content){
  return renderToString(component);
}

export { mount };
