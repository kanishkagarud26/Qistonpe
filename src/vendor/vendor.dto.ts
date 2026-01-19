import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
