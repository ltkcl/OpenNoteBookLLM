export declare const SourceType: {
    readonly PDF: 'PDF';
    readonly WEBSITE: 'WEBSITE';
    readonly YOUTUBE: 'YOUTUBE';
    readonly TEXT: 'TEXT';
    readonly MARKDOWN: 'MARKDOWN';
};
export type SourceType = (typeof SourceType)[keyof typeof SourceType];
export declare const SourceStatus: {
    readonly PENDING: 'PENDING';
    readonly PROCESSING: 'PROCESSING';
    readonly READY: 'READY';
    readonly FAILED: 'FAILED';
};
export type SourceStatus = (typeof SourceStatus)[keyof typeof SourceStatus];
export declare const MessageRole: {
    readonly USER: 'USER';
    readonly ASSISTANT: 'ASSISTANT';
};
export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];
export declare const ArtifactType: {
    readonly SUMMARY: 'SUMMARY';
    readonly TAKEAWAYS: 'TAKEAWAYS';
    readonly FLASHCARDS: 'FLASHCARDS';
    readonly QUIZ: 'QUIZ';
    readonly MINDMAP: 'MINDMAP';
    readonly REPORT: 'REPORT';
};
export type ArtifactType = (typeof ArtifactType)[keyof typeof ArtifactType];
export declare const ArtifactStatus: {
    readonly PENDING: 'PENDING';
    readonly PROCESSING: 'PROCESSING';
    readonly READY: 'READY';
    readonly FAILED: 'FAILED';
};
export type ArtifactStatus = (typeof ArtifactStatus)[keyof typeof ArtifactStatus];
//# sourceMappingURL=enums.d.ts.map