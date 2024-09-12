import { Content, ElementProps, isNode, Tag, TreeNode } from "./components";

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

export const path: number[] = [0];
var first = true;
function el(
  tag: Tag,
  props: TreeNode["props"],
  ...children: Content[]
): TreeNode {
  console.log(tag, path)
  if(!children.find((child) => isNode(child))){
    console.log(tag, 'non ha figli');
    if(first){
      console.log('pushing 0')
      path.push(0);
    }
    else{
      path[path.length - 1]++;
    }
    first = false
  }
  else{
    first = true;
    path.pop();
  }
  const node: TreeNode = {
    id: path.join(' '),
    tag,
    props,
    children: (() => {
      const newChildren: Content[] = [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isNode(child)) {
          const childNode = child as TreeNode;
          path.push(i);
          childNode.id = path.join(' ');
          newChildren.push(childNode);
          path.pop();
        } else {
          newChildren.push(child);
        }
      }
      return newChildren;
    })(),
    $: <K extends keyof ElementProps<Tag>>(attr: K,
      value: ElementProps<keyof HTMLElementTagNameMap>[K]): TreeNode => {
      if (typeof props === "object" && props) {
        props[attr] = value;
      }
      return node;
    },
  };
  return node;
};


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
