import { Content, ElementProps, Tag, TreeNode } from "../types";
import { root } from "./render";
import { getPathFromNode, global } from "./utils";

export let mode = "";
export let currentId = 0;

function el(
  tag: Tag,
  props: TreeNode["props"],
  ...children: Content[]
): TreeNode {
  currentId = global("node", (old) => old + 1);

  // console.log(tag, currentId);
  const node: TreeNode = {
    path: getPathFromNode(root, currentId.toString()) || [0],
    id: currentId.toString(),
    tag,
    props,
    children: children,
    $: <K extends keyof ElementProps<Tag>>(
      attr: K,
      value: ElementProps<keyof HTMLElementTagNameMap>[K]
    ): TreeNode => {
      if (typeof props === "object" && props) {
        props[attr] = value;
      }
      return node;
    },
  };
  // Track state usage in props
  trackStateUsage(props, node, "props");

  // Track state usage in children
  children.forEach((child) => {
    trackStateUsage(child, node, "children");
  });
  return node;
}

// Function to track state usage
function trackStateUsage(value: any, node: TreeNode, context: string) {
  if (typeof value === "function") {
    // Here, you can register that this state is being used
    registerStateUsage(value, node, context);
  } else if (Array.isArray(value)) {
    value.forEach((item) => trackStateUsage(item, node, context));
  } else if (typeof value === "object" && value !== null) {
    for (let key in value) {
      trackStateUsage(value[key], node, context);
    }
  }
}

// Function to register state usage
function registerStateUsage(
  stateFunc: Function,
  node: TreeNode,
  context: string
) {
  // Logic to store the context of state usage
  // You might want to save something like this:
  // usageMap[stateFunc].push({ nodeId: node.id, context });
  // console.log(
  //   `State function used in ${context} of node ${node.id} ${node.path}`
  // );
}

const htmlTags: Tag[] = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
];
type TreeNodeFunction = {
  (props?: TreeNode["props"], ...children: Content[]): TreeNode;
  (...children: Content[]): TreeNode;
};

// create the path here
const functions = Object.fromEntries(
  htmlTags.map((tag) => [
    tag,
    ((...args: any[]) => {
      if (
        typeof args[0] === "object" &&
        !Array.isArray(args[0]) &&
        !("tag" in args[0]) &&
        !("props" in args[0])
      ) {
        const [props = {}, ...children] = args;
        return el(tag, { ...props }, ...children);
      } else {
        return el(tag, new Map<string, any>(), ...args);
      }
    }) as TreeNodeFunction,
  ])
) as Record<Tag, TreeNodeFunction>;

export const {
  a,
  abbr,
  address,
  area,
  article,
  aside,
  audio,
  b,
  base,
  bdi,
  bdo,
  blockquote,
  body,
  br,
  button,
  canvas,
  caption,
  cite,
  code,
  col,
  colgroup,
  data,
  datalist,
  dd,
  del,
  details,
  dfn,
  dialog,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  head,
  header,
  hgroup,
  hr,
  html,
  i,
  iframe,
  img,
  input,
  ins,
  kbd,
  label,
  legend,
  li,
  link,
  main,
  map,
  mark,
  menu,
  meta,
  meter,
  nav,
  noscript,
  object,
  ol,
  optgroup,
  option,
  output,
  p,
  picture,
  pre,
  progress,
  q,
  rp,
  rt,
  ruby,
  s,
  samp,
  script,
  section,
  select,
  slot,
  small,
  source,
  span,
  strong,
  style,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  template,
  textarea,
  tfoot,
  th,
  thead,
  time,
  title,
  tr,
  track,
  u,
  ul,
  video,
  wbr,
} = functions;
