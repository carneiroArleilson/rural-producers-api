import { Test, TestingModule } from '@nestjs/testing';
import { CropService } from './crop.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Property } from '../property/entities/property.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Producer } from 'src/producer/entities/producer.entity';

describe('CropService', () => {
  let service: CropService;
  let cropRepo: jest.Mocked<Repository<Crop>>;
  let propertyRepo: jest.Mocked<Repository<Property>>;

  const mockProducer: Producer = {
    id: 'prod-uuid',
    name: 'João',
    cpfCnpj: '12345678900',
    properties: [],
  };

  const mockProperty: Property = {
    id: 'prop-id',
    name: 'Fazenda A',
    totalArea: 100,
    agriculturalArea: 60,
    vegetationArea: 40,
    city: 'Cidade Exemplo',
    state: 'Estado Exemplo',
    crops: [],
    producer: mockProducer,
  };

  const mockCrop: Crop = {
    id: 'crop-id',
    name: 'Milho',
    season: 'Verão',
    property: mockProperty,
  } as Crop;

  const mockCropRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockPropertyRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
        {
          provide: getRepositoryToken(Property),
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    service = module.get<CropService>(CropService);
    cropRepo = module.get(getRepositoryToken(Crop));
    propertyRepo = module.get(getRepositoryToken(Property));
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar uma cultura', async () => {
    const dto = { name: 'Milho', season: 'Verão', propertyId: 'prop-id' };
    propertyRepo.findOneBy.mockResolvedValue(mockProperty);
    cropRepo.create.mockReturnValue(mockCrop);
    cropRepo.save.mockResolvedValue(mockCrop);

    const result = await service.create(dto as any);
    expect(propertyRepo.findOneBy).toHaveBeenCalledWith({ id: dto.propertyId });
    expect(cropRepo.create).toHaveBeenCalledWith({ ...dto, property: mockProperty });
    expect(cropRepo.save).toHaveBeenCalledWith(mockCrop);
    expect(result).toEqual(mockCrop);
  });

  it('deve lançar erro ao criar cultura com propriedade inexistente', async () => {
    const dto = { name: 'Milho', season: 'Verão', propertyId: 'invalid-id' };
    propertyRepo.findOneBy.mockResolvedValue(null);

    await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
  });

  it('deve buscar todas as culturas', async () => {
    cropRepo.find.mockResolvedValue([mockCrop]);

    const result = await service.findAll();
    expect(cropRepo.find).toHaveBeenCalledWith({ relations: ['property'] });
    expect(result).toEqual([mockCrop]);
  });

  it('deve retornar uma cultura por ID', async () => {
    cropRepo.findOne.mockResolvedValue(mockCrop);

    const result = await service.findOne('crop-id');
    expect(cropRepo.findOne).toHaveBeenCalledWith({
      where: { id: 'crop-id' },
      relations: ['property'],
    });
    expect(result).toEqual(mockCrop);
  });

  it('deve lançar erro ao buscar cultura inexistente', async () => {
    cropRepo.findOne.mockResolvedValue(null);

    await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar uma cultura', async () => {
    cropRepo.findOne.mockResolvedValue(mockCrop);
    cropRepo.save.mockResolvedValue({ ...mockCrop, name: 'Atualizado' });

    const result = await service.update('crop-id', { name: 'Atualizado' });
    expect(result).toEqual({ ...mockCrop, name: 'Atualizado' });
  });

  it('deve remover uma cultura', async () => {
    cropRepo.delete.mockResolvedValue({ affected: 1, raw: [] });

    await expect(service.remove('crop-id')).resolves.toBeUndefined();
    expect(cropRepo.delete).toHaveBeenCalledWith('crop-id');
  });

  it('deve lançar erro ao tentar remover cultura inexistente', async () => {
    cropRepo.delete.mockResolvedValue({ affected: 0, raw: [] });

    await expect(service.remove('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
