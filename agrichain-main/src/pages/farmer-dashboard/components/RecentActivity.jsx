import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BlockchainVerificationBadge from '../../../components/ui/BlockchainVerificationBadge';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'batch_created':
        return { icon: 'Plus', color: 'text-success bg-success/10' };
      case 'batch_updated':
        return { icon: 'Edit', color: 'text-warning bg-warning/10' };
      case 'batch_sold':
        return { icon: 'TrendingUp', color: 'text-primary bg-primary/10' };
      case 'payment_received':
        return { icon: 'DollarSign', color: 'text-success bg-success/10' };
      case 'blockchain_verified':
        return { icon: 'Shield', color: 'text-secondary bg-secondary/10' };
      default:
        return { icon: 'Activity', color: 'text-muted-foreground bg-muted' };
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-card-foreground">Recent Activity</h3>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => {
          const { icon, color } = getActivityIcon(activity?.type);
          
          return (
            <div key={activity?.id} className="p-6 hover:bg-muted/30 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon name={icon} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-body text-sm font-medium text-foreground mb-1">
                        {activity?.title}
                      </p>
                      <p className="font-body text-sm text-muted-foreground mb-2">
                        {activity?.description}
                      </p>
                      
                      {activity?.batchId && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            Batch: {activity?.batchId}
                          </span>
                          {activity?.blockchainHash && (
                            <BlockchainVerificationBadge 
                              status="verified" 
                              size="sm"
                              transactionHash={activity?.blockchainHash}
                            />
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="font-caption">{getTimeAgo(activity?.timestamp)}</span>
                        {activity?.amount && (
                          <span className="font-caption font-medium text-success">
                            +₹{activity?.amount?.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {activity?.actionable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-4 flex-shrink-0"
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {activities?.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-heading text-base font-medium text-foreground mb-2">No Recent Activity</h4>
          <p className="font-body text-sm text-muted-foreground">
            Your recent activities will appear here once you start managing batches.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;