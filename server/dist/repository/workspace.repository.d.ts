import type { CreateWorkspaceInput, UpdateWorkspaceInput } from "../validators/workspace.validator.js";
export declare const workspaceSelect: {
    readonly id: true;
    readonly title: true;
    readonly description: true;
    readonly icon: true;
    readonly defaultModel: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
export type WorkspaceRecord = {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
    defaultModel: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare function findWorkspacesByUserId(userId: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
    createdAt: Date;
    defaultModel: string;
    description: string | null;
    icon: string | null;
    id: string;
    title: string;
    updatedAt: Date;
}[]>;
export declare function findWorkspaceByIdAndUserId(workspaceId: string, userId: string): import("../generated/prisma/models.js").Prisma__WorkspaceClient<{
    createdAt: Date;
    defaultModel: string;
    description: string | null;
    icon: string | null;
    id: string;
    title: string;
    updatedAt: Date;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
}>;
export declare function createWorkspaceRecord(userId: string, data: CreateWorkspaceInput): import("../generated/prisma/models.js").Prisma__WorkspaceClient<{
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
export declare function updateWorkspaceRecord(workspaceId: string, data: UpdateWorkspaceInput): import("../generated/prisma/models.js").Prisma__WorkspaceClient<{
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
export declare function deleteWorkspaceRecord(workspaceId: string): Promise<void>;
//# sourceMappingURL=workspace.repository.d.ts.map