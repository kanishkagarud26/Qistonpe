import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { PurchaseOrder } from '../po/po.entity';
import { Payment } from '../payment/payment.entity';
import { Vendor } from '../vendor/vendor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder, Payment, Vendor]), // <--- add Vendor here
  ],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
