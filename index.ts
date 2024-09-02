import { div, h1, h2, h3, h4, h5, h6, span, strong } from "./src/tags";
import { mount } from "./src/render";
import { ref } from "./src/states";

const app = () => div(h1('Hello, World!'));

function Test() {
    const counter = ref(0)
    return div(
        h1("Prova"),
        h2("Prova"),
        h3("Prova"),
        h4("slkdfjnvsldkjfvn"),
        h5("Prova"),
        h6(span("PRRlkjsdnfblbvkjsdnfgb"), strong("prova")),
        h1('gfsdfghjk')
    )
}
console.log(mount(app()))