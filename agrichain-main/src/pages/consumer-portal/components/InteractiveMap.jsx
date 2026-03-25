import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ batchData }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapView, setMapView] = useState('route'); // 'route' or 'satellite'

  const locations = [
    {
      id: 'farm',
      name: batchData?.farm?.name,
      type: 'Farm Origin',
      coordinates: batchData?.farm?.coordinates,
      address: batchData?.farm?.location,
      icon: 'Sprout',
      color: 'text-primary',
      bgColor: 'bg-primary',
      details: {
        area: '25 acres',
        established: '2018',
        certification: 'Organic Certified',
        contact: '+1 (555) 123-4567'
      }
    },
    {
      id: 'distributor',
      name: batchData?.distributor?.name,
      type: 'Distribution Center',
      coordinates: batchData?.distributor?.coordinates,
      address: batchData?.distributor?.location,
      icon: 'Truck',
      color: 'text-secondary',
      bgColor: 'bg-secondary',
      details: {
        capacity: '10,000 tons',
        established: '2015',
        certification: 'ISO 22000',
        contact: '+1 (555) 234-5678'
      }
    },
    {
      id: 'retailer',
      name: batchData?.retailer?.name,
      type: 'Retail Store',
      coordinates: batchData?.retailer?.coordinates,
      address: batchData?.retailer?.location,
      icon: 'Store',
      color: 'text-accent',
      bgColor: 'bg-accent',
      details: {
        size: '15,000 sq ft',
        established: '2020',
        certification: 'Food Safety Certified',
        contact: '+1 (555) 345-6789'
      }
    }
  ];

  const totalDistance = 1247; // km
  const totalTransportTime = '18 hours';

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Map" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Journey Map
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Geographic path from farm to store
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={mapView === 'route' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('route')}
            iconName="Route"
            iconPosition="left"
            iconSize={14}
          >
            Route
          </Button>
          <Button
            variant={mapView === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('satellite')}
            iconName="Satellite"
            iconPosition="left"
            iconSize={14}
          >
            Satellite
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="relative bg-muted rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {/* Google Maps Embed */}
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Supply Chain Route Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${batchData?.farm?.coordinates?.lat},${batchData?.farm?.coordinates?.lng}&z=8&output=embed`}
              className="border-0"
            />
            
            {/* Map Overlay Controls */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-modal">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Navigation" size={16} className="text-success" />
                <span className="font-body font-medium text-foreground">
                  {totalDistance} km • {totalTransportTime}
                </span>
              </div>
            </div>

            {/* Location Markers Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {locations?.map((location, index) => (
                <div
                  key={location?.id}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    left: `${20 + (index * 30)}%`,
                    top: `${30 + (index * 15)}%`
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className={`w-8 h-8 ${location?.bgColor} rounded-full flex items-center justify-center shadow-modal hover:scale-110 transition-transform`}>
                    <Icon name={location?.icon} size={16} className="text-white" />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-card text-foreground text-xs px-2 py-1 rounded shadow-modal whitespace-nowrap">
                    {location?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transport Summary */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-heading font-bold text-foreground">
                {totalDistance} km
              </div>
              <div className="text-xs text-muted-foreground font-body">
                Total Distance
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-heading font-bold text-foreground">
                {totalTransportTime}
              </div>
              <div className="text-xs text-muted-foreground font-body">
                Transport Time
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-heading font-bold text-success">
                3 Stops
              </div>
              <div className="text-xs text-muted-foreground font-body">
                Supply Chain
              </div>
            </div>
          </div>
        </div>

        {/* Location Details Panel */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-foreground">Locations</h3>
          
          {locations?.map((location) => (
            <div
              key={location?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedLocation?.id === location?.id
                  ? 'border-success bg-success/5' :'border-border hover:border-muted-foreground/50'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${location?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={location?.icon} size={16} className="text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-body font-medium text-foreground truncate">
                      {location?.name}
                    </h4>
                    {selectedLocation?.id === location?.id && (
                      <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground font-body mb-2">
                    {location?.type}
                  </p>
                  
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    <span className="font-body truncate">{location?.address}</span>
                  </div>

                  {/* Expanded Details */}
                  {selectedLocation?.id === location?.id && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      {Object.entries(location?.details)?.map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground font-body capitalize">
                            {key?.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <span className="text-foreground font-body">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Environmental Impact */}
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Leaf" size={16} className="text-success" />
              <span className="text-sm font-body font-medium text-success">
                Environmental Impact
              </span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span className="font-body">Carbon Footprint:</span>
                <span className="font-body">2.3 kg CO₂</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body">Fuel Efficiency:</span>
                <span className="font-body">8.2 km/L</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body">Eco Rating:</span>
                <span className="font-body text-success">A+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;