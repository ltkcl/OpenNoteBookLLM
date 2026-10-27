import { inngest } from "../ingest/client.js";
export async function enqueueSourceProcessing(input) {
    await inngest.send({
        name: "source/created",
        data: input,
    });
}
//# sourceMappingURL=source-events.js.map