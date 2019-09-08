import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from "@ember/object";

export default class ActionExampleComponent extends Component {
  @tracked count = 0;
  @tracked sillyCount = 0;

  @action
  increment() {
    this.count++;
  }

  @action
  sillyIncrement() {
    this.sillyCount++;
  }
}
