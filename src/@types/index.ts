import { NextFunction, Request, Response } from "express";

export type TMiddleware<R = any> = (request: Request, response: Response, next: NextFunction) => Promise<R>