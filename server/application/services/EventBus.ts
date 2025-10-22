/* For a simple product as this todo list app, no reason to use SNS or other complex event bus system */

export interface IEvent {
  name: string;
}

export type EventHandler<T = IEvent> = (event: T) => void;

export default class EventBus {
  #handlers = new Map<string, EventHandler[]>();

  on<T extends IEvent>(eventName: string, handler: EventHandler<T>): void {
    const list = this.#handlers.get(eventName) || [];
    list.push(handler as EventHandler);
    this.#handlers.set(eventName, list);
  }

  publish(event: IEvent): void {
    const list = this.#handlers.get(event.name) || [];
    for (const h of list) h(event);
  }
}