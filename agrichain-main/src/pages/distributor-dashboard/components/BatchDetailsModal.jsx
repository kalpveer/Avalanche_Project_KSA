import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const BatchDetailsModal = ({ isOpen, onClose, batch, onPurchase }) => {
  if (!isOpen || !batch) return null;

  const timelineEvents = [
    {
      id: 1,
      title: 'Batch Created',
      description: 'Initial batch registration on blockchain',
      timestamp: '2025-01-05 08:30 AM',
      status: 'completed',
      icon: 'Plus'
    },
    {
      id: 2,
      title: 'Quality Inspection',
      description: 'Passed all quality control checks',
      timestamp: '2025-01-05 10:15 AM',
      status: 'completed',
      icon: 'CheckCircle'
    },
    {
      id: 3,
      title: 'Harvest Completed',
      description: 'Produce harvested and packaged',
      timestamp: '2025-01-05 02:45 PM',
      status: 'completed',
      icon: 'Package'
    },
    {
      id: 4,
      title: 'Ready for Distribution',
      description: 'Available for distributor purchase',
      timestamp: '2025-01-06 09:00 AM',
      status: 'current',
      icon: 'Truck'
    }
  ];

  const certifications = [
    { name: 'Organic Certified', verified: true, icon: 'Leaf' },
    { name: 'Fair Trade', verified: true, icon: 'Heart' },
    { name: 'Non-GMO', verified: true, icon: 'Shield' },
    { name: 'Pesticide Free', verified: false, icon: 'X' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Batch Details
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Complete information for batch {batch?.batchId}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-heading font-medium text-foreground mb-4">Produce Information</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Apple" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-foreground">{batch?.produceType}</h4>
                    <p className="text-muted-foreground font-body">{batch?.variety}</p>
                    <BlockchainVerificationBadge 
                      status="verified" 
                      transactionHash={batch?.blockchainHash}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Quantity</div>
                    <div className="font-body font-medium text-foreground">
                      {batch?.quantity} {batch?.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Price per {batch?.unit}</div>
                    <div className="font-body font-semibold text-foreground">
                      ${batch?.farmerPrice?.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Value</div>
                    <div className="font-body font-semibold text-success">
                      ${(batch?.quantity * batch?.farmerPrice)?.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Harvest Date</div>
                    <div className="font-body font-medium text-foreground">
                      Jan 5, 2025
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-heading font-medium text-foreground mb-4">Farm Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Home" size={16} className="text-muted-foreground" />
                    <span className="font-body font-medium text-foreground">{batch?.farmName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="font-body text-foreground">{batch?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span className="font-body text-foreground">John Martinez</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="font-body text-foreground">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Map */}
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-heading font-medium text-foreground mb-4">Farm Location</h3>
                <div className="h-48 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Farm Location"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=36.7783,-119.4179&z=14&output=embed"
                    className="border-0"
                  />
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-heading font-medium text-foreground mb-4">Certifications</h3>
                <div className="space-y-3">
                  {certifications?.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          cert?.verified ? 'bg-success/10' : 'bg-error/10'
                        }`}>
                          <Icon 
                            name={cert?.verified ? cert?.icon : 'X'} 
                            size={16} 
                            className={cert?.verified ? 'text-success' : 'text-error'} 
                          />
                        </div>
                        <span className="font-body text-foreground">{cert?.name}</span>
                      </div>
                      <span className={`text-xs font-caption px-2 py-1 rounded-full ${
                        cert?.verified 
                          ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                      }`}>
                        {cert?.verified ? 'Verified' : 'Not Certified'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h3 className="font-heading font-medium text-foreground mb-4">Batch Timeline</h3>
            <div className="space-y-4">
              {timelineEvents?.map((event, index) => (
                <div key={event?.id} className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    event?.status === 'completed' ? 'bg-success/10' :
                    event?.status === 'current' ? 'bg-secondary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={event?.icon} 
                      size={20} 
                      className={
                        event?.status === 'completed' ? 'text-success' :
                        event?.status === 'current' ? 'text-secondary' : 'text-muted-foreground'
                      } 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-body font-medium text-foreground">{event?.title}</h4>
                      <span className="text-xs text-muted-foreground font-caption">
                        {event?.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      {event?.description}
                    </p>
                  </div>
                  {index < timelineEvents?.length - 1 && (
                    <div className="absolute left-5 mt-10 w-px h-8 bg-border"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Information */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h3 className="font-heading font-medium text-foreground mb-4">Blockchain Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Transaction Hash</div>
                <div className="font-mono text-foreground break-all">
                  {batch?.blockchainHash}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Block Number</div>
                <div className="font-mono text-foreground">0x1a2b3c</div>
              </div>
              <div>
                <div className="text-muted-foreground">Confirmations</div>
                <div className="font-body font-medium text-success">24 confirmations</div>
              </div>
              <div>
                <div className="text-muted-foreground">Gas Used</div>
                <div className="font-mono text-foreground">21,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          {batch?.status === 'available' && (
            <Button
              variant="default"
              onClick={() => {
                onPurchase(batch);
                onClose();
              }}
              iconName="ShoppingCart"
              iconPosition="left"
              iconSize={16}
            >
              Purchase Batch
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchDetailsModal;