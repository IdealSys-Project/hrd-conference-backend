import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('speaker_inquiries')
export class SpeakerInquiry {
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
