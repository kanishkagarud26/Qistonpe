import { IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  poId: number; // Link to PurchaseOrder

  @IsNumber()
  amount: number;

  @IsDateString()
  paymentDate: string;

  @IsOptional()
  @IsString()
  method?: string; // e.g., 'cash', 'card'
}
