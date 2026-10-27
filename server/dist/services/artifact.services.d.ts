import { type ArtifactRecord } from "../repository/artifacts.repository.js";
import type { CreateArtifactInput } from "../validators/artifact.validator.js";
/**
 * Lists all learning artifacts in a workspace.
 *
 * @param workspaceId - Workspace to list artifacts from
 * @param userId - Authenticated user's id
 * @returns Artifact records ordered by creation time
 *
 */
export declare function listArtifactsForWorkspace(workspaceId: string, userId: string): Promise<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
}[]>;
/**
 * Loads a single artifact after verifying workspace ownership.
 *
 * @param workspaceId - Workspace the artifact belongs to
 * @param artifactId - Artifact to fetch
 * @param userId - Authenticated user's id
 * @returns Artifact record with content when status is `READY`
 * @throws {NotFoundError} When the artifact does not exist in this workspace
 *
 */
export declare function getArtifactForWorkspace(workspaceId: string, artifactId: string, userId: string): Promise<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
}>;
/**
 * Creates a pending artifact and enqueues background generation via Inngest.
 *
 * Validates that ready sources exist before creating the row. The actual AI
 * generation runs asynchronously in {@link processArtifactById}.
 *
 * @param workspaceId - Workspace to attach the artifact to
 * @param userId - Authenticated user's id
 * @param input - Artifact type, optional title, optional source id filter
 * @returns New artifact with status `PENDING`
 * @throws {ValidationError} When no ready sources are available
 *
 */
export declare function createArtifactForWorkspace(workspaceId: string, userId: string, input: CreateArtifactInput): Promise<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
}>;
/**
 * Deletes an artifact from the workspace.
 *
 * @param workspaceId - Workspace the artifact belongs to
 * @param artifactId - Artifact to delete
 * @param userId - Authenticated user's id
 * @returns Resolves when the artifact row is deleted
 * @throws {NotFoundError} When the artifact is not found
 *
 */
export declare function deleteArtifactForWorkspace(workspaceId: string, artifactId: string, userId: string): Promise<void>;
/**
 * Runs the full artifact generation pipeline (used by Inngest worker).
 *
 * ```
 * status: PROCESSING
 *   → gatherSourceContext
 *   → generateArtifactContent
 *   → status: READY (or FAILED on error)
 * ```
 *
 * @param artifactId - Artifact to generate content for
 * @returns Updated artifact with `READY` status and generated content
 * @throws When the artifact is missing or generation fails (status set to `FAILED`)
 *
 *
 */
export declare function processArtifactById(artifactId: string): Promise<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
}>;
export type { ArtifactRecord };
//# sourceMappingURL=artifact.services.d.ts.map