import { type SourceRecord } from "../repository/source.repository.js";
import type { CreateSourceInput, ImportWebsiteInput, ImportWebSearchInput, ImportYoutubeInput, ListSourcesQuery, ReprocessSourcesInput } from "../validators/source.validator.js";
export declare function listSourcesForWorkspace(workspaceId: string, userId: string, filters?: ListSourcesQuery): Promise<{
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
export declare function getSourceForWorkspace(workspaceId: string, sourceId: string, userId: string): Promise<SourceRecord>;
export declare function createTextOrMarkdownSource(workspaceId: string, userId: string, input: CreateSourceInput): Promise<{
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
}>;
export declare function uploadPdfSource(workspaceId: string, userId: string, file: Express.Multer.File, title?: string): Promise<{
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
}>;
export declare function importWebsiteSource(workspaceId: string, userId: string, input: ImportWebsiteInput): Promise<{
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
}>;
export declare function importYoutubeSource(workspaceId: string, userId: string, input: ImportYoutubeInput): Promise<{
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
}>;
export declare function deleteSourceForWorkspace(workspaceId: string, sourceId: string, userId: string): Promise<void>;
export declare function getSourceChunksForWorkspace(workspaceId: string, sourceId: string, userId: string): Promise<{
    chunks: {
        content: string;
        createdAt: Date;
        id: string;
        index: number;
        metadata: import("@prisma/client/runtime/client").JsonValue;
        sourceId: string;
        tokenCount: number | null;
    }[];
    count: number;
}>;
export declare function bulkDeleteSourcesForWorkspace(workspaceId: string, userId: string, sourceIds: string[]): Promise<void>;
export declare function reprocessSourcesForWorkspace(workspaceId: string, userId: string, input?: ReprocessSourcesInput): Promise<{
    reprocessed: number;
}>;
export declare function reprocessSourceForWorkspace(workspaceId: string, sourceId: string, userId: string): Promise<void>;
export declare function importWebSearchSource(workspaceId: string, userId: string, input: ImportWebSearchInput): Promise<{
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
}>;
//# sourceMappingURL=source.services.d.ts.map