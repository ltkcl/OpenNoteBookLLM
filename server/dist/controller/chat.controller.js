import { createConversationForWorkspace, deleteConversationForWorkspace, getConversationMessagesForWorkspace, listConversationsForWorkspace, streamWorkspaceChat, } from "../services/chat.services.js";
import { ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import { chatBodySchema, conversationIdParamSchema, createConversationSchema, } from "../validators/chat.validator.js";
import { workspaceIdParamSchema } from "../validators/workspace.validator.js";
function parseWorkspaceId(params) {
    const parsed = workspaceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError("Invalid workspace id", getZodFieldErrors(parsed.error));
    }
    return parsed.data.workspaceId;
}
function parseConversationParams(params) {
    const parsed = conversationIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError("Invalid conversation id", getZodFieldErrors(parsed.error));
    }
    return parsed.data;
}
export async function listConversations(req, res) {
    const conversations = await listConversationsForWorkspace(parseWorkspaceId(req.params), req.session.user.id);
    res.json(conversations);
}
export async function createConversation(req, res) {
    const workspaceId = parseWorkspaceId(req.params);
    const parsed = createConversationSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ValidationError("Validation failed", getZodFieldErrors(parsed.error));
    }
    const conversation = await createConversationForWorkspace(workspaceId, req.session.user.id, parsed.data.title);
    res.status(201).json(conversation);
}
export async function getConversationMessages(req, res) {
    const { workspaceId, conversationId } = parseConversationParams(req.params);
    const messages = await getConversationMessagesForWorkspace(workspaceId, conversationId, req.session.user.id);
    res.json(messages);
}
export async function deleteConversation(req, res) {
    const { workspaceId, conversationId } = parseConversationParams(req.params);
    await deleteConversationForWorkspace(workspaceId, conversationId, req.session.user.id);
    res.status(204).send();
}
export async function chat(req, res) {
    const workspaceId = parseWorkspaceId(req.params);
    const parsed = chatBodySchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ValidationError("Validation failed", getZodFieldErrors(parsed.error));
    }
    await streamWorkspaceChat(res, workspaceId, req.session.user.id, parsed.data);
}
//# sourceMappingURL=chat.controller.js.map