import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EarningsPanel = ({ earningsData, recentTransactions }) => {
  const [viewMode, setViewMode] = useState('monthly'); // monthly, weekly, yearly
  const [chartType, setChartType] = useState('bar'); // bar, line

  const getChartData = () => {
    switch (viewMode) {
      case 'weekly':
        return [
          { period: 'Mon', earnings: 1200, batches: 3 },
          { period: 'Tue', earnings: 800, batches: 2 },
          { period: 'Wed', earnings: 1500, batches: 4 },
          { period: 'Thu', earnings: 2200, batches: 6 },
          { period: 'Fri', earnings: 1800, batches: 5 },
          { period: 'Sat', earnings: 900, batches: 2 },
          { period: 'Sun', earnings: 600, batches: 1 }
        ];
      case 'yearly':
        return [
          { period: '2022', earnings: 45000, batches: 120 },
          { period: '2023', earnings: 52000, batches: 140 },
          { period: '2024', earnings: 48000, batches: 128 }
        ];
      default: // monthly
        return [
          { period: 'Jan', earnings: 4200, batches: 12 },
          { period: 'Feb', earnings: 3800, batches: 10 },
          { period: 'Mar', earnings: 5200, batches: 15 },
          { period: 'Apr', earnings: 4800, batches: 13 },
          { period: 'May', earnings: 6200, batches: 18 },
          { period: 'Jun', earnings: 5800, batches: 16 },
          { period: 'Jul', earnings: 7200, batches: 20 },
          { period: 'Aug', earnings: 6800, batches: 19 },
          { period: 'Sep', earnings: 5400, batches: 14 }
        ];
    }
  };

  const chartData = getChartData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-caption text-sm text-popover-foreground mb-1">{label}</p>
          <p className="font-body text-sm text-success">
            Earnings: ₹{payload?.[0]?.value?.toLocaleString()}
          </p>
          <p className="font-body text-sm text-primary">
            Batches: {payload?.[0]?.payload?.batches}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-card-foreground">Earnings Overview</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('bar')}
              iconName="BarChart3"
            />
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
            />
          </div>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {[
            { key: 'weekly', label: 'Week' },
            { key: 'monthly', label: 'Month' },
            { key: 'yearly', label: 'Year' }
          ]?.map(({ key, label }) => (
            <Button
              key={key}
              variant={viewMode === key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode(key)}
              className="text-xs"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className="p-6">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="period" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  fontFamily="var(--font-caption)"
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  fontFamily="var(--font-caption)"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="earnings" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="period" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  fontFamily="var(--font-caption)"
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  fontFamily="var(--font-caption)"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="border-t border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-heading font-medium text-card-foreground">Recent Transactions</h4>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions?.map((transaction) => (
              <div key={transaction?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction?.type === 'sale' ? 'bg-success/10' : 'bg-warning/10'
                  }`}>
                    <Icon 
                      name={transaction?.type === 'sale' ? 'TrendingUp' : 'Clock'} 
                      size={18} 
                      className={transaction?.type === 'sale' ? 'text-success' : 'text-warning'} 
                    />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{transaction?.description}</p>
                    <p className="font-caption text-xs text-muted-foreground">{transaction?.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-body text-sm font-semibold ${
                    transaction?.type === 'sale' ? 'text-success' : 'text-warning'
                  }`}>
                    {transaction?.type === 'sale' ? '+' : ''}₹{transaction?.amount?.toLocaleString()}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">{transaction?.batchId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPanel;