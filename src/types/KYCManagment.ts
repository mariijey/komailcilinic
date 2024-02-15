import { UserItemSchema } from "./userManagement";

export interface KYC {
  id: number;
  realName: string | null;
  realPhone: string | null;
  realAddress: string | null;
  user: UserItemSchema;
  status:
    | "active"
    | "success"
    | "failed"
    | "expired"
    | "canceled"
    | "pending_review";
  verifiedAt: string | null;
  declineReason: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
