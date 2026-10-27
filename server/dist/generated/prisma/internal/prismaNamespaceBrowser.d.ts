import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly Session: 'Session';
    readonly Account: 'Account';
    readonly Verification: 'Verification';
    readonly Workspace: 'Workspace';
    readonly SourceChunk: 'SourceChunk';
    readonly Source: 'Source';
    readonly Conversation: 'Conversation';
    readonly Message: 'Message';
    readonly LearningArtifact: 'LearningArtifact';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly emailVerified: 'emailVerified';
    readonly image: 'image';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: 'id';
    readonly expiresAt: 'expiresAt';
    readonly token: 'token';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly ipAddress: 'ipAddress';
    readonly userAgent: 'userAgent';
    readonly userId: 'userId';
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: 'id';
    readonly accountId: 'accountId';
    readonly providerId: 'providerId';
    readonly userId: 'userId';
    readonly accessToken: 'accessToken';
    readonly refreshToken: 'refreshToken';
    readonly idToken: 'idToken';
    readonly accessTokenExpiresAt: 'accessTokenExpiresAt';
    readonly refreshTokenExpiresAt: 'refreshTokenExpiresAt';
    readonly scope: 'scope';
    readonly password: 'password';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: 'id';
    readonly identifier: 'identifier';
    readonly value: 'value';
    readonly expiresAt: 'expiresAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const WorkspaceScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly title: 'title';
    readonly description: 'description';
    readonly icon: 'icon';
    readonly defaultModel: 'defaultModel';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum];
export declare const SourceChunkScalarFieldEnum: {
    readonly id: 'id';
    readonly sourceId: 'sourceId';
    readonly index: 'index';
    readonly content: 'content';
    readonly tokenCount: 'tokenCount';
    readonly metadata: 'metadata';
    readonly createdAt: 'createdAt';
};
export type SourceChunkScalarFieldEnum = (typeof SourceChunkScalarFieldEnum)[keyof typeof SourceChunkScalarFieldEnum];
export declare const SourceScalarFieldEnum: {
    readonly id: 'id';
    readonly workspaceId: 'workspaceId';
    readonly type: 'type';
    readonly title: 'title';
    readonly content: 'content';
    readonly url: 'url';
    readonly status: 'status';
    readonly metadata: 'metadata';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: 'id';
    readonly workspaceId: 'workspaceId';
    readonly title: 'title';
    readonly summary: 'summary';
    readonly summaryMessageCount: 'summaryMessageCount';
    readonly summarizedAt: 'summarizedAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: 'id';
    readonly conversationId: 'conversationId';
    readonly role: 'role';
    readonly content: 'content';
    readonly citations: 'citations';
    readonly createdAt: 'createdAt';
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const LearningArtifactScalarFieldEnum: {
    readonly id: 'id';
    readonly workspaceId: 'workspaceId';
    readonly type: 'type';
    readonly title: 'title';
    readonly content: 'content';
    readonly sourceIds: 'sourceIds';
    readonly status: 'status';
    readonly metadata: 'metadata';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type LearningArtifactScalarFieldEnum = (typeof LearningArtifactScalarFieldEnum)[keyof typeof LearningArtifactScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map