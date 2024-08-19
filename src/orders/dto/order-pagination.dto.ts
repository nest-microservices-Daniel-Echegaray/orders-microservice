import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

import { OrderStatus } from '@prisma/client';

import { OrderStatusList } from '../enum/order.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsEnum(OrderStatusList, {
    message: `The status must be one of ${OrderStatusList.join(', ')}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
}
