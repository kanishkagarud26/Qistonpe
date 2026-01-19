import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentRef: string;

  @Column()
  purchaseOrderId: number;

  @Column()
  amount: number;
}
