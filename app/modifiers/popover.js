import Popper from 'popper';
import makeFunctionalModifier from 'ember-functional-modifiers';
import { ANCHORS } from './popover-anchor';

function popper(element, [anchor]) {
  const anchorElement = ANCHORS.get(anchor);

  const popper = new Popper(anchorElement, element);

  return () => popper.destroy();
}

export default makeFunctionalModifier(popper);
