import { useState, useEffect } from 'react';

export type ConnectionQuality = 'good' | 'weak' | 'disconnected';

interface ConnectionStatus {
  quality: ConnectionQuality;
  label: string;
  color: string;
}

const QUALITY_MAP: Record<ConnectionQuality, ConnectionStatus> = {
  good: { quality: 'good', label: 'Connected', color: 'bg-green-500' },
  weak: { quality: 'weak', label: 'Weak Connection', color: 'bg-amber-500' },
  disconnected: { quality: 'disconnected', label: 'Reconnecting...', color: 'bg-red-500' },
};

export const useConnectionStatus = () => {
  const [quality, setQuality] = useState<ConnectionQuality>('good');

  useEffect(() => {
    // Simulate network fluctuations every 15 seconds
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.8) setQuality('disconnected');
      else if (rand > 0.6) setQuality('weak');
      else setQuality('good');
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return {
    ...QUALITY_MAP[quality],
    setQuality,
  };
};
