import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  poNumber: string;

  @Column()
  vendorId: number;

  @Column()
  totalAmount: number;

  @Column()
  dueDate: Date;

  @Column({ default: 'APPROVED' })
  status: string;
}
