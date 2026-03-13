import { ActivityLog } from "@models/activity-log.model";
import { parsePagination, paginationMeta } from "@utils/pagination";
import * as workspaceService from "./workspace.service";

export const logActivity = async (data: {
  workspaceId: string;
  userId: string;
  action: string;
  targetType: string;
  targetId: string;
}) => {
  return ActivityLog.create(data);
};

export const getActivityLogs = async (
  workspaceId: string,
  userId: string,
  query: { page?: string; limit?: string; action?: string },
) => {
  await workspaceService.getWorkspaceById(workspaceId, userId);

  const filter: Record<string, any> = { workspaceId };
  if (query.action) {
    filter.action = query.action;
  }

  const { skip, limit, page } = parsePagination(query);
  const [logs, total] = await Promise.all([
    ActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ActivityLog.countDocuments(filter),
  ]);
  return { logs, meta: paginationMeta(page, limit, total) };
};
