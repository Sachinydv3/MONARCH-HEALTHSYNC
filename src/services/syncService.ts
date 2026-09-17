import { v4 as uuidv4 } from 'uuid';

export interface RegistrationData {
  fullName: string;
  dateOfBirth: string;
  gender: 'female' | 'male' | 'other';
  mobileNumber: string;
  villageAddress: string;
  [key: string]: any;
}

export interface PendingRegistration {
  id: string;
  timestamp: number;
  status: 'pending' | 'syncing' | 'failed';
  payload: RegistrationData;
  retryCount: number;
  lastError?: string;
}

const SYNC_QUEUE_KEY = 'monarch_sync_queue';

export const syncService = {
  saveRegistration: (data: RegistrationData) => {
    const queue: PendingRegistration[] = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');

    const newRegistration: PendingRegistration = {
      id: crypto.randomUUID(), // Using browser's crypto API for UUID
      timestamp: Date.now(),
      status: 'pending',
      payload: data,
      retryCount: 0,
    };

    queue.push(newRegistration);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    return newRegistration.id;
  },

  getQueue: (): PendingRegistration[] => {
    return JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
  },

  markAsSynced: (id: string) => {
    const queue = syncService.getQueue().filter(item => item.id !== id);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  },

  markAsFailed: (id: string, error: string) => {
    const queue = syncService.getQueue().map(item => {
      if (item.id === id) {
        return { ...item, status: 'failed', lastError: error, retryCount: item.retryCount + 1 };
      }
      return item;
    });
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  },

  async processQueue() {
    if (!navigator.onLine) return;

    const queue = this.getQueue();
    const pending = queue.filter(item => item.status === 'pending' || item.status === 'failed');

    for (const item of pending) {
      try {
        // Simulate API call
        await this.simulateApiCall(item.payload);
        this.markAsSynced(item.id);
      } catch (e: any) {
        this.markAsFailed(item.id, e.message);
      }
    }
  },

  async simulateApiCall(data: RegistrationData): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          console.log('Synced successfully:', data.fullName);
          resolve();
        } else {
          reject(new Error('Network timeout'));
        }
      }, 1000);
    });
  }
};
