import { z } from "zod";

export const createInvitationSchema = z.object({
  invitedEmail: z.string().email("Invalid email address"),
  role: z.enum(["admin", "member"]).optional().default("member"),
});

export const respondInvitationSchema = z.object({
  action: z.enum(["accept", "decline"]),
});
