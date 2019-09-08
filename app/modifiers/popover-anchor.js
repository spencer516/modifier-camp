import makeFunctionalModifier from 'ember-functional-modifiers';

export const ANCHORS = new Map();

function popperAnchor(element, [name]) {
  if (ANCHORS.has(name)) {
    throw new Error(`You cannot have two anchors with the same name (${name})`);
  }

  ANCHORS.set(name, element);

  return () => ANCHORS.delete(name);
}

export default makeFunctionalModifier(popperAnchor);
