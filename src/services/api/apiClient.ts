import { User } from '../../types';

class ApiGateway {
  private currentUser: User | null = null;

  // Simulating OAuth 2.0 / Authentication
  async authenticate(credentials: any): Promise<User> {
    console.log('[API Gateway] Authenticating user...');
    // Mock auth
    this.currentUser = {
      id: 'user_123',
      role: 'ASHA',
      name: 'Sita Worker',
      token: 'mock_jwt_token_abc123',
      facilityId: 'PHC_001',
    };
    return this.currentUser;
  }

  // Simulating Role-Based Access Control (RBAC)
  private checkPermission(requiredRole: string[]): boolean {
    if (!this.currentUser) return false;
    return requiredRole.includes(this.currentUser.role);
  }

  // Simulating Consent Management (ABDM)
  async checkConsent(patientId: string, requesterId: string): Promise<boolean> {
    console.log(`[API Gateway] Checking ABDM consent for patient ${patientId}...`);
    return true; // Mocked as always granted for prototype
  }

  // Central Request Handler
  async request<T>(
    service: string,
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    payload?: any,
    requiredRoles: string[] = []
  ): Promise<T> {
    console.log(`[API Gateway] ${method} ${service}/${endpoint}`, payload ? `Payload: ${JSON.stringify(payload)}` : '');

    // 1. Auth Check
    if (!this.currentUser) {
      throw new Error('401 Unauthorized: No active session');
    }

    // 2. RBAC Check
    if (!this.checkPermission(requiredRoles)) {
      throw new Error('403 Forbidden: Insufficient permissions for this action');
    }

    // 3. Rate Limiting Simulation
    if (Math.random() < 0.001) {
      throw new Error('429 Too Many Requests: Rate limit exceeded');
    }

    // 4. Route to Mock Backend (Simulating Microservices)
    const response = await this.routeToBackend(service, endpoint, method, payload);

    // 5. Audit Log Simulation
    console.log(`[Audit Log] User ${this.currentUser.id} accessed ${service}/${endpoint}`);

    return response;
  }

  private async routeToBackend(service: string, endpoint: string, method: string, payload: any): Promise<any> {
    // In a real app, this would be a fetch call to a specific microservice URL
    // For the prototype, we use a mock backend singleton
    const { mockBackend } = await import('./mockBackend');
    return mockBackend.handleRequest(service, endpoint, method, payload);
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

export const apiClient = new ApiGateway();
