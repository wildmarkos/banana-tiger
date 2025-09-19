'use client';

import { useState, useEffect, useCallback } from 'react';
import { CloudUpload, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/components/ui';

import type { CloudJobWithUser } from '@/actions/roomote';

interface CloudJobButtonProps {
  job?: CloudJobWithUser;
  disabled?: boolean;
}

export const CloudJobButton = ({ job, disabled = false }: CloudJobButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);

  // Generate the cloud URL for the job (using same pattern as VSCode extension)
  const cloudTaskUrl = job?.id 
    ? `${process.env.NEXT_PUBLIC_CLOUD_API_URL || 'https://app.roocode.com'}/task/${job.id}` 
    : '';

  const copyWithFeedback = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, []);

  const generateQRCode = useCallback(
    (canvas: HTMLCanvasElement, context: string) => {
      if (!cloudTaskUrl) {
        // This will run again later when ready
        return;
      }

      QRCode.toCanvas(
        canvas,
        cloudTaskUrl,
        {
          width: 140,
          margin: 0,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error: Error | null | undefined) => {
          if (error) {
            console.error(`Error generating QR code (${context}):`, error);
          }
        },
      );
    },
    [cloudTaskUrl],
  );

  // Callback ref to capture canvas element when it mounts
  const canvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node) {
        setCanvasElement(node);

        // Try to generate QR code immediately when canvas is available
        if (dialogOpen) {
          generateQRCode(node, 'on mount');
        }
      } else {
        setCanvasElement(null);
      }
    },
    [dialogOpen, generateQRCode],
  );

  // Also generate QR code when dialog opens after canvas is available
  useEffect(() => {
    if (dialogOpen && canvasElement) {
      generateQRCode(canvasElement, 'in useEffect');
    }
  }, [dialogOpen, canvasElement, generateQRCode]);

  // Don't show if no job ID
  if (!job?.id) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        disabled={disabled}
        className="h-7 w-7 p-1.5 hover:bg-muted"
        onClick={() => setDialogOpen(true)}
        data-testid="cloud-job-button"
        title="Open job in Roo Code Cloud">
        <CloudUpload className="h-4 w-4" />
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Open Job in Roo Code Cloud</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-4">
            <p className="text-center md:text-left max-w-80 text-sm text-muted-foreground">
              Keep monitoring or interacting with Roo from anywhere. Scan, click or copy to open.
            </p>
            <div className="flex justify-center md:justify-start">
              <div
                className="w-[170px] h-[170px] bg-white rounded-lg border cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => window.open(cloudTaskUrl, '_blank')}
                title="Open job in Roo Code Cloud">
                <canvas ref={canvasRef} className="m-[15px]" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Input 
                value={cloudTaskUrl} 
                disabled 
                className="flex-1 font-mono text-sm" 
                readOnly 
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyWithFeedback(cloudTaskUrl)}
                className="h-9 w-9"
                title="Copy URL to clipboard">
                {copyFeedback ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};