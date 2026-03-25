import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const ProfitAnalytics = ({ analyticsData }) => {
  const [activeTab, setActiveTab] = useState('profit');

  const tabs = [
    { id: 'profit', label: 'Profit Trends', icon: 'TrendingUp' },
    { id: 'purchases', label: 'Purchase History', icon: 'ShoppingCart' },
    { id: 'distribution', label: 'Produce Distribution', icon: 'PieChart' }
  ];

  const profitData = [
    { month: 'Jan', profit: 4500, margin: 15.2 },
    { month: 'Feb', profit: 5200, margin: 16.8 },
    { month: 'Mar', profit: 4800, margin: 14.9 },
    { month: 'Apr', profit: 6100, margin: 18.3 },
    { month: 'May', profit: 7200, margin: 19.7 },
    { month: 'Jun', profit: 6800, margin: 18.9 },
    { month: 'Jul', profit: 8100, margin: 21.2 },
    { month: 'Aug', profit: 7900, margin: 20.8 },
    { month: 'Sep', profit: 8500, margin: 22.1 }
  ];

  const purchaseData = [
    { week: 'Week 1', purchases: 12, volume: 2400 },
    { week: 'Week 2', purchases: 18, volume: 3200 },
    { week: 'Week 3', purchases: 15, volume: 2800 },
    { week: 'Week 4', purchases: 22, volume: 4100 },
    { week: 'Week 5', purchases: 19, volume: 3600 },
    { week: 'Week 6', purchases: 25, volume: 4800 }
  ];

  const distributionData = [
    { name: 'Tomatoes', value: 35, color: '#ef4444' },
    { name: 'Potatoes', value: 25, color: '#f97316' },
    { name: 'Onions', value: 20, color: '#eab308' },
    { name: 'Carrots', value: 12, color: '#22c55e' },
    { name: 'Others', value: 8, color: '#6b7280' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-body font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm font-caption" style={{ color: entry?.color }}>
              {entry?.name}: {typeof entry?.value === 'number' ? entry?.value?.toLocaleString() : entry?.value}
              {entry?.name === 'profit' && ' $'}
              {entry?.name === 'margin' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profit':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background border border-border rounded-lg p-4">
                <h4 className="font-heading font-semibold text-foreground mb-4">Monthly Profit</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="var(--color-muted-foreground)"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="var(--color-muted-foreground)"
                        fontSize={12}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="profit" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <h4 className="font-heading font-semibold text-foreground mb-4">Profit Margin Trend</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={profitData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="var(--color-muted-foreground)"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="var(--color-muted-foreground)"
                        fontSize={12}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="margin" 
                        stroke="var(--color-accent)" 
                        strokeWidth={3}
                        dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-heading font-semibold text-foreground">Performance Metrics</h4>
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left" iconSize={14}>
                  Export Report
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-heading font-bold text-success">$68,900</div>
                  <div className="text-sm font-body text-muted-foreground">Total Profit (YTD)</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="text-2xl font-heading font-bold text-secondary">18.7%</div>
                  <div className="text-sm font-body text-muted-foreground">Average Margin</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-heading font-bold text-accent">156</div>
                  <div className="text-sm font-body text-muted-foreground">Total Purchases</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'purchases':
        return (
          <div className="bg-background border border-border rounded-lg p-4">
            <h4 className="font-heading font-semibold text-foreground mb-4">Weekly Purchase Activity</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="week" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="purchases" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="volume" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'distribution':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-heading font-semibold text-foreground mb-4">Produce Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-heading font-semibold text-foreground mb-4">Distribution Breakdown</h4>
              <div className="space-y-4">
                {distributionData?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item?.color }}
                      ></div>
                      <span className="font-body text-foreground">{item?.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-body font-semibold text-foreground">{item?.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border">
        <div className="flex items-center space-x-1 p-1">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab?.id)}
              iconName={tab?.icon}
              iconPosition="left"
              iconSize={16}
              className="flex-1 lg:flex-none"
            >
              <span className="hidden sm:inline">{tab?.label}</span>
              <span className="sm:hidden">{tab?.label?.split(' ')?.[0]}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfitAnalytics;