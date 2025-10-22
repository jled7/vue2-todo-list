import { Request, Response } from "express";
import EventBus from "../../application/services/EventBus";

export interface IServerSideEventsDependencies {
  eventBus: EventBus;
}

export default class ServerSideEvents {
  private eventBus: EventBus;
  private clients: Set<Response>;

  constructor({ eventBus }: IServerSideEventsDependencies) {
    this.eventBus = eventBus;
    this.clients = new Set();
  }

  handle(req: Request, res: Response): void {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.write(": connected\r\n\r\n");

    this.clients.add(res);
    req.on("close", () => this.clients.delete(res));
  }

  broadcast(eventName: string, data: any): void {
    const payload = `event: ${eventName}\r\ndata: ${JSON.stringify(
      data
    )}\r\n\r\n`;
    for (const c of this.clients) c.write(payload);
  }
}
