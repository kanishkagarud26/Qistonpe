import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vendor } from './vendor/vendor.entity';
import { PurchaseOrder } from './po/po.entity';
import { Payment } from './payment/payment.entity';

import { VendorModule } from './vendor/vendor.module';
import { PoModule } from './po/po.module';
import { PaymentModule } from './payment/payment.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',      // 👈 change if different
      password: 'kanu@123',          // 👈 put your MySQL password if any
      database: 'msme_db',   // 👈 must exist
      entities: [Vendor, PurchaseOrder, Payment],
      synchronize: true,
    }),
    VendorModule,
    PoModule,
    PaymentModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
