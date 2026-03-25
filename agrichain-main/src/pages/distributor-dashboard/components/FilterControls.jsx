import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  selectedBatches, 
  onBulkPurchase,
  isFilterPanelOpen,
  onToggleFilterPanel 
}) => {
  const produceTypes = [
    'All Types',
    'Tomatoes',
    'Potatoes',
    'Onions',
    'Carrots',
    'Lettuce',
    'Spinach',
    'Apples',
    'Oranges',
    'Bananas'
  ];

  const locations = [
    'All Locations',
    'California',
    'Texas',
    'Florida',
    'New York',
    'Washington',
    'Oregon',
    'Georgia',
    'North Carolina'
  ];

  const statusOptions = [
    'All Status',
    'Available',
    'Pending',
    'Purchased'
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value === 'All Types' || value === 'All Locations' || value === 'All Status' ? '' : value?.toLowerCase()
    });
  };

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden lg:flex items-center justify-between bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <span className="font-heading font-medium text-foreground">Filters:</span>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={filters?.produceType ? filters?.produceType?.charAt(0)?.toUpperCase() + filters?.produceType?.slice(1) : 'All Types'}
              onChange={(e) => handleFilterChange('produceType', e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              {produceTypes?.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filters?.location ? filters?.location?.charAt(0)?.toUpperCase() + filters?.location?.slice(1) : 'All Locations'}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              {locations?.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={filters?.status ? filters?.status?.charAt(0)?.toUpperCase() + filters?.status?.slice(1) : 'All Status'}
              onChange={(e) => handleFilterChange('status', e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              {statusOptions?.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <div className="w-px h-6 bg-border"></div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search batches..."
                value={filters?.search || ''}
                onChange={(e) => handleFilterChange('search', e?.target?.value)}
                className="pl-10 w-64"
              />
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {selectedBatches?.length > 0 && (
            <Button
              variant="default"
              onClick={onBulkPurchase}
              iconName="ShoppingCart"
              iconPosition="left"
              iconSize={16}
            >
              Purchase Selected ({selectedBatches?.length})
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={onToggleFilterPanel}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
        >
          Filters
        </Button>

        {selectedBatches?.length > 0 && (
          <Button
            variant="default"
            onClick={onBulkPurchase}
            iconName="ShoppingCart"
            iconPosition="left"
            iconSize={16}
          >
            Purchase ({selectedBatches?.length})
          </Button>
        )}
      </div>
      {/* Mobile Filter Panel */}
      {isFilterPanelOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border shadow-modal overflow-y-auto">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">Filter Batches</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFilterPanel}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Produce Type
                </label>
                <select
                  value={filters?.produceType ? filters?.produceType?.charAt(0)?.toUpperCase() + filters?.produceType?.slice(1) : 'All Types'}
                  onChange={(e) => handleFilterChange('produceType', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  {produceTypes?.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <select
                  value={filters?.location ? filters?.location?.charAt(0)?.toUpperCase() + filters?.location?.slice(1) : 'All Locations'}
                  onChange={(e) => handleFilterChange('location', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  {locations?.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={filters?.status ? filters?.status?.charAt(0)?.toUpperCase() + filters?.status?.slice(1) : 'All Status'}
                  onChange={(e) => handleFilterChange('status', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  {statusOptions?.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search
                </label>
                <Input
                  type="text"
                  placeholder="Search batches..."
                  value={filters?.search || ''}
                  onChange={(e) => handleFilterChange('search', e?.target?.value)}
                />
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  iconName="X"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Clear All Filters
                </Button>
                <Button
                  variant="default"
                  onClick={onToggleFilterPanel}
                  fullWidth
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterControls;