import { div, h1, h2, h3, h4, h5, h6, link, p, span, strong } from "./lib/tags";
import { mount } from "./lib/render";
import { ref } from "./lib/states";

const app = () => div(h1('Hello, World!'), Test());

function Test() {
  const counter = ref(0)
  const obj = ref({ state: 102 });
  counter.value++
  return div(
    h1(),
    link().attr("rel", "stylesheet").attr("href", "style.css"),
    h1(counter.value).attr("class", "counter")
      .attr("style", "color: red")
      .on('click', () => {
        console.log('counter', counter.value)
        counter.value++
      }),
    p(obj.state),
    h2("Prova"),
    h3("Prova"),
    h4("slkdfjnvsldkjfvn"),
    h5("Prova"),
    h6(span("PRRlkjsdnfblbvkjsdnfgb"), strong("prova")),
    h1('gfsdfghjk')
  )
}
mount(app());