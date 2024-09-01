import { nanoid } from "../node_modules/nanoid/index";

export type Tag = keyof HTMLElementTagNameMap;
export type Event = keyof DocumentEventMap;

export type Component = {
  id: string;
  tag: Tag;
  props: Map<string, string | EventHandler>;
  children: Content[];
  attr: (attr: string, value: any) => void;
  on: (event: Event, callback: EventHandler) => void;
}

type EventHandler = (...args: any[]) => void;
export type Content = string | number | boolean | null | undefined | Component;

function el(tag: Tag, props: Component['props'], ...children: Content[]): Component {
  return {
    id: nanoid(10),
    tag,
    props,
    children,
    attr: (attr: string, value: string) => {
      props.set(attr, value);
    },
    on: (event: Event, callback) => {
      props.set(`on${event}`, callback);
    },
  };
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
type ComponentFunction = {
  (props?: Component['props'], ...children: Content[]): Content;
  (...children: Content[]): Content;
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
  }) as ComponentFunction
])) as Record<Tag, ComponentFunction>;

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

export function renderToString(content: Content): string {
  if (typeof content !== 'object' || content === null) {
    return String(content);
  }

  const { tag, props, children } = content;
  const attributes = Array.from(props.entries())
    .filter(([key]) => !key.startsWith('on'))
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const childrenHtml = children.map(renderToString).join('');

  return `<${tag}${attributes ? ' ' + attributes : ''}>${childrenHtml}</${tag}>`;
}

