import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    // Load .env variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Configure TypeORM using environment variables
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Vendor, PurchaseOrder, Payment],
      synchronize: true,
    }),
    

    // Import your modules
    VendorModule,
    PoModule,
    PaymentModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
