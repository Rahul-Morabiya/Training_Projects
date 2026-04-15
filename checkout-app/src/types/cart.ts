/**
 * Cart item type (normalized + enriched)
 */
export interface CartItem {
  id: number;
  title: string;
  price: number;
  basePrice: number;
  qty: number;
}