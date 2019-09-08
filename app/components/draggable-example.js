import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default class DraggableExampleComponent extends Component {
  @tracked xOff = 0;
  @tracked yOff = 0;
  @tracked x = 250;
  @tracked y = 250;

  @action
  updatePosition({ offset, event }) {
    const [x, y] = offset;

    if (event.type === 'mouseup') {
      this.xOff = 0;
      this.yOff = 0;
      this.x += x;
      this.y += y;
    } else {
      this.xOff = x;
      this.yOff = y;
    }
  }

  get style() {
    const {x, y, xOff, yOff} = this;
    return htmlSafe(`transform: translate(${x + xOff}px, ${y + yOff}px)`);
  }
}
