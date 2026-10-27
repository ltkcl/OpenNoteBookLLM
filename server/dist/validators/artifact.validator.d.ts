import { z } from "zod";
export declare const artifactTypes: readonly ["SUMMARY", "TAKEAWAYS", "FLASHCARDS", "QUIZ", "MINDMAP", "REPORT"];
export declare const artifactIdParamSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    artifactId: z.ZodString;
}, z.core.$strip>;
export declare const createArtifactSchema: z.ZodObject<{
    type: z.ZodEnum<{
        FLASHCARDS: "FLASHCARDS";
        MINDMAP: "MINDMAP";
        QUIZ: "QUIZ";
        REPORT: "REPORT";
        SUMMARY: "SUMMARY";
        TAKEAWAYS: "TAKEAWAYS";
    }>;
    title: z.ZodOptional<z.ZodString>;
    sourceIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type CreateArtifactInput = z.infer<typeof createArtifactSchema>;
//# sourceMappingURL=artifact.validator.d.ts.map