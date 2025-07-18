import { useState, useEffect } from 'react';
import styled from 'styled-components';


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

  // Calculate progress bar width based on distance to target
  const getProgressWidth = () => {
    if (distance && targetLocation) {
      const percentage = Math.max(0, Math.min(100, 100 - (distance / 200) * 100));
      return `${percentage}%`;
    }
    return '0%';
  };

  return (
    <LocationContainer>
      <LocationTitle>Location Status</LocationTitle>
      
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      
      {currentLocation ? (
        <LocationInfo>
          <p>Your current location:</p>
          <LocationCoords>
            Latitude: {currentLocation.latitude.toFixed(6)}, 
            Longitude: {currentLocation.longitude.toFixed(6)}
          </LocationCoords>
          
          {targetLocation && distance !== null && (
            <DistanceInfo>
              Distance to target: <strong>{(distance).toFixed(0)} meters</strong>
            </DistanceInfo>
          )}
        </LocationInfo>
      ) : (
        <LoadingMessage>
          Getting your location...
        </LoadingMessage>
      )}
      
      <ProgressContainer>
        <ProgressBackground $watching={watching}>
          <ProgressBar 
            $isAtLocation={distance !== null && distance <= 50}
            $progressWidth={getProgressWidth()}
          />
        </ProgressBackground>
      </ProgressContainer>
    </LocationContainer>
  );
};

export default LocationDetector;

const LocationContainer = styled.div`
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const LocationTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-top: 0.5rem;
`;

const LocationInfo = styled.div`
  margin-top: 0.5rem;
`;

const LocationCoords = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const DistanceInfo = styled.p`
  margin-top: 0.5rem;
`;

const LoadingMessage = styled.div`
  color: #f59e0b;
  margin-top: 0.5rem;
`;

const ProgressContainer = styled.div`
  margin-top: 0.75rem;
`;

const ProgressBackground = styled.div`
  height: 0.75rem;
  width: 100%;
  border-radius: 9999px;
  background-color: ${props => props.watching ? '#bbf7d0' : '#e5e7eb'};
`;

const ProgressBar = styled.div`
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.isAtLocation ? '#22c55e' : '#3b82f6'};
  width: ${props => props.progressWidth};
`;