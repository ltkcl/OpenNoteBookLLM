import { MemoryClient } from "mem0ai";
/**
 * Returns a singleton Mem0 API client.
 *
 * @returns Configured `MemoryClient`
 * @throws When `MEM0_API_KEY` is missing
 */
export declare function getMem0Client(): MemoryClient;
/** Message shape accepted by Mem0 for inferred memory extraction. */
export type Mem0Message = {
    role: "user" | "assistant";
    content: string;
};
/** Normalized memory record returned by Chaibook memory APIs. */
export type AppMemory = {
    id: string;
    memory: string;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, unknown> | null;
    categories?: string[];
    source: "manual" | "learned";
};
/**
 * Lists all memories stored for a user (up to 100).
 *
 * @param userId - Authenticated user's id
 * @returns Array of memories, or `[]` when Mem0 is not configured
 *
 */
export declare function listUserMemories(userId: string): Promise<AppMemory[]>;
/**
 * Semantic search over a user's memories for RAG chat context.
 *
 * @param userId - Authenticated user's id
 * @param query - Current user message or search text
 * @returns Top matching memories (up to 8), or `[]` when Mem0 is off or query is empty
 *
 */
export declare function searchUserMemories(userId: string, query: string): Promise<AppMemory[]>;
/**
 * Creates a single user memory (manual or explicit text).
 *
 * @param userId - Owner of the memory
 * @param input - Memory text, optional infer flag, optional metadata
 * @returns Created memory record
 * @throws When Mem0 returns no created record
 *
 */
export declare function addUserMemory(userId: string, input: {
    memory: string;
    infer?: boolean;
    metadata?: Record<string, unknown>;
}): Promise<AppMemory>;
/**
 * Extracts inferred memories from a conversation transcript (fire-and-forget in chat).
 *
 * @param userId - Owner of extracted memories
 * @param messages - Recent user/assistant turns
 * @param metadata - Optional metadata (e.g. `{ source: "learned", conversationId }`)
 * @returns Resolves immediately when Mem0 is off or messages are empty
 *
 */
export declare function addMemoriesFromMessages(userId: string, messages: Mem0Message[], metadata?: Record<string, unknown>): Promise<void>;
/**
 * Updates the text of an existing memory by id.
 *
 * @param memoryId - Mem0 memory id
 * @param input - New memory text
 * @returns Updated memory record
 * @throws When Mem0 returns no updated record
 *
 */
export declare function updateUserMemory(memoryId: string, input: {
    memory: string;
}): Promise<AppMemory>;
/**
 * Permanently deletes a memory from Mem0.
 *
 * @param memoryId - Mem0 memory id to delete
 * @returns Resolves when deletion completes
 *
 */
export declare function deleteUserMemory(memoryId: string): Promise<void>;
//# sourceMappingURL=mem0.d.ts.map