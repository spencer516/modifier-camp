import makeFunctionalModifier from 'ember-functional-modifiers';

function autoresize(textArea) {
  const { paddingTop, paddingBottom } = window.getComputedStyle(textArea, null);
  const heightOffset = parseFloat(paddingTop) + parseFloat(paddingBottom);

  const resize = () => {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight - heightOffset + 'px';
  }

  textArea.addEventListener('input', resize);

  return () => textArea.removeEventListener('input', resize);
}

export default makeFunctionalModifier(autoresize);
