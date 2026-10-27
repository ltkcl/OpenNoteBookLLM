/** Default chat model when the client or workspace does not specify one. */
export declare const CHAT_MODEL = "gpt-4o-mini";
/** Allowed chat models exposed to the client and workspace settings. */
export declare const CHAT_MODELS: readonly ["gpt-4o-mini", "gpt-4o"];
/** OpenAI embedding model used for RAG vector indexing and query embedding. */
export declare const EMBEDDING_MODEL = "text-embedding-3-small";
/** Vector dimension count — must match Pinecone index configuration. */
export declare const EMBEDDING_DIMENSIONS = 1536;
/** Target max characters per text chunk during source processing. */
export declare const CHUNK_SIZE = 1000;
/** Character overlap between consecutive chunks at split boundaries. */
export declare const CHUNK_OVERLAP = 100;
/** Number of Pinecone chunks to retrieve per chat query. */
export declare const RAG_TOP_K = 6;
/** Minimum cosine similarity score for a retrieved chunk to be included in context. */
export declare const RAG_MIN_SCORE = 0.35;
/** Enqueue a conversation summary job every N persisted messages. */
export declare const CONVERSATION_SUMMARY_INTERVAL = 8;
/** Max recent UI messages sent to the model when a rolling summary exists. */
export declare const RECENT_MESSAGE_WINDOW = 12;
//# sourceMappingURL=ai-config.d.ts.map