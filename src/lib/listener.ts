import { Content, TreeNodeId } from "./components";

export var currentComponents: Content;

export const listener: Map<TreeNodeId, Set<(event: Event) => void>> = new Map();