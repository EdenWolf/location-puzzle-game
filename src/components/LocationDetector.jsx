import { useState, useEffect } from 'react';
import styled from 'styled-components';

const LocationContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surfaceLight};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const LocationTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.subtitle};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.xs};
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-left: 2px solid ${props => props.theme.colors.error};
`;

const LocationInfo = styled.div`
  margin-top: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
`;

const LocationCoords = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.small};
  color: ${props => props.theme.colors.textSecondary};
  font-family: ${props => props.theme.typography.fontFamily};
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.small};
  margin: ${props => props.theme.spacing.xs} 0;
`;

const DistanceInfo = styled.p`
  margin-top: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.body};
  
  strong {
    color: ${props => props.theme.colors.secondary};
    font-weight: ${props => props.theme.typography.fontWeights.medium};
  }
`;

const LoadingMessage = styled.div`
  color: ${props => props.theme.colors.warning};
  margin-top: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid ${props => props.theme.colors.warning};
    border-radius: 50%;
    border-top-color: transparent;
    margin-right: ${props => props.theme.spacing.sm};
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ProgressContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const ProgressBackground = styled.div`
  height: 0.75rem;
  width: 100%;
  border-radius: 9999px;
  background-color: ${props => props.watching ? props.theme.colors.surfaceLight : props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.isAtLocation ? props.theme.colors.success : props.theme.colors.primary};
  width: ${props => props.progressWidth};
  transition: width 0.3s ease-out;
  box-shadow: 0 0 8px ${props => props.isAtLocation ? props.theme.colors.success : props.theme.colors.primary};
`;

const ActionButton = styled.button`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: #6200ee; /* Fixed primary color instead of theme variable */
  color: white;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: transform ${props => props.theme.transitions.short};
  font-size: ${props => props.theme.typography.fontSizes.body};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }
  
  &:active, &:focus {
    transform: translateY(0);
    outline: none;
  }
  
  &:before {
    content: '📍';
    font-size: 1.2em;
  }
`;

const LocationDetector = ({ targetLocation, onLocationMatch, onLocationUpdate }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [watching, setWatching] = useState(false);
  const [distance, setDistance] = useState(null);
  const [watchId, setWatchId] = useState(null);

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

    // Clear any existing watch
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }

    setWatching(true);
    const id = navigator.geolocation.watchPosition(
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

    setWatchId(id);
    return id;
  };

  // Function to force location update
  const recalculateLocation = () => {
    // Stop current watching
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    
    // Start a new watch with a fresh position request
    setCurrentLocation(null); // Clear current location to show loading
    const newWatchId = startWatching();
    
    // Also request a one-time position update for immediate feedback
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setCurrentLocation(newLocation);
        
        if (targetLocation) {
          const dist = calculateDistance(
            latitude, 
            longitude, 
            targetLocation.latitude, 
            targetLocation.longitude
          );
          setDistance(dist);
        }
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    const id = startWatching();
    
    return () => {
      if (id) {
        navigator.geolocation.clearWatch(id);
        setWatching(false);
      }
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
  
  // Format distance for display (meters or kilometers)
  const formatDistance = (meters) => {
    if (meters === null) return '---';
    
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`;
    } else {
      return `${meters.toFixed(0)} meters`;
    }
  };

  return (
    <LocationContainer>
      <LocationTitle>מצב מיקום</LocationTitle>
      
      {error && (
        <ErrorMessage>
          שגיאה בזיהוי מיקום: {error}
        </ErrorMessage>
      )}
      
      {currentLocation ? (
        <LocationInfo>
          <p>המיקום הנוכחי שלך:</p>
          <LocationCoords>
            קו רוחב: {currentLocation.latitude.toFixed(6)}, 
            קו אורך: {currentLocation.longitude.toFixed(6)}
          </LocationCoords>
          
          {targetLocation && distance !== null && (
            <DistanceInfo>
              מרחק ליעד: <strong>{formatDistance(distance)}</strong>
            </DistanceInfo>
          )}
        </LocationInfo>
      ) : (
        <LoadingMessage>
          מאתר את המיקום שלך...
        </LoadingMessage>
      )}
      
      <ProgressContainer>
        <ProgressBackground watching={watching}>
          <ProgressBar 
            isAtLocation={distance !== null && distance <= 50}
            progressWidth={getProgressWidth()}
          />
        </ProgressBackground>
      </ProgressContainer>
      
      <ActionButton onClick={recalculateLocation}>
        חשב מיקום מחדש
      </ActionButton>
    </LocationContainer>
  );
};

export default LocationDetector;
