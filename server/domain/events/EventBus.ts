export interface IEvent {
  name: string;
}

export type EventHandler<T = IEvent> = (event: T) => void;

export default interface EventBus {
  on<T extends IEvent>(eventName: string, handler: EventHandler<T>): void;
  publish(event: IEvent): void;
}
