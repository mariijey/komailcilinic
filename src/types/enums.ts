export const ContractStatusEnum: Record<string, string> = {
  in_progress: "in_progress",
  pending_deposit: "pending_deposit",
  pending_certificate_confirmation: "pending_certificate_confirmation",
  completed: "completed",
  canceled: "canceled",
  require_settlement: "archived",
};


export const KYCStatusEnum: Record<string, string> = {
  active: "active",
  success: "success",
  failed: "failed",
  expired: "expired",
  canceled: "canceled",
  pending_review: "pending_review ",
};
