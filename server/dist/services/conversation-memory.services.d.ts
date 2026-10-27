/**
 * Generates a rolling conversation summary and syncs recent learnings to Mem0.
 *
 * Called asynchronously (via Inngest) every N messages. The summary replaces
 * older history in chat context; Mem0 receives the last 16 messages for extraction.
 *
 * @param conversationId - Conversation to summarize
 * @param userId - Owner of the conversation (used for Mem0)
 * @returns Updated conversation with `summary` and `summaryMessageCount`
 * @throws {NotFoundError} When the conversation does not exist
 *
 *
 */
export declare function summarizeConversationById(conversationId: string, userId: string): Promise<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}>;
//# sourceMappingURL=conversation-memory.services.d.ts.map