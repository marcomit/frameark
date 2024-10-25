import { state } from "./hooks/state";
import { a, div, h1, h2, h5, h6, link, p, span, strong } from "./tags";
const app = () =>
  div(
    // 0
    h1("Hello, World!"),
    Test()
  );
function Test() {
  const test = state(0);
  const counter = state({
    value: {
      nested: "test",
    },
  });
  return div(
    h1(
      {
        onclick: () => {
          // console.log("ciao");
        },
      },
      "ciao da marco"
    ),
    link({ rel: "stylesheet", href: "style.css" }),
    h1({ className: "h1" }, `counter: ${counter.value.nested}`),
    h6(span("PRRlkjsdnfblbvkjsdnfgb"), strong("prova")),
    p(test.value),
    h1({ className: "counter" }, counter.value.nested).$("onclick", () => {
      counter.value.nested += "ciao";
      test.value += 1;
    }),
    a(a(), h1(h2("Hello, World!"))),
    h5("gfsdfghjk")
  );
}

export default app;
