import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionButton = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const getCurrentRole = () => {
    if (location?.pathname?.includes('/farmer-dashboard')) return 'farmer';
    if (location?.pathname?.includes('/distributor-dashboard')) return 'distributor';
    if (location?.pathname?.includes('/consumer-portal')) return 'consumer';
    return 'default';
  };

  const currentRole = getCurrentRole();

  const getRoleActions = () => {
    switch (currentRole) {
      case 'farmer':
        return [
          {
            icon: 'Plus',
            label: 'New Batch',
            action: () => console.log('Create new batch'),
            primary: true
          },
          {
            icon: 'Camera',
            label: 'Photo Upload',
            action: () => console.log('Upload photos')
          },
          {
            icon: 'FileText',
            label: 'Quick Report',
            action: () => console.log('Generate report')
          }
        ];
      case 'distributor':
        return [
          {
            icon: 'ShoppingCart',
            label: 'Quick Purchase',
            action: () => console.log('Quick purchase'),
            primary: true
          },
          {
            icon: 'Search',
            label: 'Find Batches',
            action: () => console.log('Search batches')
          },
          {
            icon: 'TrendingUp',
            label: 'Analytics',
            action: () => console.log('View analytics')
          }
        ];
      case 'consumer':
        return [
          {
            icon: 'QrCode',
            label: 'Scan QR',
            action: () => console.log('Scan QR code'),
            primary: true
          },
          {
            icon: 'Search',
            label: 'Search Product',
            action: () => console.log('Search products')
          },
          {
            icon: 'History',
            label: 'My Scans',
            action: () => console.log('View scan history')
          }
        ];
      default:
        return [];
    }
  };

  const actions = getRoleActions();
  const primaryAction = actions?.find(action => action?.primary);

  const getRoleTheme = () => {
    switch (currentRole) {
      case 'farmer':
        return {
          bg: 'bg-primary hover:bg-primary/90',
          text: 'text-primary-foreground'
        };
      case 'distributor':
        return {
          bg: 'bg-secondary hover:bg-secondary/90',
          text: 'text-secondary-foreground'
        };
      case 'consumer':
        return {
          bg: 'bg-accent hover:bg-accent/90',
          text: 'text-accent-foreground'
        };
      default:
        return {
          bg: 'bg-primary hover:bg-primary/90',
          text: 'text-primary-foreground'
        };
    }
  };

  const theme = getRoleTheme();

  if (!primaryAction) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {actions?.filter(action => !action?.primary)?.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-end space-x-3 animate-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-popover text-popover-foreground px-3 py-1.5 rounded-lg shadow-modal text-sm font-caption whitespace-nowrap">
                {action?.label}
              </div>
              <Button
                size="icon"
                onClick={() => {
                  action?.action();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 ${theme?.bg} ${theme?.text} shadow-modal hover:shadow-lg transition-all duration-200`}
              >
                <Icon name={action?.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Main Action Button */}
      <div className="relative">
        <Button
          size="icon"
          onClick={() => {
            if (actions?.length > 1) {
              setIsExpanded(!isExpanded);
            } else {
              primaryAction?.action();
            }
          }}
          className={`w-14 h-14 ${theme?.bg} ${theme?.text} shadow-modal hover:shadow-lg transition-all duration-200 ${
            isExpanded ? 'rotate-45' : ''
          }`}
        >
          <Icon 
            name={isExpanded ? 'X' : primaryAction?.icon} 
            size={24} 
            className="transition-transform duration-200"
          />
        </Button>

        {/* Action Label */}
        {!isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 bg-popover text-popover-foreground px-3 py-1.5 rounded-lg shadow-modal text-sm font-caption whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {primaryAction?.label}
          </div>
        )}
      </div>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-transparent z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActionButton;