import type { Request, Response } from "express";
import {
    createArtifactForWorkspace,
    deleteArtifactForWorkspace,
    getArtifactForWorkspace,
    listArtifactsForWorkspace,
} from "../services/artifact.services.js";
import { ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import { artifactIdParamSchema, createArtifactSchema } from "../validators/artifact.validator.js";
import { workspaceIdParamSchema } from "../validators/workspace.validator.js";

function parseWorkspaceId(params: Request["params"]) {
    const parsed = workspaceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError("Invalid workspace id", getZodFieldErrors(parsed.error));
    }
    return parsed.data.workspaceId;
}

export async function listArtifacts(req: Request, res: Response) {
    res.json(await listArtifactsForWorkspace(parseWorkspaceId(req.params), req.session.user.id));
}

export async function getArtifact(req: Request, res: Response) {
    const parsed = artifactIdParamSchema.safeParse(req.params);
    if (!parsed.success) {
        throw new ValidationError("Invalid artifact id", getZodFieldErrors(parsed.error));
    }
    res.json(await getArtifactForWorkspace(parsed.data.workspaceId, parsed.data.artifactId, req.session.user.id));
}

export async function createArtifact(req: Request, res: Response) {
    const workspaceId = parseWorkspaceId(req.params);
    const parsed = createArtifactSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ValidationError("Validation failed", getZodFieldErrors(parsed.error));
    }
    const artifact = await createArtifactForWorkspace(workspaceId, req.session.user.id, parsed.data);
    res.status(201).json(artifact);
}

export async function deleteArtifact(req: Request, res: Response) {
    const parsed = artifactIdParamSchema.safeParse(req.params);
    if (!parsed.success) {
        throw new ValidationError("Invalid artifact id", getZodFieldErrors(parsed.error));
    }
    await deleteArtifactForWorkspace(parsed.data.workspaceId, parsed.data.artifactId, req.session.user.id);
    res.status(204).send();
}
