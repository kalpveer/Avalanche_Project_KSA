import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentRole = () => {
    if (location?.pathname?.includes('/farmer-dashboard')) return 'farmer';
    if (location?.pathname?.includes('/distributor-dashboard')) return 'distributor';
    if (location?.pathname?.includes('/consumer-portal')) return 'consumer';
    return 'default';
  };

  const currentRole = getCurrentRole();

  const navigationItems = [
    {
      label: 'Farmer Portal',
      path: '/farmer-dashboard',
      icon: 'Sprout',
      role: 'farmer',
      description: 'Manage your produce and track earnings'
    },
    {
      label: 'Distributor Hub',
      path: '/distributor-dashboard',
      icon: 'Truck',
      role: 'distributor',
      description: 'Purchase workflows and profit analytics'
    },
    {
      label: 'Consumer Portal',
      path: '/consumer-portal',
      icon: 'ShoppingCart',
      role: 'consumer',
      description: 'Verify products and explore transparency'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Logout logic here
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getRoleTheme = () => {
    switch (currentRole) {
      case 'farmer':
        return 'bg-primary text-primary-foreground';
      case 'distributor':
        return 'bg-secondary text-secondary-foreground';
      case 'consumer':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between h-14 px-4 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="lg:hidden text-current hover:bg-white/10"
            >
              <Icon name="Menu" size={24} />
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <Icon name="Leaf" size={18} className="text-white" />
            </div>
            <div className="font-heading font-bold text-lg tracking-tight text-slate-900">
              AgriChain
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              onClick={() => handleNavigation(item?.path)}
              className={`text-slate-600 hover:text-primary hover:bg-transparent px-4 py-2 text-sm font-medium ${
                location?.pathname === item?.path ? 'text-primary' : ''
              }`}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Blockchain Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-caption">Verified</span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="text-current hover:bg-white/10"
            >
              <Icon name="User" size={20} />
            </Button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm font-medium text-popover-foreground border-b border-border">
                    {currentRole?.charAt(0)?.toUpperCase() + currentRole?.slice(1)} Account
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start mt-1"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Help & Support
                  </Button>
                  <div className="border-t border-border mt-1 pt-1">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-destructive hover:text-destructive"
                      iconName="LogOut"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-current hover:bg-white/10"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-modal">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className="w-full justify-start"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item?.label}</span>
                  <span className="text-xs text-muted-foreground">{item?.description}</span>
                </div>
              </Button>
            ))}
            
            <div className="border-t border-border pt-2 mt-4">
              <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Blockchain Verified</span>
              </div>
            </div>
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;