import makeFunctionalModifier from 'ember-functional-modifiers';

let INDEX = 0;

const colors = [
  'aqua',
  'blue',
  'fuchsia',
  'green',
  'lime',
  'maroon',
  'navy',
  'olive',
  'orange',
  'purple',
  'red',
  'teal',
  'yellow'
];

function upToNoGood(element) {
  const index = (INDEX++) % colors.length;
  const color = colors[index];

  element.style.outline = `3px solid ${color}`;
  element.style.background = color;

  const { backgroundColor } = window.getComputedStyle(element, null);
  const transparentColor = backgroundColor.replace(/(rgb\([^\)]+)(\))/, (_, val) => `${val}, 0.2)`);
  console.log(transparentColor);
  element.style.background = transparentColor;
}

export default makeFunctionalModifier(upToNoGood);
