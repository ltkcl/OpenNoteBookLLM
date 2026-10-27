import { z } from "zod";
export declare const conversationIdParamSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    conversationId: z.ZodString;
}, z.core.$strip>;
export declare const chatBodySchema: z.ZodObject<{
    conversationId: z.ZodOptional<z.ZodString>;
    messages: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    model: z.ZodOptional<z.ZodEnum<{
        "gpt-4o": "gpt-4o";
        "gpt-4o-mini": "gpt-4o-mini";
    }>>;
    webSearch: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type ChatBody = z.infer<typeof chatBodySchema>;
export declare const createConversationSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateConversationInput = z.infer<typeof createConversationSchema>;
//# sourceMappingURL=chat.validator.d.ts.map