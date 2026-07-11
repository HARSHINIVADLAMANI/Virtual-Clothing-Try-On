import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit, createMediaStreamSource, Transform2D } from '@snap/camera-kit';
import { CameraKitConfig } from '../types';
import { Loader2, AlertCircle } from 'lucide-react';

interface ARViewerProps {
  config: CameraKitConfig;
  isActive: boolean;
  onStatusChange?: (status: { isLoading: boolean; error: string | null }) => void;
}

export const ARViewer: React.FC<ARViewerProps> = ({ config, isActive, onStatusChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    let cameraSession: any = null;
    let mediaStream: MediaStream | null = null;
    let cameraKit: any = null;

    const notifyStatus = (isLoading: boolean, error: string | null) => {
      setLocalLoading(isLoading);
      setLocalError(error);
      if (onStatusChange) {
        onStatusChange({ isLoading, error });
      }
    };

    const startCameraKit = async () => {
      if (!isActive) return;
      if (!config.apiToken) {
        notifyStatus(false, 'API Token is missing.');
        return;
      }
      notifyStatus(true, null);

      try {
        cameraKit = await bootstrapCameraKit({ apiToken: config.apiToken });
        
        if (!active) return;
        
        cameraSession = await cameraKit.createSession();
        
        if (!active) return;

        // Append the live canvas to our container
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          const canvas = cameraSession.output.live as HTMLCanvasElement;
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          canvas.style.objectFit = 'cover';
          canvas.style.display = 'block';
          containerRef.current.appendChild(canvas);
        }

        // Get camera stream
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user'
          }
        });
        
        if (!active) return;

        const source = createMediaStreamSource(mediaStream, { 
          transform: Transform2D.MirrorX, 
          cameraType: 'user' 
        });

        await cameraSession.setSource(source);
        await cameraSession.play();

        // Apply lens if provided
        if (config.lensId && config.lensGroupId) {
          try {
            const lens = await cameraKit.lensRepository.loadLens(config.lensId, config.lensGroupId);
            if (active) {
              await cameraSession.applyLens(lens);
            }
          } catch (lensError: any) {
            console.error('Failed to load lens:', lensError);
            let errorMsg = `Failed to load lens: ${lensError.message}`;
            if (errorMsg.includes('group not found')) {
              errorMsg += ' (Please check if the Lens Group ID is correct and accessible with this API Token in the Snap Developer Portal)';
            }
            notifyStatus(false, errorMsg);
            return;
          }
        }

        notifyStatus(false, null);
      } catch (err: any) {
        console.error('CameraKit Error:', err);
        let errorMsg = err.message || 'Failed to initialize Camera Kit';
        if (err.cause && err.cause.message) {
          errorMsg += ` - ${err.cause.message}`;
        }
        if (errorMsg.includes('bootstrapping')) {
          errorMsg += ' (Please verify that your VITE_SNAP_CAMERA_KIT_API_TOKEN is valid and active in the Snap Developer Portal.)';
        }
        notifyStatus(false, errorMsg);
      }
    };

    startCameraKit();

    return () => {
      active = false;
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (cameraSession) {
        cameraSession.pause();
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [config, isActive]);

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-neutral-900 rounded-2xl border border-neutral-800 text-neutral-500">
        <div className="bg-neutral-800/50 p-4 rounded-full mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium">Camera is inactive</p>
        <p className="text-xs mt-1 opacity-70">Turn on the camera to start AR Try-on</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group ">
      {/* Canvas Container */}
      <div className="absolute inset-0">
        <div ref={containerRef} className="w-full h-full" />
      </div>
      
      {/* Loading Overlay */}
      {localLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white z-10 transition-opacity">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
          <p className="font-medium animate-pulse">Initializing AR Lens...</p>
        </div>
      )}

      {/* Error Overlay */}
      {localError && !localLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-red-400 z-10 p-6 text-center">
          <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
          <p className="font-semibold text-lg mb-2">Camera Error</p>
          <p className="text-sm opacity-90 max-w-md">{localError}</p>
        </div>
      )}
    </div>
  );
};
