import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const BatchManagementTable = ({ batches, onViewDetails, onUpdateStatus, onViewBlockchain }) => {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'harvested':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'in transit':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'delivered':
        return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'processing':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectBatch = (batchId) => {
    setSelectedBatches(prev => 
      prev?.includes(batchId) 
        ? prev?.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBatches?.length === batches?.length) {
      setSelectedBatches([]);
    } else {
      setSelectedBatches(batches?.map(batch => batch?.id));
    }
  };

  const sortedBatches = React.useMemo(() => {
    if (!sortConfig?.key) return batches;
    
    return [...batches]?.sort((a, b) => {
      if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [batches, sortConfig]);

  return (
    <div className="bg-white border border-slate-100 rounded-lg overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="px-5 py-4 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Batch Management</h3>
          <div className="flex items-center space-x-3">
            {selectedBatches?.length > 0 && (
              <span className="text-xs text-slate-400">
                {selectedBatches?.length} selected
              </span>
            )}
            <Button variant="outline" size="xs" iconName="Plus" iconPosition="left">
              New Batch
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedBatches?.length === batches?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'batchId', label: 'Batch ID' },
                { key: 'produceType', label: 'Produce' },
                { key: 'quantity', label: 'Quantity' },
                { key: 'status', label: 'Status' },
                { key: 'location', label: 'Current Location' },
                { key: 'harvestDate', label: 'Harvest Date' }
              ]?.map(({ key, label }) => (
                <th
                  key={key}
                  className="p-4 text-left text-sm font-caption font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    <Icon 
                      name={sortConfig?.key === key ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={14} 
                    />
                  </div>
                </th>
              ))}
              <th className="p-4 text-left text-sm font-caption font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBatches?.map((batch) => (
              <tr key={batch?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedBatches?.includes(batch?.id)}
                    onChange={() => handleSelectBatch(batch?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[13px] font-medium text-slate-700">{batch?.batchId}</span>
                    <BlockchainVerificationBadge 
                      status="verified" 
                      size="sm"
                      transactionHash={batch?.blockchainHash}
                    />
                  </div>
                </td>
                <td className="p-3 text-[13px] text-slate-600">
                  {batch?.produceType}
                </td>
                <td className="p-4">
                  <span className="font-body text-sm text-foreground">{batch?.quantity}</span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-caption font-medium border ${getStatusColor(batch?.status)}`}>
                    {batch?.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-body text-sm text-muted-foreground">{batch?.location}</span>
                </td>
                <td className="p-4">
                  <span className="font-body text-sm text-muted-foreground">{batch?.harvestDate}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(batch)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onUpdateStatus(batch)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewBlockchain(batch)}
                      className="h-8 w-8"
                    >
                      <Icon name="Link" size={16} />
                    </Button>
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
          <div key={batch?.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBatches?.includes(batch?.id)}
                  onChange={() => handleSelectBatch(batch?.id)}
                  className="rounded border-border"
                />
                <div>
                  <p className="font-mono text-sm font-medium text-foreground">{batch?.batchId}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name="Apple" size={14} className="text-primary" />
                    <span className="font-body text-sm text-muted-foreground">{batch?.produceType}</span>
                  </div>
                </div>
              </div>
              <BlockchainVerificationBadge status="verified" size="sm" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground font-caption">Quantity</p>
                <p className="font-body text-foreground">{batch?.quantity}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-caption">Status</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-caption font-medium border ${getStatusColor(batch?.status)}`}>
                  {batch?.status}
                </span>
              </div>
              <div>
                <p className="text-muted-foreground font-caption">Location</p>
                <p className="font-body text-foreground">{batch?.location}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-caption">Harvest Date</p>
                <p className="font-body text-foreground">{batch?.harvestDate}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(batch)}
                iconName="Eye"
                iconPosition="left"
              >
                Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdateStatus(batch)}
                iconName="Edit"
                iconPosition="left"
              >
                Update
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchManagementTable;