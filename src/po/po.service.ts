import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PurchaseOrder } from './po.entity';
import { Vendor } from '../vendor/vendor.entity';

@Injectable()
export class PoService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private repo: Repository<PurchaseOrder>,

    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async create(data: any) {
    const vendor = await this.vendorRepo.findOneBy({ id: data.vendorId });
    if (!vendor || vendor.status === 'INACTIVE') {
      throw new BadRequestException('Vendor inactive or not found');
    }

    return this.repo.save({
      ...data,
      poNumber: `PO-${Date.now()}`,
      dueDate: new Date(Date.now() + vendor.paymentTerms * 86400000),
    });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
