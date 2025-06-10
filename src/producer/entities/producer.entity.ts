import { Property } from 'src/property/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cpfCnpj: string;

  @Column()
  name: string;

  // Quando formos criar as fazendas (farms), ativamos isso:
  @OneToMany(() => Property, (property) => property.producer)
  properties: Property[];

}
