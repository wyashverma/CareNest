import { FileText } from 'lucide-react';
import { FileDropzone } from '@/components/forms/FileDropzone';
import { uploadPrescription } from '@/services/prescriptionService';
import { PRESCRIPTION_MAX_MB, PRESCRIPTION_MIME_TYPES } from '@/utils/validateFile';

/** Shown on product pages for prescription-only items. Upload is optional here; it is also requested at checkout. */
export function PrescriptionUpload() {
  return (
    <section aria-labelledby="rx-title" className="rounded-lg border border-line bg-white p-4">
      <h2 id="rx-title" className="flex items-center gap-2 text-base">
        <FileText className="h-5 w-5 text-brand-600" aria-hidden="true" />
        This item needs a prescription
      </h2>
      <p className="mt-1 text-sm text-muted">
        Upload a prescription now, or add it at checkout. Uploading a file does not mean it has been reviewed or verified.
      </p>
      <div className="mt-4">
        <FileDropzone
          accept={PRESCRIPTION_MIME_TYPES}
          maxSizeMB={PRESCRIPTION_MAX_MB}
          onUpload={uploadPrescription}
          successMessage="Prescription uploaded successfully"
        />
      </div>
    </section>
  );
}
