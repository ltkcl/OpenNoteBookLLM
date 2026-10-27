import { inngest } from "../ingest/client.js";
export async function enqueueSourceProcessing(input: {
    sourceId: string;
    workspaceId: string;
}) {
    await inngest.send({
        name: "source/created",
        data: input,
    });
}