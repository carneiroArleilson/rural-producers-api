import { Property } from 'src/property/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  cpfCnpj: string;

  @Column({ nullable: false})
  name: string;

  @OneToMany(() => Property, (property) => property.producer)
  properties: Property[];

}
