import type { NextFunction, Request, Response } from "express";
import type { Session } from "../lib/session.js";
declare module "express-serve-static-core" {
    interface Request {
        session: Session;
    }
}
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=require-auth.middleware.d.ts.map