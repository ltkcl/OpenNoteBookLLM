import type { Prisma } from "../generated/prisma/client.js";
export declare const sourceChunkSelect: {
    readonly id: true;
    readonly sourceId: true;
    readonly index: true;
    readonly content: true;
    readonly tokenCount: true;
    readonly metadata: true;
    readonly createdAt: true;
};
export type SourceChunkRecord = Prisma.SourceChunkGetPayload<{
    select: typeof sourceChunkSelect;
}>;
export type CreateSourceChunkData = {
    sourceId: string;
    index: number;
    content: string;
    tokenCount?: number | null;
    metadata?: Prisma.InputJsonValue;
};
export declare function deleteChunksBySourceId(sourceId: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
export declare function createSourceChunks(chunks: CreateSourceChunkData[]): Promise<{
    content: string;
    createdAt: Date;
    id: string;
    index: number;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceId: string;
    tokenCount: number | null;
}[]>;
export declare function findChunksBySourceId(sourceId: string): Prisma.PrismaPromise<{
    content: string;
    createdAt: Date;
    id: string;
    index: number;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceId: string;
    tokenCount: number | null;
}[]>;
//# sourceMappingURL=source-chunk.repository.d.ts.map