import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Producer } from 'src/producer/entities/producer.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PropertyService', () => {
  let service: PropertyService;
  let propertyRepo: jest.Mocked<Repository<Property>>;
  let producerRepo: jest.Mocked<Repository<Producer>>;

  const fakeProducer: Producer = {
    id: 'uuid-producer',
    name: 'Larissa',
    cpfCnpj: '12345678900',
    properties: [],
  };

  const fakeProperty: Property = {
    id: 'uuid-property',
    name: 'Fazenda Teste',
    city: 'Xapuri',
    state: 'AC',
    totalArea: 100,
    agriculturalArea: 60,
    vegetationArea: 40,
    producer: fakeProducer,
    crops: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Producer),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    propertyRepo = module.get(getRepositoryToken(Property));
    producerRepo = module.get(getRepositoryToken(Producer));
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar uma propriedade com sucesso', async () => {
    const dto = {
      name: 'Fazenda XP',
      city: 'Manaus',
      state: 'AM',
      totalArea: 100,
      agriculturalArea: 60,
      vegetationArea: 40,
      producerId: fakeProducer.id,
    };

    producerRepo.findOneBy.mockResolvedValue(fakeProducer);
    propertyRepo.create.mockReturnValue({
      id: 'uuid-property',
      ...dto,
      producer: fakeProducer,
      crops: []
    } as Property);
    propertyRepo.save.mockResolvedValue(fakeProperty);

    const result = await service.create(dto);
    expect(producerRepo.findOneBy).toHaveBeenCalledWith({ id: dto.producerId });
    expect(propertyRepo.save).toHaveBeenCalled();
    expect(result).toEqual(fakeProperty);
  });

  it('deve lançar erro se produtor não for encontrado', async () => {
    producerRepo.findOneBy.mockResolvedValue(null);

    await expect(
      service.create({
        name: 'Fazenda XP',
        city: 'Manaus',
        state: 'AM',
        totalArea: 100,
        agriculturalArea: 50,
        vegetationArea: 30,
        producerId: 'invalido',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve lançar erro se soma das áreas exceder total', async () => {
    producerRepo.findOneBy.mockResolvedValue(fakeProducer);

    await expect(
      service.create({
        name: 'Fazenda XP',
        city: 'Manaus',
        state: 'AM',
        totalArea: 60,
        agriculturalArea: 40,
        vegetationArea: 30,
        producerId: fakeProducer.id,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve retornar todas as propriedades', async () => {
    propertyRepo.find.mockResolvedValue([fakeProperty]);

    const result = await service.findAll();
    expect(propertyRepo.find).toHaveBeenCalledWith({ relations: ['producer'] });
    expect(result).toEqual([fakeProperty]);
  });

  it('deve retornar uma propriedade específica', async () => {
    propertyRepo.findOne.mockResolvedValue(fakeProperty);

    const result = await service.findOne('uuid-property');
    expect(result).toEqual(fakeProperty);
  });

  it('deve lançar erro ao buscar propriedade inexistente', async () => {
    propertyRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('inexistente')).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar uma propriedade com sucesso', async () => {
    propertyRepo.findOne.mockResolvedValue(fakeProperty);
    propertyRepo.save.mockResolvedValue({
      ...fakeProperty,
      name: 'Fazenda Nova',
      agriculturalArea: 50,
    });

    const result = await service.update('uuid-property', {
      name: 'Fazenda Nova',
      agriculturalArea: 50,
    });

    expect(result.name).toEqual('Fazenda Nova');
    expect(result.agriculturalArea).toEqual(50);
  });

  it('deve lançar erro ao tentar atualizar e exceder áreas', async () => {
    propertyRepo.findOne.mockResolvedValue(fakeProperty);

    await expect(
      service.update('uuid-property', {
        agriculturalArea: 80,
        vegetationArea: 30,
        totalArea: 100,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve remover propriedade com sucesso', async () => {
    propertyRepo.delete.mockResolvedValue({ affected: 1, raw: [] });
    await expect(service.remove('uuid-property')).resolves.toBeUndefined();
  });

  it('deve lançar erro ao tentar remover uma propriedade inexistente', async () => {
    propertyRepo.delete.mockResolvedValue({ affected: 0, raw: [] });
    await expect(service.remove('naoexiste')).rejects.toThrow(NotFoundException);
  });
});