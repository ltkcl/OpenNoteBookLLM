import { deleteWorkspaceVectors } from "../lib/pinecone.js";
import { createWorkspaceRecord, deleteWorkspaceRecord, findWorkspaceByIdAndUserId, findWorkspacesByUserId, updateWorkspaceRecord, } from "../repository/workspace.repository.js";
import { NotFoundError } from "../types/app-error.js";
export function listWorkspacesByUser(userId) {
    return findWorkspacesByUserId(userId);
}
export async function getWorkspaceByIdForUser(workspaceId, userId) {
    const workspace = await findWorkspaceByIdAndUserId(workspaceId, userId);
    if (!workspace) {
        throw new NotFoundError("Workspace not found");
    }
    return workspace;
}
export function createWorkspaceForUser(userId, input) {
    return createWorkspaceRecord(userId, input);
}
export async function updateWorkspaceForUser(workspaceId, userId, input) {
    await getWorkspaceByIdForUser(workspaceId, userId);
    return updateWorkspaceRecord(workspaceId, input);
}
export async function deleteWorkspaceForUser(workspaceId, userId) {
    await getWorkspaceByIdForUser(workspaceId, userId);
    try {
        await deleteWorkspaceVectors(workspaceId);
    }
    catch (error) {
        console.error("Failed to delete Pinecone namespace:", error);
    }
    await deleteWorkspaceRecord(workspaceId);
}
//# sourceMappingURL=workspace.services.js.map