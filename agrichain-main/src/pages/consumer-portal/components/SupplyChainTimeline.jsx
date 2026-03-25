import React from 'react';
import Icon from '../../../components/AppIcon';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const SupplyChainTimeline = ({ batchData }) => {
  const timelineSteps = [
    {
      id: 'farm',
      title: 'Farm Origin',
      subtitle: batchData?.farm?.name,
      location: batchData?.farm?.location,
      date: batchData?.farm?.harvestDate,
      price: batchData?.farm?.price,
      status: 'completed',
      icon: 'Sprout',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      details: [
        `Harvested: ${batchData?.farm?.harvestDate}`,
        `Variety: ${batchData?.farm?.variety}`,
        `Organic: ${batchData?.farm?.organic ? 'Yes' : 'No'}`,
        `Quantity: ${batchData?.farm?.quantity}`
      ]
    },
    {
      id: 'distributor',
      title: 'Distribution',
      subtitle: batchData?.distributor?.name,
      location: batchData?.distributor?.location,
      date: batchData?.distributor?.purchaseDate,
      price: batchData?.distributor?.price,
      status: 'completed',
      icon: 'Truck',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      details: [
        `Purchased: ${batchData?.distributor?.purchaseDate}`,
        `Quality Grade: ${batchData?.distributor?.qualityGrade}`,
        `Storage: ${batchData?.distributor?.storageConditions}`,
        `Transport: ${batchData?.distributor?.transportMethod}`
      ]
    },
    {
      id: 'retailer',
      title: 'Retail Store',
      subtitle: batchData?.retailer?.name,
      location: batchData?.retailer?.location,
      date: batchData?.retailer?.receivedDate,
      price: batchData?.retailer?.price,
      status: 'completed',
      icon: 'Store',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      details: [
        `Received: ${batchData?.retailer?.receivedDate}`,
        `Display: ${batchData?.retailer?.displayLocation}`,
        `Expiry: ${batchData?.retailer?.expiryDate}`,
        `Stock: ${batchData?.retailer?.currentStock} units`
      ]
    },
    {
      id: 'consumer',
      title: 'Consumer',
      subtitle: 'Product Verified',
      location: 'Your Location',
      date: new Date()?.toLocaleDateString(),
      price: batchData?.retailer?.price,
      status: 'current',
      icon: 'User',
      color: 'text-success',
      bgColor: 'bg-success/10',
      details: [
        `Verified: ${new Date()?.toLocaleDateString()}`,
        `Authenticity: Confirmed`,
        `Journey: Complete`,
        `Trust Score: 98%`
      ]
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const calculateMarkup = (currentPrice, previousPrice) => {
    const markup = ((currentPrice - previousPrice) / previousPrice) * 100;
    return markup?.toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Route" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Supply Chain Journey
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Complete transparency from farm to table
            </p>
          </div>
        </div>
        
        <BlockchainVerificationBadge 
          status="verified" 
          transactionHash={batchData?.blockchainHash}
          showDetails={true}
        />
      </div>
      <div className="space-y-6">
        {timelineSteps?.map((step, index) => (
          <div key={step?.id} className="relative">
            {/* Timeline Line */}
            {index < timelineSteps?.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
            )}
            
            <div className="flex space-x-4">
              {/* Timeline Icon */}
              <div className={`flex-shrink-0 w-12 h-12 ${step?.bgColor} rounded-full flex items-center justify-center relative`}>
                <Icon name={step?.icon} size={20} className={step?.color} />
                {step?.status === 'current' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Timeline Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        {step?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body">
                        {step?.subtitle}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-body">
                          {step?.location}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-heading font-bold text-foreground">
                        {formatPrice(step?.price)}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-muted-foreground">
                          +{calculateMarkup(step?.price, timelineSteps?.[index - 1]?.price)}% markup
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {step?.details?.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                        <span className="text-muted-foreground font-body">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Blockchain Hash for each step */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-body">
                        Transaction Hash:
                      </span>
                      <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {batchData?.blockchainHash?.slice(0, 16)}...
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Price Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-heading font-semibold text-foreground mb-3">Price Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-body">Farm Price:</span>
              <span className="font-body">{formatPrice(batchData?.farm?.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-body">Distribution Markup:</span>
              <span className="font-body">
                +{formatPrice(batchData?.distributor?.price - batchData?.farm?.price)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-body">Retail Markup:</span>
              <span className="font-body">
                +{formatPrice(batchData?.retailer?.price - batchData?.distributor?.price)}
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-heading font-semibold">
              <span className="text-foreground">Final Price:</span>
              <span className="text-foreground">{formatPrice(batchData?.retailer?.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTimeline;