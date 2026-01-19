import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './po.entity';
import { Vendor } from '../vendor/vendor.entity';
import { PoController } from './po.controller';
import { PoService } from './po.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder, Vendor]),
  ],
  controllers: [PoController],
  providers: [PoService],
})
export class PoModule {}
