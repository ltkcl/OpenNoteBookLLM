import type { Prisma } from "../generated/prisma/client.js";
export declare const conversationSelect: {
    readonly id: true;
    readonly workspaceId: true;
    readonly title: true;
    readonly summary: true;
    readonly summaryMessageCount: true;
    readonly summarizedAt: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
export type ConversationRecord = Prisma.ConversationGetPayload<{
    select: typeof conversationSelect;
}>;
export declare function findConversationsByWorkspaceId(workspaceId: string): Prisma.PrismaPromise<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}[]>;
export declare function findConversationById(conversationId: string): Prisma.Prisma__ConversationClient<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function findConversationByIdAndWorkspaceId(conversationId: string, workspaceId: string): Prisma.Prisma__ConversationClient<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function createConversationRecord(workspaceId: string, title?: string): Prisma.Prisma__ConversationClient<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function updateConversationSummary(conversationId: string, data: {
    summary: string;
    summaryMessageCount: number;
}): Prisma.Prisma__ConversationClient<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function updateConversationRecord(conversationId: string, data: {
    title?: string | null;
}): Prisma.Prisma__ConversationClient<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function touchConversation(conversationId: string): Prisma.Prisma__ConversationClient<{
    createdAt: Date;
    id: string;
    summarizedAt: Date | null;
    summary: string | null;
    summaryMessageCount: number;
    title: string | null;
    updatedAt: Date;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function deleteConversationRecord(conversationId: string): Promise<void>;
//# sourceMappingURL=conversation.repository.d.ts.map