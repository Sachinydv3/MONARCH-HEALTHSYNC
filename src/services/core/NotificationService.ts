/**
 * NotificationService handles application-wide notifications,
 * including appointment reminders, report readiness, and system alerts.
 */
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

class NotificationService {
  private notifications: AppNotification[] = [];

  /**
   * Push a new notification to the system.
   * In a real app, this would interface with a WebSocket or Push API.
   */
  async notify(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: AppNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    };

    this.notifications.unshift(newNotification);
    console.log(`[NotificationService] New alert: ${newNotification.title}`);

    // In a real implementation, we would trigger a state update or push notification
    return newNotification;
  }

  async getNotifications(userId: string): Promise<AppNotification[]> {
    return this.notifications;
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  async clearAll(): Promise<void> {
    this.notifications = [];
  }
}

export const notificationService = new NotificationService();
