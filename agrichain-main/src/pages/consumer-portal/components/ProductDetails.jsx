import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const ProductDetails = ({ batchData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCertificate, setShowCertificate] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'quality', label: 'Quality', icon: 'Award' },
    { id: 'certifications', label: 'Certifications', icon: 'Shield' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Heart' }
  ];

  const qualityMetrics = [
    { label: 'Freshness Score', value: '95%', color: 'text-success', icon: 'Zap' },
    { label: 'Quality Grade', value: 'A+', color: 'text-success', icon: 'Star' },
    { label: 'Safety Rating', value: '5/5', color: 'text-success', icon: 'Shield' },
    { label: 'Organic Status', value: 'Certified', color: 'text-success', icon: 'Leaf' }
  ];

  const certifications = [
    {
      name: 'USDA Organic',
      issuer: 'United States Department of Agriculture',
      validUntil: '2025-12-31',
      verified: true,
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
    },
    {
      name: 'Fair Trade Certified',
      issuer: 'Fair Trade USA',
      validUntil: '2025-06-30',
      verified: true,
      logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop'
    },
    {
      name: 'Non-GMO Project',
      issuer: 'Non-GMO Project',
      validUntil: '2025-09-15',
      verified: true,
      logo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop'
    }
  ];

  const nutritionFacts = [
    { nutrient: 'Calories', amount: '52', unit: 'kcal', dailyValue: '3%' },
    { nutrient: 'Total Fat', amount: '0.2', unit: 'g', dailyValue: '0%' },
    { nutrient: 'Sodium', amount: '1', unit: 'mg', dailyValue: '0%' },
    { nutrient: 'Total Carbs', amount: '14', unit: 'g', dailyValue: '5%' },
    { nutrient: 'Dietary Fiber', amount: '2.4', unit: 'g', dailyValue: '9%' },
    { nutrient: 'Sugars', amount: '10', unit: 'g', dailyValue: '-' },
    { nutrient: 'Protein', amount: '0.3', unit: 'g', dailyValue: '1%' },
    { nutrient: 'Vitamin C', amount: '4.6', unit: 'mg', dailyValue: '5%' }
  ];

  const handleDownloadCertificate = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `AgriChain_Certificate_${batchData?.batchId}.pdf`;
    link?.click();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Product Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {batchData?.images?.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${batchData?.productName} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                    <Icon name="ZoomIn" size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
            {/* Product Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">Product Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-body">Variety:</span>
                      <span className="font-body">{batchData?.farm?.variety}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-body">Harvest Date:</span>
                      <span className="font-body">{batchData?.farm?.harvestDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-body">Batch Size:</span>
                      <span className="font-body">{batchData?.farm?.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-body">Storage:</span>
                      <span className="font-body">{batchData?.distributor?.storageConditions}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">Farmer Information</h4>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-body font-medium text-foreground">{batchData?.farm?.name}</p>
                        <p className="text-xs text-muted-foreground font-body">{batchData?.farm?.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-body">
                      Family-owned organic farm established in 2018, specializing in sustainable agriculture practices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">Quality Metrics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {qualityMetrics?.map((metric, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-3 text-center">
                        <Icon name={metric?.icon} size={20} className={`${metric?.color} mx-auto mb-1`} />
                        <div className={`text-lg font-heading font-bold ${metric?.color}`}>
                          {metric?.value}
                        </div>
                        <div className="text-xs text-muted-foreground font-body">
                          {metric?.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">Blockchain Verification</h4>
                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <BlockchainVerificationBadge status="verified" transactionHash={batchData?.blockchainHash} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCertificate(true)}
                        iconName="Download"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Certificate
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground font-body space-y-1">
                      <div className="flex justify-between">
                        <span>Transaction Hash:</span>
                        <code className="font-mono">{batchData?.blockchainHash?.slice(0, 16)}...</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Block Number:</span>
                        <code className="font-mono">18,234,567</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Confirmations:</span>
                        <span>1,247</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quality':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-4">Quality Assessment</h4>
                <div className="space-y-4">
                  {qualityMetrics?.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name={metric?.icon} size={20} className={metric?.color} />
                        <span className="font-body text-foreground">{metric?.label}</span>
                      </div>
                      <span className={`font-heading font-bold ${metric?.color}`}>
                        {metric?.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-foreground mb-4">Testing Results</h4>
                <div className="space-y-3">
                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-body font-medium text-success">Pesticide Free</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body">
                      No harmful pesticide residues detected in laboratory testing.
                    </p>
                  </div>

                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-body font-medium text-success">Heavy Metals Safe</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body">
                      Lead, mercury, and cadmium levels well below safety limits.
                    </p>
                  </div>

                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-body font-medium text-success">Microbiological Safe</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body">
                      No harmful bacteria or pathogens detected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {certifications?.map((cert, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={cert?.logo}
                        alt={`${cert?.name} Logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-heading font-semibold text-foreground">
                            {cert?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground font-body">
                            {cert?.issuer}
                          </p>
                        </div>
                        
                        {cert?.verified && (
                          <BlockchainVerificationBadge status="verified" size="sm" transactionHash={batchData?.blockchainHash} />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-body">Valid until: {cert?.validUntil}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="right"
                          iconSize={12}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'nutrition':
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Nutrition Facts
              </h4>
              <div className="text-xs font-body mb-2 text-muted-foreground">
                Serving Size: 1 medium apple (182g)
              </div>
              
              <div className="space-y-2">
                {nutritionFacts?.map((fact, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-border last:border-b-0">
                    <span className="font-body text-foreground">{fact?.nutrient}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-body text-foreground">
                        {fact?.amount}{fact?.unit}
                      </span>
                      {fact?.dailyValue !== '-' && (
                        <span className="text-muted-foreground font-body text-xs">
                          {fact?.dailyValue}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground font-body">
                * Percent Daily Values are based on a 2,000 calorie diet.
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <h5 className="font-body font-medium text-success mb-2">Health Benefits</h5>
                <ul className="text-xs text-muted-foreground font-body space-y-1">
                  <li>• Rich in dietary fiber for digestive health</li>
                  <li>• Contains antioxidants that support immune system</li>
                  <li>• Natural source of vitamin C</li>
                  <li>• Low in calories and fat-free</li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h5 className="font-body font-medium text-foreground mb-2">Storage Tips</h5>
                <ul className="text-xs text-muted-foreground font-body space-y-1">
                  <li>• Store in refrigerator for best freshness</li>
                  <li>• Keep away from other fruits to prevent ripening</li>
                  <li>• Consume within 1-2 weeks of purchase</li>
                  <li>• Wash before eating</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Package" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              {batchData?.productName}
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Batch ID: {batchData?.batchId}
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleDownloadCertificate}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Download Certificate
        </Button>
      </div>
      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-body text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-success text-success' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default ProductDetails;