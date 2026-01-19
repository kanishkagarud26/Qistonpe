import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PurchaseOrder } from '../po/po.entity';
import { Payment } from '../payment/payment.entity';
import { Vendor } from '../vendor/vendor.entity';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    @InjectRepository(PurchaseOrder)
    private poRepo: Repository<PurchaseOrder>,

    @InjectRepository(Payment)
    private payRepo: Repository<Payment>,

    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  @Get('vendor-outstanding')
  async outstanding() {
    // Get all purchase orders
    const purchaseOrders = await this.poRepo.find();

    // Map each PO with its vendor and outstanding amount
    const result = await Promise.all(
      purchaseOrders.map(async po => {
        const vendor = await this.vendorRepo.findOneBy({ id: po.vendorId });
        const payments = await this.payRepo.find({ where: { purchaseOrderId: po.id } });
        const paidAmount = payments.reduce((sum, p) => sum + p.amount, 0);
        const outstanding = po.totalAmount - paidAmount;

        return {
          poNumber: po.poNumber,
          vendorName: vendor?.name || 'Unknown',
          totalAmount: po.totalAmount,
          paidAmount,
          outstanding,
          status: po.status,
        };
      }),
    );

    return result;
  }
}
