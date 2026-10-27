import { z } from "zod";
export declare const sourceTypeSchema: z.ZodEnum<{
    MARKDOWN: "MARKDOWN";
    PDF: "PDF";
    TEXT: "TEXT";
    WEBSITE: "WEBSITE";
    YOUTUBE: "YOUTUBE";
}>;
export declare const sourceStatusSchema: z.ZodEnum<{
    FAILED: "FAILED";
    PENDING: "PENDING";
    PROCESSING: "PROCESSING";
    READY: "READY";
}>;
export declare const workspaceIdParamSchema: z.ZodObject<{
    workspaceId: z.ZodString;
}, z.core.$strip>;
export declare const sourceIdParamSchema: z.ZodObject<{
    workspaceId: z.ZodString;
    sourceId: z.ZodString;
}, z.core.$strip>;
export declare const listSourcesQuerySchema: z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        MARKDOWN: "MARKDOWN";
        PDF: "PDF";
        TEXT: "TEXT";
        WEBSITE: "WEBSITE";
        YOUTUBE: "YOUTUBE";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        FAILED: "FAILED";
        PENDING: "PENDING";
        PROCESSING: "PROCESSING";
        READY: "READY";
    }>>;
}, z.core.$strip>;
export declare const createTextSourceSchema: z.ZodObject<{
    type: z.ZodLiteral<"TEXT">;
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const createMarkdownSourceSchema: z.ZodObject<{
    type: z.ZodLiteral<"MARKDOWN">;
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const createSourceSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"TEXT">;
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"MARKDOWN">;
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>], "type">;
export declare const importWebsiteSchema: z.ZodObject<{
    url: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const importYoutubeSchema: z.ZodObject<{
    url: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const bulkDeleteSourcesSchema: z.ZodObject<{
    sourceIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const reprocessSourcesSchema: z.ZodObject<{
    sourceIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const importWebSearchSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>;
export type CreateSourceInput = z.infer<typeof createSourceSchema>;
export type ListSourcesQuery = z.infer<typeof listSourcesQuerySchema>;
export type ImportWebsiteInput = z.infer<typeof importWebsiteSchema>;
export type ImportYoutubeInput = z.infer<typeof importYoutubeSchema>;
export type BulkDeleteSourcesInput = z.infer<typeof bulkDeleteSourcesSchema>;
export type ReprocessSourcesInput = z.infer<typeof reprocessSourcesSchema>;
export type ImportWebSearchInput = z.infer<typeof importWebSearchSchema>;
//# sourceMappingURL=source.validator.d.ts.map