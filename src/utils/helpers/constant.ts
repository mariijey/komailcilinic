export const PROPERTY_STATUS: Record<string, string> = {
  draft: "Draft",
  pending: "Pending",
  pending_payment: "Pending Payment",
  listed: "Listed",
  rented: "Rented",
  canceled: "Canceled",
};

export const CONTRACT_STATUS: Record<string, string> = {
  in_progress: "In progress",
  pending_deposit: "Pending deposit",
  completed: "Completed",
  canceled: "Canceled",
  require_settlement: "Return of Deposit Required",
  request_settlement: "Deposit requested",
  accept_settlement: "Return deposit accepted",
  archived: "Deposit returned",
  expired: "Expired",
};
