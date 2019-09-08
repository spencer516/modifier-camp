import makeFunctionalModifier from 'ember-functional-modifiers';
import { Subject, fromEvent, merge } from 'rxjs';
import {
  flatMap,
  map,
  takeUntil,
  startWith,
  first,
  filter,
  share
} from 'rxjs/operators';

const DISPATCHER = new Subject();

/**
 * This sets up an observer that listens for a `mousedown` event
 * on the provided element.
 *
 * When the element receives a `mousedown` event, it adds the
 * `scope` to the event and pushes the event to the Dispatcher.
 *
 * @param {HTMLElement} element
 * @param {string} scope
 */
function notifyDispatcher(element, scope) {
  return fromEvent(element, 'mousedown')
    .pipe(
      filter(e => e.button === 0),
      map(event => ({ event, scope }))
    )
    .subscribe(DISPATCHER);
}

/**
 * This sets up a subscription to the Dispatcher and filters
 * the events based on whether they match the scope.
 *
 * The `flatMap` takes the initial `mousedown` event and turns
 * it into a stream of `mousemove` events, until the next
 * `mouseup` occurs.
 *
 * @param {Function} callback
 * @param {string} scope
 */
function subscribeToDispatcher(callback, scope) {
  return DISPATCHER.pipe(
    share(),
    filter(({ scope: curScope }) => scope === curScope),
    flatMap(observerFromMouseDown)
  ).subscribe(callback);
}

/**
 * Given a `mousedown` event, return a new observer that fires for
 * the initial `mousedown`, every subsequent `mousemove` and the
 * next `mouseup` event.
 *
 * For each of these events, this observer computes the `offset` from
 * the offsets of the initial `mousedown` event.
 *
 * The whole object that this observer will fire with is
 *
 * ```ts
 * type MoveEvent = {
 *   event: MouseEvent;
 *   scope: string | Symbol;
 *   offset: [number, number];
 *   element: HTMLElement
 * }
 * ```
 *
 * @param {MouseEvent} mouseDownEvent
 */
function observerFromMouseDown(mouseDownEvent) {
  const { event, scope } = mouseDownEvent;

  event.stopPropagation();

  const mouseMove = fromEvent(document, 'mousemove');
  const mouseUp = fromEvent(document, 'mouseup');

  const upObs = mouseUp.pipe(first());
  const move = mouseMove.pipe(takeUntil(mouseUp));

  return merge(move, upObs).pipe(
    startWith(event),
    map(nextEvent => makeEventData(scope, event, nextEvent))
  );
}

/**
 * Generate event data for a drag event from the scope, start,
 * and end event.
 *
 * @param {string} scope
 * @param {MouseEvent} startEvent
 * @param {MouseEvent} event
 */
function makeEventData(scope, startEvent, event) {
  const { pageX: startX, pageY: startY, target } = startEvent;
  const { pageX, pageY } = event;

  return {
    scope,
    event,
    offset: [pageX - startX, pageY - startY],
    element: target
  };
}

export default makeFunctionalModifier(
  (element, [callback, scope = Symbol('drag-scope')]) => {
    const dispatchSub = subscribeToDispatcher(callback, scope);
    const mouseDownSub = notifyDispatcher(element, scope);

    mouseDownSub.add(dispatchSub);

    return () => mouseDownSub.unsubscribe();
  }
);
