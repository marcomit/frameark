import { state } from "./hooks/state";
import { a, div, h1, h2, h5, h6, span, strong } from "./tags";

/// TAGS     PATH
/// h1       0 0
/// h1       0 1 0
/// link     0 1 1
/// h1       0 1 2
/// a        0 1 3 0
/// h2       0 1 3 1 0
/// h1       0 1 3 1
/// a        0 1 3
/// span     0 1 4 0
/// strong   0 1 4 1
/// h6       0 1 4
/// h1       0 1 5

const app = () =>
  div(
    // 0
    h1("Hello, World!"),
    Test()
  );
function Test() {
  let counter = state<number>(0);
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
    h1({ className: "h1" }, counter.value),
    h6(span("PRRlkjsdnfblbvkjsdnfgb"), strong("prova")),
    h1({ className: "counter" }, counter.value).$("onclick", () => {
      // console.log(counter);
      counter.value++;
    }),
    a(a(), h1(h2("Hello, World!"))),
    h5("gfsdfghjk")
  );
}

export default app;
