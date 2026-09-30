export const PRESCRIPTION_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
export const PRESCRIPTION_MAX_MB = 5;

/** Returns an error message, or null when the file is acceptable. */
export function validateFile(file: File, accept: string[], maxSizeMB: number): string | null {
  if (file.size === 0) return 'This file is empty. Choose a different file.';
  if (!accept.includes(file.type)) return 'Unsupported file type. Upload a JPG, PNG, WebP or PDF file.';
  if (file.size > maxSizeMB * 1024 * 1024) return `File is too large. The maximum size is ${maxSizeMB} MB.`;
  return null;
}
