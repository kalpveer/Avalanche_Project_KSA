import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const PurchaseModal = ({ isOpen, onClose, batch, onConfirm, isBulk = false, selectedBatches = [] }) => {
  const [formData, setFormData] = useState({
    resalePrice: '',
    distributionLocation: '',
    expectedDelivery: '',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateProfitMargin = () => {
    if (!formData?.resalePrice || !batch) return 0;
    const profit = parseFloat(formData?.resalePrice) - batch?.farmerPrice;
    const margin = (profit / batch?.farmerPrice) * 100;
    return margin?.toFixed(1);
  };

  const calculateTotalCost = () => {
    if (isBulk) {
      return selectedBatches?.reduce((total, batchId) => {
        const batchData = selectedBatches?.find(b => b?.id === batchId);
        return total + (batchData ? batchData?.farmerPrice * batchData?.quantity : 0);
      }, 0);
    }
    return batch ? batch?.farmerPrice * batch?.quantity : 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const purchaseData = {
        ...formData,
        batchId: batch?.id,
        selectedBatches: isBulk ? selectedBatches : [batch?.id],
        totalCost: calculateTotalCost(),
        profitMargin: calculateProfitMargin(),
        timestamp: new Date()?.toISOString(),
        blockchainHash: `0x${Math.random()?.toString(16)?.substr(2, 40)}`
      };

      onConfirm(purchaseData);
      onClose();
      
      // Reset form
      setFormData({
        resalePrice: '',
        distributionLocation: '',
        expectedDelivery: '',
        notes: ''
      });
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {isBulk ? 'Bulk Purchase Confirmation' : 'Purchase Confirmation'}
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {isBulk 
                ? `Purchasing ${selectedBatches?.length} batches`
                : `Batch ID: ${batch?.batchId}`
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isProcessing}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Batch Information */}
          {!isBulk && batch && (
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-heading font-medium text-foreground mb-3">Batch Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Apple" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-body font-medium text-foreground">{batch?.produceType}</div>
                    <div className="text-sm text-muted-foreground">{batch?.variety}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Farm Origin</div>
                  <div className="font-body font-medium text-foreground">{batch?.farmName}</div>
                  <div className="text-sm text-muted-foreground flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{batch?.location}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Quantity</div>
                  <div className="font-body font-medium text-foreground">
                    {batch?.quantity} {batch?.unit}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Farmer Price</div>
                  <div className="font-body font-semibold text-foreground">
                    ${batch?.farmerPrice?.toFixed(2)} per {batch?.unit}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <BlockchainVerificationBadge 
                  status="verified" 
                  transactionHash={batch?.blockchainHash}
                  showDetails
                />
              </div>
            </div>
          )}

          {/* Bulk Purchase Summary */}
          {isBulk && (
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-heading font-medium text-foreground mb-3">
                Bulk Purchase Summary ({selectedBatches?.length} batches)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-card rounded-lg">
                  <div className="text-lg font-heading font-semibold text-foreground">
                    {selectedBatches?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Batches</div>
                </div>
                <div className="text-center p-3 bg-card rounded-lg">
                  <div className="text-lg font-heading font-semibold text-foreground">
                    ${calculateTotalCost()?.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                </div>
                <div className="text-center p-3 bg-card rounded-lg">
                  <div className="text-lg font-heading font-semibold text-foreground">
                    Mixed
                  </div>
                  <div className="text-sm text-muted-foreground">Produce Types</div>
                </div>
              </div>
            </div>
          )}

          {/* Purchase Details Form */}
          <div className="space-y-4">
            <h3 className="font-heading font-medium text-foreground">Purchase Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Resale Price (per unit)"
                type="number"
                step="0.01"
                placeholder="Enter resale price"
                value={formData?.resalePrice}
                onChange={(e) => handleInputChange('resalePrice', e?.target?.value)}
                required
                description={!isBulk && formData?.resalePrice ? `Profit margin: ${calculateProfitMargin()}%` : ''}
              />

              <Input
                label="Distribution Location"
                type="text"
                placeholder="Enter distribution center"
                value={formData?.distributionLocation}
                onChange={(e) => handleInputChange('distributionLocation', e?.target?.value)}
                required
              />
            </div>

            <Input
              label="Expected Delivery Date"
              type="date"
              value={formData?.expectedDelivery}
              onChange={(e) => handleInputChange('expectedDelivery', e?.target?.value)}
              required
              description="When do you expect to receive this batch?"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Notes
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                rows={3}
                placeholder="Any special handling instructions or notes..."
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
              />
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h3 className="font-heading font-medium text-foreground mb-3">Cost Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {isBulk ? 'Total Purchase Cost:' : 'Batch Cost:'}
                </span>
                <span className="font-body font-medium text-foreground">
                  ${calculateTotalCost()?.toFixed(2)}
                </span>
              </div>
              {!isBulk && formData?.resalePrice && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Revenue:</span>
                    <span className="font-body font-medium text-foreground">
                      ${(parseFloat(formData?.resalePrice) * batch?.quantity || 0)?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Profit:</span>
                    <span className="font-body font-semibold text-success">
                      ${((parseFloat(formData?.resalePrice) - (batch?.farmerPrice || 0)) * (batch?.quantity || 0))?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Profit Margin:</span>
                    <span className="font-body font-semibold text-secondary">
                      {calculateProfitMargin()}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isProcessing}
              iconName="ShoppingCart"
              iconPosition="left"
              iconSize={16}
            >
              {isProcessing ? 'Processing...' : 'Confirm Purchase'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;