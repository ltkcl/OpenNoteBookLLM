import { type Index, type PineconeRecord } from "@pinecone-database/pinecone";
declare const indexName: string;
export declare function ensurePineconeIndex(): Promise<void>;
export declare function getPineconeIndex(): Promise<Index>;
export type VectorMetadata = {
    workspaceId: string;
    sourceId: string;
    chunkId: string;
    chunkIndex: number;
    sourceTitle: string;
    sourceType: string;
    text: string;
    page?: number;
};
export declare function upsertSourceVectors(workspaceId: string, records: PineconeRecord<VectorMetadata>[]): Promise<void>;
export declare function deleteSourceVectors(workspaceId: string, sourceId: string): Promise<void>;
export declare function deleteWorkspaceVectors(workspaceId: string): Promise<void>;
export declare function queryWorkspaceVectors(workspaceId: string, vector: number[], topK: number): Promise<import("@pinecone-database/pinecone").ScoredPineconeRecord<import("@pinecone-database/pinecone").RecordMetadata>[]>;
export { indexName as PINECONE_INDEX_NAME };
//# sourceMappingURL=pinecone.d.ts.map