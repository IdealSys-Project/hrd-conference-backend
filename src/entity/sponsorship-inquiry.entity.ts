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
  full_name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  company: string;

  @Column({ length: 100 })
  job_title: string;

  @Column({ length: 20 })
  contact_number: string;

  @Column({ length: 50 })
  interest: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
