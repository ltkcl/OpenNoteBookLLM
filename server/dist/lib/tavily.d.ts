export type TavilySearchResult = {
    title: string;
    url: string;
    content: string;
    score?: number;
};
export type TavilySearchResponse = {
    query: string;
    answer?: string;
    results: TavilySearchResult[];
};
/**
 * Runs a web search query via Tavily for the chat `web_search` tool.
 *
 * @param query - Natural-language search query from the model
 * @returns Normalized search response with up to 5 results and optional answer summary
 * @throws When `TAVILY_API_KEY` is not configured
 *
 */
export declare function searchWeb(query: string): Promise<TavilySearchResponse>;
/**
 * Formats Tavily results into a prompt block for the chat model.
 *
 * Results are labeled `[W1]`, `[W2]`, etc. for inline citation in assistant replies.
 *
 * @param response - Normalized Tavily search response
 * @returns Multi-line string injected into the tool result
 *
 *
 */
export declare function formatTavilyResultsForPrompt(response: TavilySearchResponse): string;
//# sourceMappingURL=tavily.d.ts.map