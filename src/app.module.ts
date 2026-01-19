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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [Vendor, PurchaseOrder, Payment],
        synchronize: true, // ✅ Only for development / quick test
      }),
    }),

    // Import your modules
    VendorModule,
    PoModule,
    PaymentModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
