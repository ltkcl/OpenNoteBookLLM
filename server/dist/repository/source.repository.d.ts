import type { Prisma } from "../generated/prisma/client.js";
import type { ListSourcesQuery } from "../validators/source.validator.js";
export declare const sourceSelect: {
    readonly id: true;
    readonly workspaceId: true;
    readonly type: true;
    readonly title: true;
    readonly content: true;
    readonly url: true;
    readonly status: true;
    readonly metadata: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
export type SourceRecord = Prisma.SourceGetPayload<{
    select: typeof sourceSelect;
}>;
export type CreateSourceData = {
    workspaceId: string;
    type: SourceRecord["type"];
    title: string;
    content?: string | null;
    url?: string | null;
    status?: SourceRecord["status"];
    metadata?: Prisma.InputJsonValue;
};
export declare function findSourcesByWorkspaceId(workspaceId: string, filters?: ListSourcesQuery): Prisma.PrismaPromise<{
    content: string | null;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    status: import("../generated/prisma/enums.js").SourceStatus;
    title: string;
    type: import("../generated/prisma/enums.js").SourceType;
    updatedAt: Date;
    url: string | null;
    workspaceId: string;
}[]>;
export declare function findSourceByIdAndWorkspaceId(sourceId: string, workspaceId: string): Prisma.Prisma__SourceClient<{
    content: string | null;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    status: import("../generated/prisma/enums.js").SourceStatus;
    title: string;
    type: import("../generated/prisma/enums.js").SourceType;
    updatedAt: Date;
    url: string | null;
    workspaceId: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function createSourceRecord(data: CreateSourceData): Prisma.Prisma__SourceClient<{
    content: string | null;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    status: import("../generated/prisma/enums.js").SourceStatus;
    title: string;
    type: import("../generated/prisma/enums.js").SourceType;
    updatedAt: Date;
    url: string | null;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function findSourceById(sourceId: string): Prisma.Prisma__SourceClient<{
    content: string | null;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    status: import("../generated/prisma/enums.js").SourceStatus;
    title: string;
    type: import("../generated/prisma/enums.js").SourceType;
    updatedAt: Date;
    url: string | null;
    workspaceId: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function updateSourceRecord(sourceId: string, data: {
    content?: string | null;
    status?: SourceRecord["status"];
    metadata?: Prisma.InputJsonValue;
}): Prisma.Prisma__SourceClient<{
    content: string | null;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    status: import("../generated/prisma/enums.js").SourceStatus;
    title: string;
    type: import("../generated/prisma/enums.js").SourceType;
    updatedAt: Date;
    url: string | null;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function deleteSourceRecord(sourceId: string): Promise<void>;
//# sourceMappingURL=source.repository.d.ts.map