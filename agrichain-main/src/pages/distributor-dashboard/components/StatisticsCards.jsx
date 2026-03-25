import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Pending Purchases',
      value: stats?.pendingPurchases,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Completed Transactions',
      value: stats?.completedTransactions,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Average Profit Margin',
      value: `${stats?.averageProfitMargin}%`,
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+2.5%',
      changeType: 'increase'
    },
    {
      title: 'Blockchain Confirmations',
      value: stats?.blockchainConfirmations,
      icon: 'Shield',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '100%',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-caption ${
              card?.changeType === 'increase' ? 'text-success' : 
              card?.changeType === 'decrease' ? 'text-error' : 'text-muted-foreground'
            }`}>
              {card?.changeType === 'increase' && <Icon name="ArrowUp" size={14} />}
              {card?.changeType === 'decrease' && <Icon name="ArrowDown" size={14} />}
              <span>{card?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              {typeof card?.value === 'number' ? card?.value?.toLocaleString() : card?.value}
            </h3>
            <p className="text-sm font-body text-muted-foreground">{card?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;