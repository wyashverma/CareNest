import { useId, useRef, useState, type DragEvent } from 'react';
import { CheckCircle2, FileText, UploadCloud, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { validateFile } from '@/utils/validateFile';
import { cn } from '@/utils/cn';

interface FileDropzoneProps {
  accept: string[];
  maxSizeMB: number;
  onUpload: (file: File, onProgress: (percent: number) => void) => Promise<unknown>;
  successMessage: string;
  hint?: string;
}

type Phase = 'idle' | 'uploading' | 'success' | 'error';

/** Drag and drop or browse. Validates type and size, shows progress, and reports success or failure. */
export function FileDropzone({ accept, maxSizeMB, onUpload, successMessage, hint }: FileDropzoneProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    const problem = validateFile(file, accept, maxSizeMB);
    if (problem) {
      setPhase('error');
      setError(problem);
      return;
    }
    setPhase('uploading');
    setProgress(0);
    setError('');
    try {
      await onUpload(file, setProgress);
      setPhase('success');
    } catch (e) {
      setPhase('error');
      setError(e instanceof Error ? e.message : 'Upload failed. Try again.');
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (phase !== 'uploading') void handleFile(e.dataTransfer.files[0]);
  };

  const busy = phase === 'uploading';

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'flex flex-col items-center rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors',
          dragging ? 'border-brand-600 bg-brand-50' : 'border-line bg-white',
          phase === 'error' && 'border-danger/40',
        )}
      >
        <UploadCloud className="h-8 w-8 text-brand-600" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium">Drag and drop your file here</p>
        <p className="text-sm text-muted">or</p>
        <input
          ref={inputRef}
          id={id}
          type="file"
          hidden
          accept={accept.join(',')}
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        <Button variant="outline" size="sm" className="mt-2" disabled={busy} onClick={() => inputRef.current?.click()}>
          {phase === 'success' ? 'Replace file' : 'Browse files'}
        </Button>
        <p className="mt-3 text-xs text-muted">{hint ?? `JPG, PNG, WebP or PDF, up to ${maxSizeMB} MB`}</p>
      </div>

      <div aria-live="polite" className="mt-3">
        {busy && (
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex min-w-0 items-center gap-2"><FileText className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" /><span className="truncate">{fileName}</span></span>
              <span className="text-muted">{progress}%</span>
            </div>
            <div role="progressbar" aria-label="Upload progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="mt-2 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        {phase === 'success' && (
          <p className="flex items-start gap-2 rounded-md bg-success-soft p-3 text-sm font-medium text-success">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{successMessage}<span className="block font-normal text-muted">{fileName}</span></span>
          </p>
        )}
        {phase === 'error' && (
          <p role="alert" className="flex items-start gap-2 rounded-md bg-danger-soft p-3 text-sm text-danger">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
