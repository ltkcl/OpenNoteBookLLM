export type TextChunk = {
    index: number;
    content: string;
    metadata?: Record<string, unknown>;
};
export declare function chunkText(text: string, options?: {
    chunkSize?: number;
    chunkOverlap?: number;
    metadata?: Record<string, unknown>;
}): TextChunk[];
export declare function chunkPages(pages: string[], options?: {
    chunkSize?: number;
    chunkOverlap?: number;
}): TextChunk[];
//# sourceMappingURL=chunking.d.ts.map