import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QRScanner = ({ onScanResult, isScanning, setIsScanning }) => {
  const [manualEntry, setManualEntry] = useState(false);
  const [batchId, setBatchId] = useState('');
  const [cameraError, setCameraError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const scanForQR = () => {
    if (!videoRef?.current || !canvasRef?.current) return;

    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    const context = canvas?.getContext('2d');

    if (video?.readyState === video?.HAVE_ENOUGH_DATA) {
      canvas.width = video?.videoWidth;
      canvas.height = video?.videoHeight;
      context?.drawImage(video, 0, 0, canvas?.width, canvas?.height);

      // Simulate QR detection (in real app, use a QR library like jsQR)
      // For demo purposes, we'll simulate finding a QR code after 3 seconds
      setTimeout(() => {
        if (isScanning) {
          const mockBatchId = 'FT2024090915103' + Math.floor(Math.random() * 1000);
          onScanResult(mockBatchId);
          setIsScanning(false);
        }
      }, 3000);
    }
  };

  useEffect(() => {
    if (isScanning && !manualEntry) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isScanning, manualEntry]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setCameraError(null);
        
        // Start scanning for QR codes
        scanIntervalRef.current = setInterval(scanForQR, 500);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setHasPermission(false);
      setCameraError('Camera access denied. Please enable camera permissions or use manual entry.');
    }
  };

  const stopCamera = () => {
    if (videoRef?.current && videoRef?.current?.srcObject) {
      const tracks = videoRef?.current?.srcObject?.getTracks();
      tracks?.forEach(track => track?.stop());
      videoRef.current.srcObject = null;
    }
    
    if (scanIntervalRef?.current) {
      clearInterval(scanIntervalRef?.current);
      scanIntervalRef.current = null;
    }
  };

  const handleManualSubmit = (e) => {
    e?.preventDefault();
    if (batchId?.trim()) {
      onScanResult(batchId?.trim());
      setBatchId('');
      setManualEntry(false);
    }
  };

  const toggleScanMode = () => {
    setManualEntry(!manualEntry);
    setIsScanning(false);
    setBatchId('');
    setCameraError(null);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="QrCode" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Product Verification
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Scan QR code or enter batch ID manually
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleScanMode}
          iconName={manualEntry ? "Camera" : "Keyboard"}
          iconPosition="left"
          iconSize={16}
        >
          {manualEntry ? 'Use Camera' : 'Manual Entry'}
        </Button>
      </div>
      {!manualEntry ? (
        <div className="space-y-4">
          {/* Camera Scanner */}
          <div className="relative bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {isScanning ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 border-2 border-success rounded-lg relative">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-success rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-success rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-success rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-success rounded-br-lg"></div>
                      
                      {/* Scanning Line Animation */}
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-success animate-pulse"></div>
                    </div>
                    <p className="text-center text-white text-sm font-body mt-4 bg-black/50 px-3 py-1 rounded-full">
                      Position QR code within the frame
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {cameraError ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="CameraOff" size={24} className="text-error" />
                    </div>
                    <div>
                      <p className="text-error font-body text-sm mb-2">Camera Access Required</p>
                      <p className="text-muted-foreground text-xs font-body max-w-xs">
                        {cameraError}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="QrCode" size={24} className="text-success" />
                    </div>
                    <div>
                      <p className="text-foreground font-body font-medium">Ready to Scan</p>
                      <p className="text-muted-foreground text-sm font-body">
                        Click start to begin scanning
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Scanner Controls */}
          <div className="flex justify-center space-x-3">
            {!isScanning ? (
              <Button
                onClick={() => setIsScanning(true)}
                iconName="Play"
                iconPosition="left"
                iconSize={16}
                disabled={hasPermission === false}
              >
                Start Scanning
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsScanning(false)}
                iconName="Square"
                iconPosition="left"
                iconSize={16}
              >
                Stop Scanning
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <Input
            label="Batch ID"
            type="text"
            placeholder="Enter batch ID (e.g., FT2024090915103456)"
            value={batchId}
            onChange={(e) => setBatchId(e?.target?.value)}
            description="Find the batch ID on your product packaging"
            required
          />
          
          <div className="flex space-x-3">
            <Button
              type="submit"
              disabled={!batchId?.trim()}
              iconName="Search"
              iconPosition="left"
              iconSize={16}
            >
              Verify Product
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setBatchId('')}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear
            </Button>
          </div>
        </form>
      )}
      {/* Quick Access Batch IDs for Demo */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground font-body mb-2">Demo Batch IDs:</p>
        <div className="flex flex-wrap gap-2">
          {['FT2024090915103456', 'FT2024090915103789', 'FT2024090915103012']?.map((id) => (
            <button
              key={id}
              onClick={() => onScanResult(id)}
              className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-2 py-1 rounded font-mono transition-colors"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;