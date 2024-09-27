import { state } from "./hooks/state";
import { a, div, h1, h2, h5, h6, span, strong } from "./tags";


const app = () =>
  div(
    // 0
    h1("Hello, World!"),
    Test()
  );
function Test() {
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
    // link({ rel: "stylesheet", href: "style.css" }),
    h1({ className: "h1" }, `counter: ${counter.value.nested}`),
    h6(span("PRRlkjsdnfblbvkjsdnfgb"), strong("prova")),
    h1({ className: "counter" }, counter.value.nested
    ).$("onclick", () => {
      counter.value.nested = "ciao";
    }),
    a(a(), h1(h2("Hello, World!"))),
    h5("gfsdfghjk")
  );
}

export default app;
