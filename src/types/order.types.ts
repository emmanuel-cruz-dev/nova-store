export interface OrderItem {
  productId: number;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  updatedAt?: string;
  userName?: string;
  userEmail?: string;
}

export interface CreateOrderDTO {
  userId: number;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending";
}
