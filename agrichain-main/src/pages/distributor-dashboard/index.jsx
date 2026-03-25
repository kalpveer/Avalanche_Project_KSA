import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import StatisticsCards from './components/StatisticsCards';
import FilterControls from './components/FilterControls';
import BatchTable from './components/BatchTable';
import ProfitAnalytics from './components/ProfitAnalytics';
import PurchaseModal from './components/PurchaseModal';
import BatchDetailsModal from './components/BatchDetailsModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DistributorDashboard = () => {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [filters, setFilters] = useState({
    produceType: '',
    location: '',
    status: '',
    search: ''
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isBulkPurchase, setIsBulkPurchase] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Add handler for sidebar toggle
  const handleToggleSidebar = () => {
    // Handle sidebar toggle logic here
    console.log('Toggle sidebar');
  };

  // Mock data for batches
  const mockBatches = [
    {
      id: 1,
      batchId: 'AC-2025-001',
      produceType: 'Tomatoes',
      variety: 'Roma Tomatoes',
      farmName: 'Sunny Valley Farm',
      location: 'California',
      quantity: 500,
      unit: 'kg',
      farmerPrice: 3.50,
      status: 'available',
      blockchainHash: '0xa1b2c3d4e5f6789012345678901234567890abcd'
    },
    {
      id: 2,
      batchId: 'AC-2025-002',
      produceType: 'Potatoes',
      variety: 'Russet Potatoes',
      farmName: 'Green Hills Farm',
      location: 'Texas',
      quantity: 800,
      unit: 'kg',
      farmerPrice: 2.25,
      status: 'available',
      blockchainHash: '0xb2c3d4e5f6789012345678901234567890abcde1'
    },
    {
      id: 3,
      batchId: 'AC-2025-003',
      produceType: 'Onions',
      variety: 'Yellow Onions',
      farmName: 'Prairie Winds Farm',
      location: 'Florida',
      quantity: 300,
      unit: 'kg',
      farmerPrice: 1.80,
      status: 'pending',
      blockchainHash: '0xc3d4e5f6789012345678901234567890abcdef12'
    },
    {
      id: 4,
      batchId: 'AC-2025-004',
      produceType: 'Carrots',
      variety: 'Baby Carrots',
      farmName: 'Mountain View Farm',
      location: 'Washington',
      quantity: 400,
      unit: 'kg',
      farmerPrice: 2.75,
      status: 'available',
      blockchainHash: '0xd4e5f6789012345678901234567890abcdef123'
    },
    {
      id: 5,
      batchId: 'AC-2025-005',
      produceType: 'Lettuce',
      variety: 'Iceberg Lettuce',
      farmName: 'Fresh Fields Farm',
      location: 'Oregon',
      quantity: 200,
      unit: 'kg',
      farmerPrice: 4.20,
      status: 'purchased',
      blockchainHash: '0xe5f6789012345678901234567890abcdef1234'
    },
    {
      id: 6,
      batchId: 'AC-2025-006',
      produceType: 'Spinach',
      variety: 'Baby Spinach',
      farmName: 'Organic Gardens',
      location: 'California',
      quantity: 150,
      unit: 'kg',
      farmerPrice: 5.50,
      status: 'available',
      blockchainHash: '0xf6789012345678901234567890abcdef12345'
    }
  ];

  // Mock statistics data
  const mockStats = {
    pendingPurchases: 8,
    completedTransactions: 156,
    averageProfitMargin: 18.7,
    blockchainConfirmations: 1247
  };

  // Mock analytics data
  const mockAnalyticsData = {
    profitTrends: [],
    purchaseHistory: [],
    performanceMetrics: {}
  };

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('agricchain_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Filter batches based on current filters
  const filteredBatches = mockBatches?.filter(batch => {
    const matchesProduceType = !filters?.produceType || 
      batch?.produceType?.toLowerCase()?.includes(filters?.produceType?.toLowerCase());
    const matchesLocation = !filters?.location || 
      batch?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase());
    const matchesStatus = !filters?.status || 
      batch?.status?.toLowerCase() === filters?.status?.toLowerCase();
    const matchesSearch = !filters?.search || 
      batch?.batchId?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      batch?.produceType?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      batch?.farmName?.toLowerCase()?.includes(filters?.search?.toLowerCase());

    return matchesProduceType && matchesLocation && matchesStatus && matchesSearch;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      produceType: '',
      location: '',
      status: '',
      search: ''
    });
  };

  const handleBatchSelect = (batchIds) => {
    setSelectedBatches(batchIds);
  };

  const handlePurchase = (batch) => {
    setSelectedBatch(batch);
    setIsBulkPurchase(false);
    setIsPurchaseModalOpen(true);
  };

  const handleBulkPurchase = () => {
    setIsBulkPurchase(true);
    setIsPurchaseModalOpen(true);
  };

  const handleViewDetails = (batch) => {
    setSelectedBatch(batch);
    setIsDetailsModalOpen(true);
  };

  const handlePurchaseConfirm = (purchaseData) => {
    console.log('Purchase confirmed:', purchaseData);
    // Here you would typically send the data to your backend
    setSelectedBatches([]);
  };

  const handleToggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  return (
    <>
      <Helmet>
        <title>Distributor Dashboard - AgriChain</title>
        <meta name="description" content="Manage batch purchases, track profit margins, and analyze supply chain performance with professional distributor tools." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={handleToggleSidebar} />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    Distributor Dashboard
                  </h1>
                  <p className="text-muted-foreground font-body mt-2">
                    Manage batch purchases and track profit margins with professional workflow tools
                  </p>
                </div>
                <div className="hidden lg:flex items-center space-x-3">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Export Report
                  </Button>
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    New Purchase Order
                  </Button>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <StatisticsCards stats={mockStats} />

            {/* Filter Controls */}
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              selectedBatches={selectedBatches}
              onBulkPurchase={handleBulkPurchase}
              isFilterPanelOpen={isFilterPanelOpen}
              onToggleFilterPanel={handleToggleFilterPanel}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Batch Processing Table */}
              <div className="xl:col-span-2">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-heading font-semibold text-foreground">
                      Available Batches
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Package" size={16} />
                      <span>{filteredBatches?.length} batches found</span>
                    </div>
                  </div>
                  
                  <BatchTable
                    batches={filteredBatches}
                    onPurchase={handlePurchase}
                    onViewDetails={handleViewDetails}
                    selectedBatches={selectedBatches}
                    onBatchSelect={handleBatchSelect}
                  />
                </div>
              </div>

              {/* Profit Analytics Panel */}
              <div className="xl:col-span-1">
                <div className="mb-6">
                  <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                    Profit Analytics
                  </h2>
                  <ProfitAnalytics analyticsData={mockAnalyticsData} />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Recent Activity
                  </h2>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      action: 'Purchased batch AC-2025-001',
                      description: '500kg Roma Tomatoes from Sunny Valley Farm',
                      timestamp: '2 hours ago',
                      status: 'success',
                      icon: 'ShoppingCart'
                    },
                    {
                      id: 2,
                      action: 'Price updated for batch AC-2024-089',
                      description: 'Resale price set to $4.20/kg',
                      timestamp: '4 hours ago',
                      status: 'info',
                      icon: 'DollarSign'
                    },
                    {
                      id: 3,
                      action: 'Blockchain confirmation received',
                      description: 'Transaction 0xa1b2c3... confirmed',
                      timestamp: '6 hours ago',
                      status: 'success',
                      icon: 'Shield'
                    }
                  ]?.map((activity) => (
                    <div key={activity?.id} className="flex items-start space-x-4 p-3 bg-background rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity?.status === 'success' ? 'bg-success/10' : 'bg-secondary/10'
                      }`}>
                        <Icon 
                          name={activity?.icon} 
                          size={20} 
                          className={activity?.status === 'success' ? 'text-success' : 'text-secondary'} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-medium text-foreground">
                          {activity?.action}
                        </div>
                        <div className="text-sm text-muted-foreground font-body mt-1">
                          {activity?.description}
                        </div>
                        <div className="text-xs text-muted-foreground font-caption mt-2">
                          {activity?.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          batch={selectedBatch}
          onConfirm={handlePurchaseConfirm}
          isBulk={isBulkPurchase}
          selectedBatches={selectedBatches}
        />

        <BatchDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          batch={selectedBatch}
          onPurchase={handlePurchase}
        />

        {/* Quick Action Button */}
        <QuickActionButton />
      </div>
    </>
  );
};

export default DistributorDashboard;