import { state } from "./states";
import { div, h1, h2, h3, h4, h5, h6, link, span, strong } from "./tags";

const app = () => div(h1('Hello, World!'), Test());
function Test() {
  var counter = state(0)
  return div(
    h1("Hello, World!"),
    link({rel: "stylesheet", href: "style.css"}),
    h1({className: 'counter'}, counter.value).$(
      'onclick', () => {
      counter.value++;
      console.log(counter.value)
    }),
    h2(counter.value),
    h2(counter.value),
    h2(counter.value),
    h2(counter.value),
    h3("Prova"),
    h4("slkdfjnvsldkjfvn"),
    h5("Prova"),
    h6(span("PRRlkjsdnfblbvkjsdnfgb"), strong("prova")),
    h1('gfsdfghjk')
  )
}

export default app;
