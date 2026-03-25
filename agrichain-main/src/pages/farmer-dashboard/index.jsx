import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import StatisticsCard from './components/StatisticsCard';
import BatchManagementTable from './components/BatchManagementTable';
import EarningsPanel from './components/EarningsPanel';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for farmer dashboard
  const statisticsData = [
    {
      title: "Total Batches",
      value: "156",
      subtitle: "Active batches",
      icon: "Package",
      trend: "up",
      trendValue: "+12%"
    },
    {
      title: "Active Shipments",
      value: "23",
      subtitle: "In transit",
      icon: "Truck",
      trend: "up",
      trendValue: "+5%"
    },
    {
      title: "This Month Earnings",
      value: "₹45,280",
      subtitle: "September 2025",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+18%"
    },
    {
      title: "Blockchain Transactions",
      value: "89",
      subtitle: "Verified on chain",
      icon: "Shield",
      trend: "stable",
      trendValue: "100%"
    }
  ];

  const batchesData = [
    {
      id: 1,
      batchId: "AC-2025-001",
      produceType: "Organic Tomatoes",
      quantity: "500 kg",
      status: "Harvested",
      location: "Farm Storage",
      harvestDate: "2025-09-05",
      blockchainHash: "0x1a2b3c4d5e6f7890"
    },
    {
      id: 2,
      batchId: "AC-2025-002",
      produceType: "Basmati Rice",
      quantity: "2 tons",
      status: "In Transit",
      location: "Distribution Hub",
      harvestDate: "2025-09-01",
      blockchainHash: "0x2b3c4d5e6f789012"
    },
    {
      id: 3,
      batchId: "AC-2025-003",
      produceType: "Fresh Spinach",
      quantity: "200 kg",
      status: "Processing",
      location: "Processing Unit",
      harvestDate: "2025-09-07",
      blockchainHash: "0x3c4d5e6f78901234"
    },
    {
      id: 4,
      batchId: "AC-2025-004",
      produceType: "Wheat Flour",
      quantity: "1.5 tons",
      status: "Delivered",
      location: "Retail Store",
      harvestDate: "2025-08-28",
      blockchainHash: "0x4d5e6f7890123456"
    },
    {
      id: 5,
      batchId: "AC-2025-005",
      produceType: "Organic Carrots",
      quantity: "300 kg",
      status: "Harvested",
      location: "Farm Storage",
      harvestDate: "2025-09-08",
      blockchainHash: "0x5e6f789012345678"
    }
  ];

  const earningsData = {
    totalEarnings: 45280,
    monthlyGrowth: 18,
    averagePerBatch: 290
  };

  const recentTransactions = [
    {
      id: 1,
      description: "Batch AC-2025-001 sold to distributor",
      amount: 12500,
      date: "2025-09-09",
      batchId: "AC-2025-001",
      type: "sale"
    },
    {
      id: 2,
      description: "Batch AC-2025-002 payment received",
      amount: 18000,
      date: "2025-09-08",
      batchId: "AC-2025-002",
      type: "sale"
    },
    {
      id: 3,
      description: "Processing fee for AC-2025-003",
      amount: 500,
      date: "2025-09-07",
      batchId: "AC-2025-003",
      type: "expense"
    },
    {
      id: 4,
      description: "Batch AC-2025-004 final payment",
      amount: 14280,
      date: "2025-09-06",
      batchId: "AC-2025-004",
      type: "sale"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "batch_created",
      title: "New batch created",
      description: "Organic Carrots batch AC-2025-005 has been created and registered on blockchain",
      batchId: "AC-2025-005",
      blockchainHash: "0x5e6f789012345678",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      actionable: true
    },
    {
      id: 2,
      type: "payment_received",
      title: "Payment received",
      description: "Payment for Basmati Rice batch has been processed successfully",
      batchId: "AC-2025-002",
      amount: 18000,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      actionable: false
    },
    {
      id: 3,
      type: "batch_sold",
      title: "Batch sold",
      description: "Organic Tomatoes batch has been sold to distributor",
      batchId: "AC-2025-001",
      amount: 12500,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      actionable: true
    },
    {
      id: 4,
      type: "blockchain_verified",
      title: "Blockchain verification complete",
      description: "Fresh Spinach batch has been verified and recorded on blockchain",
      batchId: "AC-2025-003",
      blockchainHash: "0x3c4d5e6f78901234",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      actionable: false
    },
    {
      id: 5,
      type: "batch_updated",
      title: "Batch status updated",
      description: "Wheat Flour batch status changed to \'Delivered'",
      batchId: "AC-2025-004",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      actionable: true
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewBatchDetails = (batch) => {
    console.log('View batch details:', batch);
    // Navigate to batch details page or open modal
  };

  const handleUpdateBatchStatus = (batch) => {
    console.log('Update batch status:', batch);
    // Open status update modal
  };

  const handleViewBlockchain = (batch) => {
    console.log('View blockchain details:', batch);
    // Navigate to blockchain verification page
  };

  const handleCreateBatch = (batchData) => {
    console.log('Create new batch:', batchData);
    // Process new batch creation
  };

  const handleUploadPhotos = () => {
    console.log('Upload photos');
    // Open photo upload modal
  };

  const handleGenerateReport = () => {
    console.log('Generate report');
    // Generate and download report
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={() => {}} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground font-body">Loading farmer dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => {}} />
      <QuickActionButton />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Welcome back, Farmer!
            </h1>
            <p className="text-muted-foreground font-body">
              Manage your produce batches, track earnings, and monitor blockchain transactions.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statisticsData?.map((stat, index) => (
              <StatisticsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                subtitle={stat?.subtitle}
                icon={stat?.icon}
                trend={stat?.trend}
                trendValue={stat?.trendValue}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions
              onCreateBatch={handleCreateBatch}
              onUploadPhotos={handleUploadPhotos}
              onGenerateReport={handleGenerateReport}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Batch Management - Takes 2 columns */}
            <div className="xl:col-span-2">
              <BatchManagementTable
                batches={batchesData}
                onViewDetails={handleViewBatchDetails}
                onUpdateStatus={handleUpdateBatchStatus}
                onViewBlockchain={handleViewBlockchain}
              />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Earnings Panel */}
              <EarningsPanel
                earningsData={earningsData}
                recentTransactions={recentTransactions}
              />

              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;