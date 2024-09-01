import { div, h1 } from "./src/components";
import { mount } from "./src/render";

const app = () => div(h1('Hello, World!'));


console.log(mount(app()))