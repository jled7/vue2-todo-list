import { Request, Response } from "express";

export default class ServerSideEvents {
  private clients: Set<Response>;

  constructor() {
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
