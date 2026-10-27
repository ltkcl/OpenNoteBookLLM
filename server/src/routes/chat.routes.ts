import { Router } from "express";
import { chat, createConversation, deleteConversation, getConversationMessages, listConversations } from "../controller/chat.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

export const chatRoutes = Router({ mergeParams: true });

chatRoutes.get("/conversations", asyncHandler(listConversations));
chatRoutes.post("/conversations", asyncHandler(createConversation));
chatRoutes.get("/conversations/:conversationId/messages", asyncHandler(getConversationMessages));
chatRoutes.delete("/conversations/:conversationId", asyncHandler(deleteConversation));
chatRoutes.post("/chat", asyncHandler(chat));
