import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DidResizeExampleComponent extends Component {
  @tracked resizes = 0;
  @tracked width = 0;

  @action
  didResize(element) {
    this.width = element.offsetWidth;
    this.resizes++;
  }
}
