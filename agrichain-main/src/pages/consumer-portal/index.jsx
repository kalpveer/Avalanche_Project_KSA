import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import QRScanner from './components/QRScanner';
import SupplyChainTimeline from './components/SupplyChainTimeline';
import InteractiveMap from './components/InteractiveMap';
import ProductDetails from './components/ProductDetails';
import TrustIndicators from './components/TrustIndicators';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConsumerPortal = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [scannedBatch, setScannedBatch] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('agricchain_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Load scan history from localStorage
    const savedHistory = localStorage.getItem('agricchain_scan_history');
    if (savedHistory) {
      setScanHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('agricchain_language', language);
  };

  const mockBatchData = {
    batchId: 'FT2024090915103456',
    productName: 'Organic Red Apples',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop'
    ],
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
    farm: {
      name: 'Green Valley Organic Farm',
      location: 'Yakima Valley, Washington',
      coordinates: { lat: 46.6021, lng: -120.5059 },
      harvestDate: '2024-08-15',
      price: 2.50,
      variety: 'Honeycrisp',
      organic: true,
      quantity: '500 lbs'
    },
    distributor: {
      name: 'Pacific Northwest Distributors',
      location: 'Seattle, Washington',
      coordinates: { lat: 47.6062, lng: -122.3321 },
      purchaseDate: '2024-08-18',
      price: 3.25,
      qualityGrade: 'Grade A',
      storageConditions: 'Refrigerated 32-35°F',
      transportMethod: 'Refrigerated Truck'
    },
    retailer: {
      name: 'Fresh Market Grocery',
      location: 'Portland, Oregon',
      coordinates: { lat: 45.5152, lng: -122.6784 },
      receivedDate: '2024-08-20',
      price: 4.99,
      displayLocation: 'Produce Section',
      expiryDate: '2024-09-15',
      currentStock: '45 units'
    }
  };

  const handleScanResult = async (batchId) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to fetch batch data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const batchData = {
        ...mockBatchData,
        batchId: batchId,
        scannedAt: new Date()?.toISOString()
      };
      
      setScannedBatch(batchData);
      
      // Add to scan history
      const newHistory = [batchData, ...scanHistory?.slice(0, 9)]; // Keep last 10 scans
      setScanHistory(newHistory);
      localStorage.setItem('agricchain_scan_history', JSON.stringify(newHistory));
      
    } catch (error) {
      console.error('Error fetching batch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewScan = () => {
    setScannedBatch(null);
    setIsScanning(false);
  };

  const handleHistorySelect = (batch) => {
    setScannedBatch(batch);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={() => {}} />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-success border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Verifying Product...
              </h2>
              <p className="text-muted-foreground font-body">
                Fetching supply chain data from blockchain
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => {}} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!scannedBatch ? (
            <>
              {/* Welcome Section */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-2 mb-2 text-primary">
                  <Icon name="QrCode" size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Transparency Portal</span>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                  Verify Your Produce
                </h1>
                <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                  Scan QR codes to trace your food from farm to table. 
                  Explore the complete supply chain with blockchain verification.
                </p>
              </div>

              {/* Language Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2 bg-card border border-border rounded-lg p-1">
                  <Button
                    variant={currentLanguage === 'en' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </Button>
                  <Button
                    variant={currentLanguage === 'es' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleLanguageChange('es')}
                  >
                    Español
                  </Button>
                </div>
              </div>

              {/* QR Scanner */}
              <div className="max-w-2xl mx-auto mb-8">
                <QRScanner 
                  onScanResult={handleScanResult}
                  isScanning={isScanning}
                  setIsScanning={setIsScanning}
                />
              </div>

              {/* Scan History */}
              {scanHistory?.length > 0 && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="History" size={16} className="text-muted-foreground" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">
                          Recent Scans
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setScanHistory([]);
                          localStorage.removeItem('agricchain_scan_history');
                        }}
                        iconName="Trash2"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Clear History
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {scanHistory?.slice(0, 6)?.map((batch, index) => (
                        <div
                          key={index}
                          onClick={() => handleHistorySelect(batch)}
                          className="border border-border rounded-lg p-4 cursor-pointer hover:border-success/50 hover:bg-success/5 transition-all"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={batch?.images?.[0]}
                                alt={batch?.productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = '/assets/images/no_image.png';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-body font-medium text-foreground truncate">
                                {batch?.productName}
                              </h4>
                              <p className="text-xs text-muted-foreground font-mono">
                                {batch?.batchId}
                              </p>
                              <p className="text-xs text-muted-foreground font-body">
                                {new Date(batch.scannedAt)?.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="max-w-6xl mx-auto mt-20">
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Traceability Redefined
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Built on Avalanche for ultimate trust and speed
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-8 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-slate-50 rounded-md flex items-center justify-center mx-auto mb-5 border border-slate-100">
                      <Icon name="Shield" size={20} className="text-slate-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      Verified Origin
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      Every production step is recorded on the blockchain for permanent authenticity.
                    </p>
                  </div>
                  
                  <div className="text-center p-8 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-slate-50 rounded-md flex items-center justify-center mx-auto mb-5 border border-slate-100">
                      <Icon name="Route" size={20} className="text-slate-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      Live Journey
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      Real-time visibility into the logistical movement of your agricultural products.
                    </p>
                  </div>
                  
                  <div className="text-center p-8 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-slate-50 rounded-md flex items-center justify-center mx-auto mb-5 border border-slate-100">
                      <Icon name="Award" size={20} className="text-slate-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      Quality Tokens
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      High-precision AGRI tokens represent verified batches and quality certifications.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Scanned Product Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleNewScan}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    iconSize={16}
                  >
                    New Scan
                  </Button>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      Product Verification Complete
                    </h1>
                    <p className="text-muted-foreground font-body">
                      Batch ID: {scannedBatch?.batchId}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-body text-success">Verified</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <ProductDetails batchData={scannedBatch} />
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <SupplyChainTimeline batchData={scannedBatch} />
                  <TrustIndicators batchData={scannedBatch} />
                </div>
                
                <InteractiveMap batchData={scannedBatch} />
              </div>
            </>
          )}
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default ConsumerPortal;