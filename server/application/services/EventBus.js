/* For a simple product as this todo list app, no reason to use SNS or other complex event bus system */

export default class EventBus {
  #handlers = new Map();
  on(eventName, handler) {
    const list = this.#handlers.get(eventName) || [];
    list.push(handler);
    this.#handlers.set(eventName, list);
  }
  publish(event) {
    const list = this.#handlers.get(event.name) || [];
    for (const h of list) h(event);
  }
}
