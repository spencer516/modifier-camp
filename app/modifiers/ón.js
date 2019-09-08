import makeFunctionalModifier from 'ember-functional-modifiers';

function ón(element, [eventName, action]) {
  function callback(...args) {
    if (Math.random() * 10 < 9) {
      return action(...args);
    }
  }

  element.addEventListener(eventName, callback);

  return () => element.removeEventListener(eventName, callback);
}

export default makeFunctionalModifier(ón);
