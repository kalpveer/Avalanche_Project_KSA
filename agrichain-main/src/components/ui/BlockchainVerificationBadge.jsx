import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const BlockchainVerificationBadge = ({ 
  transactionHash, 
  status = 'verified', 
  size = 'default',
  showDetails = false,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  useEffect(() => {
    if (transactionHash && showDetails) {
      setIsLoading(true);
      // Simulate blockchain verification check
      setTimeout(() => {
        setVerificationData({
          blockNumber: '0x1a2b3c',
          timestamp: new Date()?.toISOString(),
          confirmations: 12
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [transactionHash, showDetails]);

  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: 'Shield',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'Verified',
          description: 'Blockchain verified'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'Pending',
          description: 'Verification in progress'
        };
      case 'failed':
        return {
          icon: 'AlertTriangle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          label: 'Failed',
          description: 'Verification failed'
        };
      default:
        return {
          icon: 'Shield',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          label: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-2 py-1 text-xs',
          icon: 12,
          gap: 'space-x-1'
        };
      case 'lg':
        return {
          container: 'px-4 py-2 text-base',
          icon: 20,
          gap: 'space-x-3'
        };
      default:
        return {
          container: 'px-3 py-1.5 text-sm',
          icon: 16,
          gap: 'space-x-2'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const sizeConfig = getSizeConfig();

  if (isLoading) {
    return (
      <div className={`inline-flex items-center ${sizeConfig?.gap} ${sizeConfig?.container} ${statusConfig?.bgColor} ${statusConfig?.borderColor} border rounded-full ${className}`}>
        <Icon name="Loader2" size={sizeConfig?.icon} className="animate-spin text-muted-foreground" />
        <span className="font-caption font-medium text-muted-foreground">Verifying...</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${sizeConfig?.gap} ${sizeConfig?.container} ${statusConfig?.bgColor} ${statusConfig?.borderColor} border rounded-full transition-all duration-200 hover:shadow-sm ${className}`}>
      <Icon 
        name={statusConfig?.icon} 
        size={sizeConfig?.icon} 
        className={`${statusConfig?.color} ${status === 'pending' ? 'animate-pulse' : ''}`} 
      />
      <span className={`font-caption font-medium ${statusConfig?.color}`}>
        {statusConfig?.label}
      </span>
      {showDetails && verificationData && (
        <div className="ml-2 pl-2 border-l border-current/20">
          <span className="text-xs text-muted-foreground font-mono">
            {verificationData?.confirmations} confirmations
          </span>
        </div>
      )}
    </div>
  );
};

export default BlockchainVerificationBadge;