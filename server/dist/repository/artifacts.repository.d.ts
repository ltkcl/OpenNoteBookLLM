import type { Prisma } from "../generated/prisma/client.js";
export declare const artifactSelect: {
    readonly id: true;
    readonly workspaceId: true;
    readonly type: true;
    readonly title: true;
    readonly content: true;
    readonly sourceIds: true;
    readonly status: true;
    readonly metadata: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
export type ArtifactRecord = Prisma.LearningArtifactGetPayload<{
    select: typeof artifactSelect;
}>;
export type CreateArtifactData = {
    workspaceId: string;
    type: ArtifactRecord["type"];
    title: string;
    sourceIds: string[];
    status?: ArtifactRecord["status"];
    metadata?: Prisma.InputJsonValue;
};
export declare function findArtifactsByWorkspaceId(workspaceId: string): Prisma.PrismaPromise<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
}[]>;
export declare function findArtifactByIdAndWorkspaceId(artifactId: string, workspaceId: string): Prisma.Prisma__LearningArtifactClient<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function createArtifactRecord(data: CreateArtifactData): Prisma.Prisma__LearningArtifactClient<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function updateArtifactRecord(artifactId: string, data: {
    title?: string;
    content?: Prisma.InputJsonValue;
    status?: ArtifactRecord["status"];
    metadata?: Prisma.InputJsonValue;
}): Prisma.Prisma__LearningArtifactClient<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function deleteArtifactRecord(artifactId: string): Promise<void>;
export declare function findArtifactById(artifactId: string): Prisma.Prisma__LearningArtifactClient<{
    content: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    id: string;
    metadata: import("@prisma/client/runtime/client").JsonValue;
    sourceIds: string[];
    status: import("../generated/prisma/enums.js").ArtifactStatus;
    title: string;
    type: import("../generated/prisma/enums.js").ArtifactType;
    updatedAt: Date;
    workspaceId: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
//# sourceMappingURL=artifacts.repository.d.ts.map