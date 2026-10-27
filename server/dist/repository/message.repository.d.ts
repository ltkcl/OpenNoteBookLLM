import type { Prisma } from "../generated/prisma/client.js";
export declare const messageSelect: {
    readonly id: true;
    readonly conversationId: true;
    readonly role: true;
    readonly content: true;
    readonly citations: true;
    readonly createdAt: true;
};
export type MessageRecord = Prisma.MessageGetPayload<{
    select: typeof messageSelect;
}>;
export type CreateMessageData = {
    conversationId: string;
    role: MessageRecord["role"];
    content: string;
    citations?: Prisma.InputJsonValue;
};
export declare function findMessagesByConversationId(conversationId: string): Prisma.PrismaPromise<{
    citations: import("@prisma/client/runtime/client").JsonValue;
    content: string;
    conversationId: string;
    createdAt: Date;
    id: string;
    role: import("../generated/prisma/enums.js").MessageRole;
}[]>;
export declare function countMessagesByConversationId(conversationId: string): Prisma.PrismaPromise<number>;
export declare function createMessageRecord(data: CreateMessageData): Prisma.Prisma__MessageClient<{
    citations: import("@prisma/client/runtime/client").JsonValue;
    content: string;
    conversationId: string;
    createdAt: Date;
    id: string;
    role: import("../generated/prisma/enums.js").MessageRole;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
//# sourceMappingURL=message.repository.d.ts.map