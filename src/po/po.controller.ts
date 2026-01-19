import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PoService } from './po.service';

@Controller('purchase-orders')
export class PoController {
  constructor(private service: PoService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
}
