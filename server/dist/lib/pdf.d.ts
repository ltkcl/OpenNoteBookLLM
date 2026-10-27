export type PdfExtractResult = {
    text: string;
    pages: string[];
    pageCount: number;
};
export declare function extractPdfFromBuffer(buffer: ArrayBuffer | Buffer): Promise<PdfExtractResult>;
export declare function extractPdfFromCloudinary(input: {
    fileUrl: string;
    publicId?: string;
    resourceType?: "raw" | "image";
}): Promise<PdfExtractResult>;
//# sourceMappingURL=pdf.d.ts.map