import { NatsModule } from 'src/transports/nats.module';

import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [NatsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
