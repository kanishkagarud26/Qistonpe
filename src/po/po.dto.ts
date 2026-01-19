import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsString()
  orderNumber: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  orderDate: string;

  @IsNumber()
  vendorId: number; // Link to Vendor entity

  @IsOptional()
  @IsString()
  status?: string;
}
