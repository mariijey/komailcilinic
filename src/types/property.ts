export type PropertyStatusType =
  | "draft"
  | "pending"
  | "pending_payment"
  | "listed"
  | "rented"
  | "canceled";

export enum PropertyEnum {
  draft = "draft",
  pending = "pending",
  pending_payment = "pending_payment",
  listed = "listed",
  rented = "rented",
  canceled = "canceled",
}
