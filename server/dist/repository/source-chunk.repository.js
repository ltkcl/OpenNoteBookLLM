import prisma from "../lib/db.js";
export const sourceChunkSelect = {
    id: true,
    sourceId: true,
    index: true,
    content: true,
    tokenCount: true,
    metadata: true,
    createdAt: true,
};
export function deleteChunksBySourceId(sourceId) {
    return prisma.sourceChunk.deleteMany({
        where: { sourceId },
    });
}
export function createSourceChunks(chunks) {
    if (chunks.length === 0) {
        return Promise.resolve([]);
    }
    return prisma.$transaction(chunks.map((chunk) => prisma.sourceChunk.create({
        data: {
            sourceId: chunk.sourceId,
            index: chunk.index,
            content: chunk.content,
            tokenCount: chunk.tokenCount ?? null,
            metadata: chunk.metadata,
        },
        select: sourceChunkSelect,
    })));
}
export function findChunksBySourceId(sourceId) {
    return prisma.sourceChunk.findMany({
        where: { sourceId },
        select: sourceChunkSelect,
        orderBy: { index: "asc" },
    });
}
//# sourceMappingURL=source-chunk.repository.js.map