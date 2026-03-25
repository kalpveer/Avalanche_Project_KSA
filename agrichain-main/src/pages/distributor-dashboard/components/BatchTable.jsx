import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const BatchTable = ({ batches, onPurchase, onViewDetails, selectedBatches, onBatchSelect }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBatches = React.useMemo(() => {
    if (!sortConfig?.key) return batches;
    
    return [...batches]?.sort((a, b) => {
      if (sortConfig?.key === 'farmerPrice' || sortConfig?.key === 'quantity') {
        const aVal = parseFloat(a?.[sortConfig?.key]);
        const bVal = parseFloat(b?.[sortConfig?.key]);
        return sortConfig?.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aVal = a?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      const bVal = b?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      
      if (sortConfig?.direction === 'asc') {
        return aVal?.localeCompare(bVal);
      }
      return bVal?.localeCompare(aVal);
    });
  }, [batches, sortConfig]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'purchased':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-secondary" 
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      onBatchSelect(batches?.filter(b => b?.status === 'available')?.map(b => b?.id));
                    } else {
                      onBatchSelect([]);
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('batchId')}
                  className="flex items-center space-x-2 hover:text-secondary transition-colors"
                >
                  <span>Batch ID</span>
                  <SortIcon column="batchId" />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('produceType')}
                  className="flex items-center space-x-2 hover:text-secondary transition-colors"
                >
                  <span>Produce</span>
                  <SortIcon column="produceType" />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('farmName')}
                  className="flex items-center space-x-2 hover:text-secondary transition-colors"
                >
                  <span>Farm Origin</span>
                  <SortIcon column="farmName" />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center space-x-2 hover:text-secondary transition-colors"
                >
                  <span>Quantity</span>
                  <SortIcon column="quantity" />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">
                <button
                  onClick={() => handleSort('farmerPrice')}
                  className="flex items-center space-x-2 hover:text-secondary transition-colors"
                >
                  <span>Farmer Price</span>
                  <SortIcon column="farmerPrice" />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Status</th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBatches?.map((batch) => (
              <tr key={batch?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedBatches?.includes(batch?.id)}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        onBatchSelect([...selectedBatches, batch?.id]);
                      } else {
                        onBatchSelect(selectedBatches?.filter(id => id !== batch?.id));
                      }
                    }}
                    disabled={batch?.status !== 'available'}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {batch?.batchId}
                    </span>
                    <BlockchainVerificationBadge 
                      status="verified" 
                      size="sm"
                      transactionHash={batch?.blockchainHash}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Apple" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-body font-medium text-foreground">{batch?.produceType}</div>
                      <div className="text-sm text-muted-foreground">{batch?.variety}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-body font-medium text-foreground">{batch?.farmName}</div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{batch?.location}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-body font-medium text-foreground">
                    {batch?.quantity} {batch?.unit}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-body font-semibold text-foreground">
                    ${batch?.farmerPrice?.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per {batch?.unit}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(batch?.status)}`}>
                    {batch?.status?.charAt(0)?.toUpperCase() + batch?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(batch)}
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                    >
                      View
                    </Button>
                    {batch?.status === 'available' && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onPurchase(batch)}
                        iconName="ShoppingCart"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Purchase
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedBatches?.map((batch) => (
          <div key={batch?.id} className="bg-background border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-border mt-1"
                  checked={selectedBatches?.includes(batch?.id)}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      onBatchSelect([...selectedBatches, batch?.id]);
                    } else {
                      onBatchSelect(selectedBatches?.filter(id => id !== batch?.id));
                    }
                  }}
                  disabled={batch?.status !== 'available'}
                />
                <div>
                  <div className="font-mono text-sm font-medium text-foreground">
                    {batch?.batchId}
                  </div>
                  <BlockchainVerificationBadge 
                    status="verified" 
                    size="sm"
                    transactionHash={batch?.blockchainHash}
                  />
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(batch?.status)}`}>
                {batch?.status?.charAt(0)?.toUpperCase() + batch?.status?.slice(1)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Apple" size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-body font-medium text-foreground">{batch?.produceType}</div>
                <div className="text-sm text-muted-foreground">{batch?.variety}</div>
                <div className="text-sm text-muted-foreground flex items-center space-x-1 mt-1">
                  <Icon name="MapPin" size={12} />
                  <span>{batch?.farmName}, {batch?.location}</span>
                </div>
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
                <div className="text-muted-foreground">Farmer Price</div>
                <div className="font-body font-semibold text-foreground">
                  ${batch?.farmerPrice?.toFixed(2)} per {batch?.unit}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails(batch)}
                iconName="Eye"
                iconPosition="left"
                iconSize={14}
                fullWidth
              >
                View Details
              </Button>
              {batch?.status === 'available' && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onPurchase(batch)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  iconSize={14}
                  fullWidth
                >
                  Purchase
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {sortedBatches?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Package" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">No Batches Found</h3>
          <p className="text-muted-foreground font-body">
            No batches match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BatchTable;