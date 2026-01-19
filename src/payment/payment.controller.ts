import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private service: PaymentService) {}

  @Post()
  pay(@Body() body: any) {
    return this.service.pay(body);
  }

  @Get()
  async getAll() {
    // fetch all payments from service
    const payments = await this.service.getAllPayments();
    return payments.map(p => ({
      paymentRef: p.paymentRef,
      amount: p.amount,
      purchaseOrderId: p.purchaseOrderId,
    }));
  }
}
