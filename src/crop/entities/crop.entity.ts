import { Property } from 'src/property/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  season: string;

  @ManyToOne(() => Property, (property) => property.crops, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column({nullable: false})
  propertyId: string;
}
