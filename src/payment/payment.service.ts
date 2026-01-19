import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  
  import { Payment } from './payment.entity';
  import { PurchaseOrder } from '../po/po.entity';
  
  @Injectable()
  export class PaymentService {
    constructor(
      @InjectRepository(Payment)
      private payRepo: Repository<Payment>,
  
      @InjectRepository(PurchaseOrder)
      private poRepo: Repository<PurchaseOrder>,
    ) {}
  
    async pay(data: any) {
      const po = await this.poRepo.findOneBy({ id: data.purchaseOrderId });
      if (!po) throw new NotFoundException('PO not found');
  
      const payments = await this.payRepo.find({
        where: { purchaseOrderId: po.id },
      });
  
      const paid = payments.reduce((s, p) => s + p.amount, 0);
      const outstanding = po.totalAmount - paid;
  
      if (data.amount > outstanding) {
        throw new BadRequestException('Amount exceeds outstanding');
      }
  
      await this.payRepo.save({
        ...data,
        paymentRef: `PAY-${Date.now()}`,
      });
  
      po.status =
        paid + data.amount === po.totalAmount
          ? 'FULLY_PAID'
          : 'PARTIALLY_PAID';
  
      return this.poRepo.save(po);
    }
    // ✅ Added GET method to fetch all payments
   async getAllPayments() {
    return this.payRepo.find();
  }
  }
   

  