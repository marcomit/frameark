import { TreeNode, Content, Tag, EventHandler } from "./components";
import { nanoid } from "./utils";

function el(tag: Tag, props: TreeNode['props'], ...children: Content[]): TreeNode {
  const node = {
    id: '',
    tag,
    props,
    children,
    attr: (attr: string, value: string): TreeNode => {
      props.set(attr, value);
      return node;
    },
    on: (event: string, callback: EventHandler): TreeNode => {
      props.set(`on${event}`, callback);
      return node;
    },
  }
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

const functions = Object.fromEntries(htmlTags.map(tag => [
  tag,
  ((...args: any[]) => {
    if (typeof args[0] === 'object' && !Array.isArray(args[0]) && !('tag' in args[0])) {
      const [props = {}, events = {}, ...children] = args;
      return el(tag, props, events, ...children);
    } else {
      return el(tag, new Map(), ...args);
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