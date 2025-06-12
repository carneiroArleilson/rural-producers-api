import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Producer } from 'src/producer/entities/producer.entity';
import { Crop } from 'src/crop/entities/crop.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({type: 'float', nullable: false})
  totalArea: number;

  @Column({type: 'float', nullable: false})
  agriculturalArea: number;

  @Column({type: 'float', nullable: false})
  vegetationArea: number;

  @ManyToOne(() => Producer, (producer) => producer.properties, { onDelete: 'CASCADE' })
  producer: Producer;

  @OneToMany(() => Crop, (crop) => crop.property)
  crops: Crop[];
}