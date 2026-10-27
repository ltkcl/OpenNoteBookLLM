import "dotenv/config";
import { Pool } from "pg";
export declare const auth: import("better-auth").Auth<{
    database: Pool;
    baseURL: string;
    emailAndPassword: {
        enabled: true;
    };
}>;
//# sourceMappingURL=auth.d.ts.map