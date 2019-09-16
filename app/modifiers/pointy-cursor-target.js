import makeFunctionalModifier from 'ember-functional-modifiers';
import { findAndRegister } from './pointy-cursor';

function pointyCursor(element) {
  return findAndRegister(element);
}

export default makeFunctionalModifier(pointyCursor);
