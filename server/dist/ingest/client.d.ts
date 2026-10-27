import { Inngest } from "inngest";
export declare const inngest: Inngest<{
    readonly id: "chaibook";
}>;
export type SourceCreatedEvent = {
    name: "source/created";
    data: {
        sourceId: string;
        workspaceId: string;
    };
};
export type InngestEvents = SourceCreatedEvent;
//# sourceMappingURL=client.d.ts.map