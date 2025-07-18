import { useState, useEffect } from 'react';

const LocationDetector = ({ targetLocation, onLocationMatch, onLocationUpdate }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [watching, setWatching] = useState(false);
  const [distance, setDistance] = useState(null);

  // Function to calculate distance between two points using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // Start watching position
  const startWatching = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setWatching(true);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setCurrentLocation(newLocation);
        
        // Call the onLocationUpdate callback with the new location
        if (onLocationUpdate) {
          onLocationUpdate(newLocation);
        }
        
        // Check if the user is at the target location
        if (targetLocation) {
          const dist = calculateDistance(
            latitude, 
            longitude, 
            targetLocation.latitude, 
            targetLocation.longitude
          );
          
          setDistance(dist);
          
          // If within 50 meters, consider it a match
          if (dist <= 50) {
            if (onLocationMatch) {
              onLocationMatch(newLocation);
            }
          }
        }

        setError(null);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      setWatching(false);
    };
  };

  useEffect(() => {
    const cleanup = startWatching();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [targetLocation]); // Restart watching when target location changes

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="text-lg font-medium">Location Status</h3>
      
      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}
      
      {currentLocation ? (
        <div className="mt-2">
          <p>Your current location:</p>
          <p className="text-sm text-gray-600">
            Latitude: {currentLocation.latitude.toFixed(6)}, 
            Longitude: {currentLocation.longitude.toFixed(6)}
          </p>
          
          {targetLocation && distance !== null && (
            <p className="mt-2">
              Distance to target: <strong>{(distance).toFixed(0)} meters</strong>
            </p>
          )}
        </div>
      ) : (
        <div className="text-amber-500 mt-2">
          Getting your location...
        </div>
      )}
      
      <div className="mt-3">
        <div className={`h-3 w-full rounded-full ${watching ? 'bg-green-200' : 'bg-gray-200'}`}>
          <div 
            className={`h-3 rounded-full ${distance !== null && distance <= 50 ? 'bg-green-500' : 'bg-blue-500'}`} 
            style={{ width: distance && targetLocation ? `${Math.max(0, Math.min(100, 100 - (distance / 200) * 100))}%` : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetector;
