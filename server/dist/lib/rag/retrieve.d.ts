export type RetrievedChunk = {
    sourceId: string;
    sourceTitle: string;
    sourceType: string;
    chunkId: string;
    chunkIndex: number;
    page?: number;
    text: string;
    score: number;
};
export declare function retrieveWorkspaceContext(workspaceId: string, query: string): Promise<RetrievedChunk[]>;
export type UserMemoryContext = string;
export declare function buildChatSystemPrompt(input: {
    chunks: RetrievedChunk[];
    conversationSummary?: string | null;
    userMemories?: UserMemoryContext[];
    webSearchEnabled?: boolean;
}): string;
//# sourceMappingURL=retrieve.d.ts.map