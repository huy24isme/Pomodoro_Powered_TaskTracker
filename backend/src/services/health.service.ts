export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
}

export const getHealthStatus = (): HealthStatus => {
  return {
    status: "API running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
};
