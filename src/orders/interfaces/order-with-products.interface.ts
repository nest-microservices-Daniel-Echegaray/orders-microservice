import { OrderStatus } from '@prisma/client';

export interface OrderWithProducts {
  OrderItem: {
    name: any;
    price: number;
    quantity: number;
    productId: number;
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  paidAt: Date;
  createAt: Date;
  updateAt: Date;
}
