import { mount } from "./lib/render";
import { ref } from "./lib/states";
import { div, h1, h2, h3, h4, h5, h6, link, p, span, strong } from "./lib/tags";

const app = () => div(h1('Hello, World!'), Test());

function Test() {
  const counter = ref(0)
  const obj = ref({ state: 102 });
  return div(
    h1("Hello, World!"),
    link({rel: "stylesheet", href: "style.css"}),
    h1({className: 'counter'}, counter.value).$('onclick', () => {
      console.log('counter', counter.value);
      counter.value++;
    }),
    p({
      onclick: () => {
        obj.state = 100
      }
    }, obj.state),
    h2("Prova"),
    h3("Prova"),
    h4("slkdfjnvsldkjfvn"),
    h5("Prova"),
    h6(span("PRRlkjsdnfblbvkjsdnfgb"), strong("prova")),
    h1('gfsdfghjk')
  )
}
mount(app());