import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { ChangeOrderStatusDto, PaidOrderDto } from './dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { OrderWithProducts } from './interfaces/order-with-products.interface';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('create_order')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    const orderWithProducts: OrderWithProducts = {
      ...order, // Asegúrate de que las otras propiedades están presentes
      createAt: new Date(), // O el valor correcto de fecha
      updateAt: new Date(), // O el valor correcto de fecha
    };
    const paymentSession =
      await this.ordersService.createPaymentSession(orderWithProducts);

    return {
      order,
      paymentSession,
    };
  }

  @MessagePattern('find_all_orders')
  findAll(@Payload() orderPaginationDto: OrderPaginationDto) {
    return this.ordersService.findAll(orderPaginationDto);
  }

  @MessagePattern('find_one_order')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('change_order_status')
  changeOrderStatus(@Payload() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatusDto);
  }

  @EventPattern('payment.succeeded')
  paidOrder(@Payload() paidOrderDto: PaidOrderDto) {
    return this.ordersService.paidOrder(paidOrderDto);
  }
}
