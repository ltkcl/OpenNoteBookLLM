import { z } from "zod";
export declare const CHAT_MODELS: readonly ["gpt-4o-mini", "gpt-4o"];
export declare const createWorkspaceSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    defaultModel: z.ZodOptional<z.ZodEnum<{
        "gpt-4o": "gpt-4o";
        "gpt-4o-mini": "gpt-4o-mini";
    }>>;
}, z.core.$strip>;
export declare const updateWorkspaceSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    icon: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    defaultModel: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        "gpt-4o": "gpt-4o";
        "gpt-4o-mini": "gpt-4o-mini";
    }>>>;
}, z.core.$strip>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export declare const workspaceIdParamSchema: z.ZodObject<{
    workspaceId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=workspace.validator.d.ts.map