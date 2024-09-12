import { state } from "./states";
import { a, div, h1, h2, h6, link, span, strong } from "./tags";

const app = () => div(// 0
  h1('Hello, World!'),// 0 0
  Test());
function Test() {
  var counter = state(0)
  return div(// 0 1
    h1("Hello, World!"),//0 1 0
    link({rel: "stylesheet", href: "style.css"}),// 0 1 1
    h1({className: 'counter'}, counter.value).$(// 0 1 2
      'onclick', () => {
      counter.value++;
    }),
    a(// 0 1 3
      a(),// 0 1 3 0
      h1(// 0 1 3 1
        h2("Hello, World!")// 0 1 3 1 0
    )
    ),
    h6(// 0 1 4
      span("PRRlkjsdnfblbvkjsdnfgb"),// 0 1 4 0
      strong("prova")// 0 1 4 1
    ),
    h1('gfsdfghjk')// 0 1 5
  )
}

export default app;
