import { Request, Response } from "express";

export default interface IServerSideEvents {
  handle(req: Request, res: Response): void;
  broadcast(eventName: string, data: any): void;
}