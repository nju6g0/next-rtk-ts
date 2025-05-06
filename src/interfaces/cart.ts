import { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  loading: boolean;
  error: any;
}
