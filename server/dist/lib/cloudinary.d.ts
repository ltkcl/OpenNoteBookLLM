/** Normalized result returned after a successful Cloudinary upload. */
export type CloudinaryUploadResult = {
    secureUrl: string;
    publicId: string;
    bytes: number;
    originalFilename: string;
    resourceType: "raw" | "image";
};
export declare function getSignedCloudinaryDownloadUrl(publicId: string, resourceType?: "raw" | "image"): string | null;
/**
 * Uploads a PDF buffer to Cloudinary using an unsigned upload preset.
 *
 * @param buffer - PDF file bytes from Multer
 * @param filename - Original filename (used in the multipart form)
 * @returns Upload metadata including secure URL and public id
 * @throws {ValidationError} When Cloudinary is not configured or upload is rejected
 *
 */
export declare function uploadPdfToCloudinary(buffer: Buffer, filename: string): Promise<CloudinaryUploadResult>;
//# sourceMappingURL=cloudinary.d.ts.map