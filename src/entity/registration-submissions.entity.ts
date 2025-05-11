import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('registration_submissions')
export class RegistrationSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  company: string;

  @Column({ length: 100 })
  jobTitle: string;

  @Column({ length: 20 })
  contactNumber: string;

  @Column({ length: 50, nullable: true })
  promoCode?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
