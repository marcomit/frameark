export type Tag = keyof HTMLElementTagNameMap;
export type Event = keyof DocumentEventMap;
export type EventArgs = HTMLElementEventMap;
export type TreeNodeId = string;
export type EventHandler<K extends Event> = (
  this: Document,
  ev: DocumentEventMap[K]
) => any;
export type Content = string | number | boolean | null | undefined | TreeNode;
export type ElementAttributes<T extends Tag> = Partial<
  HTMLElementTagNameMap[T]
>;
export type ElementEvents = Partial<DocumentEventMap>;

export type ElementProps<T extends Tag> = ElementAttributes<T> & ElementEvents;

export type Capitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;
export type TreeNode = {
  path: number[];
  id: TreeNodeId;
  tag: Tag;
  props: ElementProps<Tag>;
  children: Content[];
  $: <K extends keyof ElementProps<Tag>>(
    attr: K,
    value: ElementProps<Tag>[K]
  ) => TreeNode;
};
