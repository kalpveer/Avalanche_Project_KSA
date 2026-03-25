import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCard = ({ title, value, subtitle, icon, trend, trendValue, className = '' }) => {
  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  return (
    <div className={`bg-white border border-slate-100 rounded-lg p-5 shadow-sm transition-all duration-200 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[13px] font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
          {subtitle && (
            <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className={`flex items-center space-x-1 mt-3 ${getTrendColor()}`}>
              <Icon name={getTrendIcon()} size={14} />
              <span className="text-xs font-semibold">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-md flex items-center justify-center">
            <Icon name={icon} size={20} className="text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;