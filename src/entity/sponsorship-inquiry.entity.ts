import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('sponsorship_inquiries')
export class SponsorshipInquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  company: string;

  @Column({ length: 100 })
  jobTitle: string;

  @Column({ length: 20 })
  contactNumber: string;

  @Column({ length: 50 })
  interest: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
