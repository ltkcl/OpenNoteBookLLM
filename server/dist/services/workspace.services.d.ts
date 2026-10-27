import { type WorkspaceRecord } from "../repository/workspace.repository.js";
import type { CreateWorkspaceInput, UpdateWorkspaceInput } from "../validators/workspace.validator.js";
export declare function listWorkspacesByUser(userId: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
    createdAt: Date;
    defaultModel: string;
    description: string | null;
    icon: string | null;
    id: string;
    title: string;
    updatedAt: Date;
}[]>;
export declare function getWorkspaceByIdForUser(workspaceId: string, userId: string): Promise<WorkspaceRecord>;
export declare function createWorkspaceForUser(userId: string, input: CreateWorkspaceInput): import("../generated/prisma/models.js").Prisma__WorkspaceClient<{
    createdAt: Date;
    defaultModel: string;
    description: string | null;
    icon: string | null;
    id: string;
    title: string;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
}>;
export declare function updateWorkspaceForUser(workspaceId: string, userId: string, input: UpdateWorkspaceInput): Promise<{
    createdAt: Date;
    defaultModel: string;
    description: string | null;
    icon: string | null;
    id: string;
    title: string;
    updatedAt: Date;
}>;
export declare function deleteWorkspaceForUser(workspaceId: string, userId: string): Promise<void>;
//# sourceMappingURL=workspace.services.d.ts.map