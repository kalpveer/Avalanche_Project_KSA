import React from 'react';
import Icon from '../../../components/AppIcon';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const TrustIndicators = ({ batchData }) => {
  const trustMetrics = [
    {
      id: 'blockchain',
      title: 'Blockchain Verified',
      description: 'All transactions recorded on immutable blockchain',
      score: 100,
      status: 'verified',
      icon: 'Shield',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'traceability',
      title: 'Full Traceability',
      description: 'Complete supply chain visibility from farm to store',
      score: 98,
      status: 'verified',
      icon: 'Route',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'quality',
      title: 'Quality Assured',
      description: 'Laboratory tested and quality certified',
      score: 95,
      status: 'verified',
      icon: 'Award',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'authenticity',
      title: 'Authenticity Confirmed',
      description: 'Product origin and handling verified',
      score: 97,
      status: 'verified',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const securityFeatures = [
    {
      title: 'Tamper-Proof QR Code',
      description: 'Unique QR code with blockchain hash verification',
      icon: 'QrCode',
      verified: true
    },
    {
      title: 'Digital Signatures',
      description: 'Cryptographically signed by all supply chain participants',
      icon: 'FileSignature',
      verified: true
    },
    {
      title: 'Timestamp Verification',
      description: 'All transactions timestamped and immutable',
      icon: 'Clock',
      verified: true
    },
    {
      title: 'Multi-Party Consensus',
      description: 'Verified by multiple independent parties',
      icon: 'Users',
      verified: true
    }
  ];

  const overallTrustScore = Math.round(
    trustMetrics?.reduce((sum, metric) => sum + metric?.score, 0) / trustMetrics?.length
  );

  const getTrustScoreColor = (score) => {
    if (score >= 95) return 'text-success';
    if (score >= 85) return 'text-warning';
    return 'text-error';
  };

  const getTrustScoreBg = (score) => {
    if (score >= 95) return 'bg-success';
    if (score >= 85) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="ShieldCheck" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Trust & Security
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Comprehensive verification and security indicators
            </p>
          </div>
        </div>
        
        <BlockchainVerificationBadge 
          status="verified" 
          transactionHash={batchData?.blockchainHash}
          size="lg"
        />
      </div>
      {/* Overall Trust Score */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-success/5 to-success/10 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className={`w-16 h-16 ${getTrustScoreBg(overallTrustScore)} rounded-full flex items-center justify-center`}>
              <span className="text-2xl font-heading font-bold text-white">
                {overallTrustScore}
              </span>
            </div>
            <div className="text-left">
              <h3 className={`text-2xl font-heading font-bold ${getTrustScoreColor(overallTrustScore)}`}>
                Trust Score
              </h3>
              <p className="text-muted-foreground font-body">
                Excellent verification status
              </p>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getTrustScoreBg(overallTrustScore)} transition-all duration-500`}
              style={{ width: `${overallTrustScore}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Trust Metrics Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {trustMetrics?.map((metric) => (
          <div key={metric?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${metric?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-body font-medium text-foreground">
                    {metric?.title}
                  </h4>
                  <span className={`text-lg font-heading font-bold ${metric?.color}`}>
                    {metric?.score}%
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground font-body mb-2">
                  {metric?.description}
                </p>
                
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getTrustScoreBg(metric?.score)} transition-all duration-500`}
                    style={{ width: `${metric?.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-foreground">Security Features</h3>
        
        <div className="grid gap-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-body font-medium text-foreground">
                    {feature?.title}
                  </h4>
                  {feature?.verified && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-body">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Verification Timeline */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="font-heading font-semibold text-foreground mb-4">Verification Timeline</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground font-body">
              {new Date()?.toLocaleDateString()} - Product scanned and verified
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground font-body">
              {batchData?.retailer?.receivedDate} - Retail verification completed
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground font-body">
              {batchData?.distributor?.purchaseDate} - Distribution verification completed
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground font-body">
              {batchData?.farm?.harvestDate} - Farm origin verified
            </span>
          </div>
        </div>
      </div>
      {/* Trust Badges */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-body">
            <Icon name="Shield" size={12} />
            <span>Blockchain Secured</span>
          </div>
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-body">
            <Icon name="Eye" size={12} />
            <span>Fully Transparent</span>
          </div>
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-body">
            <Icon name="Award" size={12} />
            <span>Quality Verified</span>
          </div>
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-body">
            <Icon name="Lock" size={12} />
            <span>Tamper Proof</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;