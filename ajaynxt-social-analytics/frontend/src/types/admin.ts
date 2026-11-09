export interface PlatformStats {
  totalUsers: number;
  totalWorkspaces: number;
  activeIgConnections: number;
  monthlyApiRequests: number;
  cloudRunInvocations: number;
  firestoreReadsWrites: number;
  estimatedGcpCostInr: number;
  monthlyBudgetCapInr: number;
  budgetUsedPercent: number;
  systemHealth: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  metaApiStatus: 'OPERATIONAL' | 'DEGRADED';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  workspaceName: string;
  action: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}
