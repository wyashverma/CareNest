import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface DropdownProps {
  /** Accessible name for the trigger button. */
  label: string;
  trigger: ReactNode;
  align?: 'left' | 'right';
  triggerClassName?: string;
  panelClassName?: string;
  children: ReactNode | ((close: () => void) => ReactNode);
}

export function Dropdown({ label, trigger, align = 'right', triggerClassName, panelClassName, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cn('inline-flex items-center gap-2 rounded-md hover:bg-surface', triggerClassName)}
      >
        {trigger}
      </button>
      {open && (
        <div
          id={panelId}
          className={cn(
            'absolute top-full z-50 mt-2 max-w-[calc(100vw-2rem)] rounded-lg border border-line bg-white shadow-overlay',
            align === 'right' ? 'right-0' : 'left-0',
            panelClassName,
          )}
        >
          {typeof children === 'function' ? children(close) : children}
        </div>
      )}
    </div>
  );
}
