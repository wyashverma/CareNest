import type { Prescription } from '@/types/prescription';
import { PRESCRIPTION_MAX_MB, PRESCRIPTION_MIME_TYPES, validateFile } from '@/utils/validateFile';
import { readJSON, writeJSON } from '@/utils/storage';
import { USE_MOCK } from './http/config';
import { API_BASE_URL } from './http/config';
import { ApiError } from './http/apiClient';

const STORAGE_KEY = 'carenest.prescriptions';

/**
 * Uploads a prescription file.
 * MOCK: simulates progress and stores only file metadata locally. The file is not sent anywhere,
 * and no verification is performed. A real implementation POSTs multipart form data to the API.
 */
export async function uploadPrescription(file: File, onProgress: (percent: number) => void): Promise<Prescription> {
  const problem = validateFile(file, PRESCRIPTION_MIME_TYPES, PRESCRIPTION_MAX_MB);
  if (problem) throw new Error(problem);

  if (!USE_MOCK) {
    const body = new FormData();
    body.append('file', file);
    const res = await fetch(`${API_BASE_URL}/prescriptions`, { method: 'POST', body });
    if (!res.ok) throw new ApiError(`Upload failed (${res.status})`, res.status);
    onProgress(100);
    return (await res.json()) as Prescription;
  }

  await new Promise<void>((resolve) => {
    let pct = 0;
    const timer = window.setInterval(() => {
      pct = Math.min(100, pct + 20);
      onProgress(pct);
      if (pct >= 100) {
        window.clearInterval(timer);
        resolve();
      }
    }, 180);
  });

  const record: Prescription = {
    id: `rx-${Date.now()}`,
    fileName: file.name,
    fileType: file.type,
    sizeKB: Math.max(1, Math.round(file.size / 1024)),
    uploadedAt: new Date().toISOString(),
  };
  writeJSON(STORAGE_KEY, [record, ...readJSON<Prescription[]>(STORAGE_KEY, [])]);
  return record;
}
