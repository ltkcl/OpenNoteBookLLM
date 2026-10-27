import type { Response } from "express";
import { type UIMessage } from "ai";
/**
 * Lists all conversations in a workspace for the sidebar/history UI.
 *
 * @param workspaceId - Workspace to list conversations from
 * @param userId - Authenticated user's id
 * @returns Conversation records ordered by most recent activity
 *
 */
export declare function listConversationsForWorkspace(workspaceId: string, userId: string): Promise<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}[]>;
/**
 * Creates an empty conversation (optional title).
 *
 * Most chats are created implicitly on first message via {@link streamWorkspaceChat};
 * this endpoint supports explicit "new chat" actions from the UI.
 *
 * @param workspaceId - Workspace to attach the conversation to
 * @param userId - Authenticated user's id
 * @param title - Optional display title
 * @returns New conversation record
 *
 */
export declare function createConversationForWorkspace(workspaceId: string, userId: string, title?: string): Promise<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}>;
/**
 * Loads persisted message history for a conversation.
 *
 * @param workspaceId - Workspace the conversation belongs to
 * @param conversationId - Conversation to load messages for
 * @param userId - Authenticated user's id
 * @returns Message rows with role, content, citations, and timestamps
 * @throws {NotFoundError} When the conversation does not exist in this workspace
 *
 */
export declare function getConversationMessagesForWorkspace(workspaceId: string, conversationId: string, userId: string): Promise<{
    citations: import("@prisma/client/runtime/client").JsonValue;
    content: string;
    conversationId: string;
    createdAt: Date;
    id: string;
    role: import("../generated/prisma/enums.js").MessageRole;
}[]>;
/**
 * Deletes a conversation and all its messages (cascade).
 *
 * @param workspaceId - Workspace the conversation belongs to
 * @param conversationId - Conversation to delete
 * @param userId - Authenticated user's id
 * @returns Resolves when the conversation row is deleted
 * @throws {NotFoundError} When the conversation does not exist
 *
 */
export declare function deleteConversationForWorkspace(workspaceId: string, conversationId: string, userId: string): Promise<void>;
/**
 * Main RAG chat endpoint: streams an AI reply with workspace context and optional web search.
 *
 * **Pipeline:**
 * 1. Validate user message and resolve/create conversation
 * 2. Save user message to Postgres
 * 3. Parallel: Pinecone RAG retrieval + Mem0 memory search
 * 4. Build system prompt and stream model response via AI SDK
 * 5. On finish: save assistant message, citations, title, summary job, Mem0 learning
 *
 * @param res - Express response (streamed via `pipeUIMessageStreamToResponse`)
 * @param workspaceId - Workspace whose sources to search
 * @param userId - Authenticated user's id
 * @param input - Client chat payload from `useChat`
 * @returns Writes UI message stream to `res`; sets `X-Conversation-Id` header
 * @throws {ValidationError} When no user message text is present
 * @throws {NotFoundError} When conversation or workspace is not found
 *
 *
 */
export declare function streamWorkspaceChat(res: Response, workspaceId: string, userId: string, input: {
    conversationId?: string;
    messages: UIMessage[];
    model?: string;
    webSearch?: boolean;
}): Promise<void>;
//# sourceMappingURL=chat.services.d.ts.map