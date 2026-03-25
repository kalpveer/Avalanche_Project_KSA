import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { mintTokens } from '../../../utils/blockchain';

const QuickActions = ({ onCreateBatch, onUploadPhotos, onGenerateReport }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintAmount, setMintAmount] = useState('');
  const [newBatch, setNewBatch] = useState({
    produceType: '',
    quantity: '',
    harvestDate: '',
    location: ''
  });

  const handleMint = async (e) => {
    e?.preventDefault();
    if (!mintAmount || isNaN(mintAmount)) return;
    
    setIsMinting(true);
    try {
      await mintTokens(mintAmount);
      alert(`Successfully minted ${mintAmount} AGRI!`);
      setShowMintModal(false);
      setMintAmount('');
    } catch (err) {
      alert("Minting failed. Are you the owner?");
    } finally {
      setIsMinting(false);
    }
  };

  const quickActionItems = [
    {
      icon: 'Plus',
      label: 'New Batch',
      description: 'Create a new produce batch',
      color: 'bg-primary text-primary-foreground',
      action: () => setShowCreateForm(true)
    },
    {
      icon: 'Camera',
      label: 'Upload Photos',
      description: 'Add batch photos',
      color: 'bg-secondary text-secondary-foreground',
      action: onUploadPhotos
    },
    {
      icon: 'FileText',
      label: 'Generate Report',
      description: 'Create earnings report',
      color: 'bg-accent text-accent-foreground',
      action: onGenerateReport
    },
    {
      icon: 'Coins',
      label: 'Mint AGRI',
      description: 'Mint AgriCoin tokens',
      color: 'bg-yellow-500 text-white',
      action: () => setShowMintModal(true)
    }
  ];

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-heading font-semibold text-card-foreground mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems?.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={item?.action}
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted/50 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item?.color}`}>
                <Icon name={item?.icon} size={24} />
              </div>
              <div className="text-center">
                <p className="font-body text-sm font-medium text-foreground">{item?.label}</p>
                <p className="font-caption text-xs text-muted-foreground">{item?.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Create Batch Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-card-foreground">Create New Batch</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateForm(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleCreateBatch} className="p-6 space-y-4">
              <Input
                label="Produce Type"
                type="text"
                placeholder="e.g., Tomatoes, Wheat, Rice"
                value={newBatch?.produceType}
                onChange={(e) => setNewBatch({ ...newBatch, produceType: e?.target?.value })}
                required
              />
              
              <Input
                label="Quantity"
                type="text"
                placeholder="e.g., 500 kg, 100 tons"
                value={newBatch?.quantity}
                onChange={(e) => setNewBatch({ ...newBatch, quantity: e?.target?.value })}
                required
              />
              
              <Input
                label="Harvest Date"
                type="date"
                value={newBatch?.harvestDate}
                onChange={(e) => setNewBatch({ ...newBatch, harvestDate: e?.target?.value })}
                required
              />
              
              <Input
                label="Farm Location"
                type="text"
                placeholder="e.g., Village, District, State"
                value={newBatch?.location}
                onChange={(e) => setNewBatch({ ...newBatch, location: e?.target?.value })}
                required
              />
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Create Batch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Mint Tokens Modal */}
      {showMintModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-card-foreground">Mint AgriCoins (AGRI)</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMintModal(false)}
                  disabled={isMinting}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleMint} className="p-6 space-y-4">
              <Input
                label="Amount to Mint"
                type="number"
                placeholder="e.g., 100"
                value={mintAmount}
                onChange={(e) => setMintAmount(e?.target?.value)}
                required
                disabled={isMinting}
              />
              <p className="text-xs text-muted-foreground">
                These tokens will be minted to your connected wallet address.
              </p>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowMintModal(false)}
                  disabled={isMinting}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" disabled={isMinting}>
                  {isMinting ? "Minting..." : "Mint Tokens"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;