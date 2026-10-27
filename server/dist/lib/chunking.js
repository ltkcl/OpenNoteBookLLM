const DEFAULT_CHUNK_SIZE = 1000;
const DEFAULT_CHUNK_OVERLAP = 100;
const SEPARATORS = ["\n\n", "\n", ". ", " ", ""];
function mergeSplits(splits, separator, chunkSize) {
    const docs = [];
    let current = [];
    let total = 0;
    for (const split of splits) {
        const len = split.length;
        const sepLen = current.length > 0 ? separator.length : 0;
        if (total + len + sepLen > chunkSize && current.length > 0) {
            docs.push(current.join(separator));
            total = 0;
            current = [];
        }
        current.push(split);
        total += len + sepLen;
    }
    if (current.length > 0) {
        docs.push(current.join(separator));
    }
    return docs;
}
function splitText(text, chunkSize, chunkOverlap) {
    const chunks = [];
    for (const separator of SEPARATORS) {
        if (separator) {
            const splits = text.split(separator).filter(Boolean);
            if (splits.length === 1) {
                continue;
            }
            chunks.push(...mergeSplits(splits, separator, chunkSize));
        }
        else {
            for (let i = 0; i < text.length; i += chunkSize - chunkOverlap) {
                chunks.push(text.slice(i, i + chunkSize));
            }
        }
        if (chunks.length > 0) {
            break;
        }
    }
    return chunks.filter((chunk) => chunk.trim().length > 0);
}
export function chunkText(text, options = {}) {
    const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
    const chunkOverlap = options.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP;
    const parts = splitText(text.trim(), chunkSize, chunkOverlap);
    return parts.map((content, index) => ({
        index,
        content,
        metadata: options.metadata,
    }));
}
export function chunkPages(pages, options = {}) {
    const chunks = [];
    let index = 0;
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const pageText = pages[pageIndex].trim();
        if (!pageText) {
            continue;
        }
        const pageChunks = chunkText(pageText, {
            ...options,
            metadata: { page: pageIndex + 1 },
        });
        for (const chunk of pageChunks) {
            chunks.push({
                index,
                content: chunk.content,
                metadata: chunk.metadata,
            });
            index += 1;
        }
    }
    return chunks;
}
//# sourceMappingURL=chunking.js.map