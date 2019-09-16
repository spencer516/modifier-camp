import Popper from 'popper.js';
import makeFunctionalModifier from 'ember-functional-modifiers';
import { ANCHORS } from './popover-anchor';

function popper(element, [anchor]) {
  const anchorElement = ANCHORS.get(anchor);

  const popper = new Popper(anchorElement, element, {
    placement: 'bottom-start',
    modifiers: {
      offset: {
        enabled: true,
        offset: '0, 10'
      }
    }
  });

  return () => popper.destroy();
}

export default makeFunctionalModifier(popper);
