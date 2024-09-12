import { Content, ElementProps, isNode, Tag, TreeNode } from "./components";


export const path: number[] = [0];
function el(
  tag: Tag,
  props: TreeNode["props"],
  ...children: Content[]
): TreeNode {
  const node: TreeNode = {
    id: path.join(" "),
    tag,
    props,
    children: (() => {
      const newChildren: Content[] = [];
      if (children.length == 0) {
        path.pop();
        return [];
      }
      for (let i = 0; i < children.length; i++) {
        console.log(path, children[i]);
        const child = children[i];
        if (isNode(child)) {
          const childNode = child as TreeNode;
          childNode.id = path.join(" ");
        } else {
          path.pop();
        }
        newChildren.push(child);
      }
      return newChildren;
    })(),
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
  return node;
};

function buildChildren(component: Content): Content[]{
  if(!isNode(component)){
    return [component];
  }
  const node = component as TreeNode
  let children: Content[] = []
  for(let i = 0; i < node.children.length; i++){
    path.push(i);
    if(typeof node.children[i] === 'object'){
      (node.children[i] as TreeNode).id = path.join(' ')
    }
    children.push(...buildChildren(node.children[i]))
    path.pop();
  }
  return children
}

const htmlTags: Tag[] = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',
  'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl',
  'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
  'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu',
  'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp',
  'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary',
  'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var',
  'video', 'wbr'
];
type TreeNodeFunction = {
  (props?: TreeNode['props'], ...children: Content[]): TreeNode;
  (...children: Content[]): TreeNode;
};


// create the path here
const functions = Object.fromEntries(htmlTags.map(tag => [
  tag,
  ((...args: any[]) => {
    if (typeof args[0] === 'object' && !Array.isArray(args[0]) && !('tag' in args[0])) {
      const [props = {}, events = {}, ...children] = args;
      return el(tag, {...props, ...events}, ...children);
    } else {
      return el(tag, new Map<string, any>(), ...args);
    }
  }) as TreeNodeFunction
])) as Record<Tag, TreeNodeFunction>;

export const {
  a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, blockquote, body, br, button,
  canvas, caption, cite, code, col, colgroup, data, datalist, dd, del, details, dfn, dialog, div, dl,
  dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, head, header,
  hgroup, hr, html, i, iframe, img, input, ins, kbd, label, legend, li, link, main, map, mark, menu,
  meta, meter, nav, noscript, object, ol, optgroup, option, output, p, picture, pre, progress, q, rp,
  rt, ruby, s, samp, script, section, select, slot, small, source, span, strong, style, sub, summary,
  sup, table, tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track, u, ul,
  video, wbr
} = functions;
a()
