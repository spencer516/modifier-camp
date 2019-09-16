import makeFunctionalModifier from "ember-functional-modifiers";

const CHILDREN = new Set();
const CHILD_PARENT = new WeakMap();

export function findAndRegister(childNode) {
  CHILDREN.add(childNode);
  return () => CHILDREN.delete(childNode);
}

function findChildTarget(node) {
  if (CHILD_PARENT.has(node)) {
    return CHILD_PARENT.get(node);
  }

  for (const child of node.children) {
    if (CHILDREN.has(child)) {
      CHILD_PARENT.set(node, child);
      return child;
    }
  }
}

function calculateRotate(cursor, target) {
  const offset = cursor.getBoundingClientRect();
  const toOffset = target.getBoundingClientRect();

  const center = {
    x: offset.left + offset.width / 2,
    y: offset.top + offset.height / 2
  };

  const toCenter = {
    x: toOffset.left + toOffset.width / 2,
    y: toOffset.top + toOffset.height / 2
  };

  const radians = Math.atan2(toCenter.x - center.x, toCenter.y - center.y);
  const degree = radians * (180 / Math.PI) * -1 + 180;

  return degree;
}

function pointyCursor(element) {
  const cursor = document.querySelector(".cursor");

  element.style.cursor = "none";

  function onMove(e) {
    const target = findChildTarget(element);
    const rotation = calculateRotate(cursor, target);

    cursor.style.display = e.target === target ? 'none' : 'block';

    cursor.style.setProperty("--x", `${e.pageX}px`);
    cursor.style.setProperty("--y", `${e.pageY}px`);
    cursor.style.setProperty("--r", `${rotation + 20}deg`);
  }

  function hide() {
    cursor.style.display = "none";
  }

  element.addEventListener("mousemove", onMove);
  element.addEventListener("mouseleave", hide);
}

export default makeFunctionalModifier(pointyCursor);
