/**
 * Inngest event helpers for background artifact generation.
 */
/**
 * Enqueues an artifact generation job to run asynchronously via Inngest.
 *
 * @param input - Artifact and workspace ids for the worker
 * @returns Resolves when the event is accepted by Inngest
 *
 */
export declare function enqueueArtifactGeneration(input: {
    artifactId: string;
    workspaceId: string;
}): Promise<void>;
//# sourceMappingURL=artifact-events.d.ts.map