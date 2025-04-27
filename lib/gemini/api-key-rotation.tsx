import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the API key rotation context type
type ApiKeyContextType = {
  currentKey: string;
  rotateKey: () => void;
  resetRateLimit: () => void;
  isRateLimited: boolean;
};

// Create a context with default values
const ApiKeyContext = createContext<ApiKeyContextType>({
  currentKey: '',
  rotateKey: () => {},
  resetRateLimit: () => {},
  isRateLimited: false,
});

// Define the props for the provider component
type ApiKeyProviderProps = {
  children: ReactNode;
  apiKeys: string[];
};

// Create the provider component
export const ApiKeyProvider = ({ children, apiKeys }: ApiKeyProviderProps) => {
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<number | null>(null);

  // Rotate to the next API key
  const rotateKey = () => {
    setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % apiKeys.length);
  };

  // Mark the current key as rate limited and set a reset time
  const markRateLimited = () => {
    setIsRateLimited(true);
    // Set reset time to 60 seconds from now
    const resetTime = Date.now() + 60000;
    setRateLimitResetTime(resetTime);
    // Automatically rotate to the next key
    rotateKey();
  };

  // Reset the rate limit status
  const resetRateLimit = () => {
    setIsRateLimited(false);
    setRateLimitResetTime(null);
  };

  // Check if the rate limit should be reset based on time
  useEffect(() => {
    if (isRateLimited && rateLimitResetTime) {
      const checkRateLimit = () => {
        if (Date.now() >= rateLimitResetTime) {
          resetRateLimit();
        }
      };

      const intervalId = setInterval(checkRateLimit, 5000);
      return () => clearInterval(intervalId);
    }
  }, [isRateLimited, rateLimitResetTime]);

  // The context value
  const value = {
    currentKey: apiKeys[currentKeyIndex],
    rotateKey,
    resetRateLimit,
    isRateLimited,
  };

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
};

// Custom hook to use the API key context
export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
