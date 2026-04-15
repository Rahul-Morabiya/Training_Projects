/**
 * Order State Machine Types
 */
export type OrderState =
  | "CART_READY"
  | "CHECKOUT_VALIDATED"
  | "ORDER_SUBMITTED"
  | "ORDER_SUCCESS"
  | "ORDER_FAILED"
  | "ORDER_INCONSISTENT"
  | "ROLLED_BACK";

/**
 * Order structure (frontend simulation)
 */
export interface Order {
  id: string;
  items: any[];
  total: number;
  state: OrderState;
  createdAt: number;
}