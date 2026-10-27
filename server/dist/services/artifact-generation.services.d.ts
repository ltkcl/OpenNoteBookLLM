import type { ArtifactRecord } from "../repository/artifacts.repository.js";
/**
 * Collects and concatenates text from READY workspace sources for artifact generation.
 *
 * @param workspaceId - Workspace whose sources to read
 * @param sourceIds - Optional subset of source ids; defaults to all READY sources
 * @returns Combined source text (max 120k chars) and the ids actually used
 * @throws {ValidationError} When no ready sources exist or none have extracted content
 *
 *
 *
 */
export declare function gatherSourceContext(workspaceId: string, sourceIds?: string[]): Promise<{
    text: string;
    sourceIds: string[];
}>;
/**
 * Generates structured or markdown content for a learning artifact using the AI SDK.
 *
 * @param type - Artifact type (`SUMMARY`, `QUIZ`, `FLASHCARDS`, etc.)
 * @param sourceText - Combined source material from {@link gatherSourceContext}
 * @returns Type-specific JSON content stored on the artifact row
 * @throws {ValidationError} When the artifact type is unsupported
 *
 *
 *
 */
export declare function generateArtifactContent(type: ArtifactRecord["type"], sourceText: string): Promise<{
    items: string[];
} | {
    cards: {
        front: string;
        back: string;
    }[];
} | {
    questions: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    }[];
} | {
    nodes: {
        id: string;
        label: string;
    }[];
    edges: {
        id: string;
        source: string;
        target: string;
    }[];
} | {
    markdown: string;
    sections: {
        title: string;
        content: string;
    }[];
} | {
    markdown: string;
}>;
//# sourceMappingURL=artifact-generation.services.d.ts.map