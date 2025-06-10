import { Property } from 'src/property/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  season: string; // ex: "2024/2025"

  @ManyToOne(() => Property, (property) => property.crops, { onDelete: 'CASCADE' })
  property: Property;

  @Column()
  propertyId: string;
}
