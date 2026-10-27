import type { Prisma } from "../generated/prisma/client.js";
import { type SourceChunkRecord } from "../repository/source-chunk.repository.js";
import { type SourceRecord } from "../repository/source.repository.js";
export declare function markSourceProcessing(sourceId: string): Prisma.Prisma__SourceClient<{
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
export declare function markSourceFailed(sourceId: string, error: unknown, existingMetadata: SourceRecord["metadata"]): Promise<{
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
export declare function extractSourceContent(sourceId: string): Promise<{
    sourceId: string;
    workspaceId: string;
    text: string;
    pages: string[] | undefined;
    source: {
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
    };
}>;
export declare function chunkSourceContent(sourceId: string, text: string, pages?: string[]): Promise<{
    content: string;
    createdAt: Date;
    id: string;
    index: number;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceId: string;
    tokenCount: number | null;
}[]>;
export declare function embedAndIndexSource(source: SourceRecord, chunks: SourceChunkRecord[]): Promise<{
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
export declare function removeSourceFromIndex(workspaceId: string, sourceId: string): Promise<void>;
export declare function listChunksForSource(sourceId: string): Promise<{
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
//# sourceMappingURL=source-processing.services.d.ts.map