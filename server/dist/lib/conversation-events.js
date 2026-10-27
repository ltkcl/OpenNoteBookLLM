import { inngest } from "../ingest/client.js";
export async function enqueueConversationSummarize(input) {
    await inngest.send({
        name: "conversation/summarize",
        data: input,
    });
}
//# sourceMappingURL=conversation-events.js.map