import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './service/create-producer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProducerService', () => {
  let service: ProducerService;
  let repo: jest.Mocked<Repository<Producer>>;

  const mockProducer: Producer = {
    id: 'dac78524-0b4d-4e5d-8c45-9f53e80b8b44',
    name: 'Larissa',
    cpfCnpj: '12345678900',
  } as Producer;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repo = module.get(getRepositoryToken(Producer));
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar um produtor', async () => {
    const dto = { name: 'Larissa', cpfCnpj: '12345678900' };
    repo.create.mockReturnValue(dto as Producer);
    repo.save.mockResolvedValue({ ...mockProducer });

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockProducer);
  });

  it('deve buscar todos os produtores', async () => {
    repo.find.mockResolvedValue([mockProducer]);

    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual([mockProducer]);
  });

  it('deve retornar um produtor por ID', async () => {
    repo.findOneBy.mockResolvedValue(mockProducer);

    const result = await service.findOne(mockProducer.id);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: mockProducer.id });
    expect(result).toEqual(mockProducer);
  });

  it('deve lançar erro ao buscar produtor inexistente', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.findOne('uuid-inexistente')).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um produtor', async () => {
    repo.update.mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });
    repo.findOneBy.mockResolvedValue(mockProducer);

    await expect(service.update(mockProducer.id, { name: 'Atualizada' })).resolves.toEqual(mockProducer);
  });

  it('deve remover um produtor', async () => {
    repo.delete.mockResolvedValue({
      affected: 1,
      raw: []
    });
    await expect(service.remove(mockProducer.id)).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith(mockProducer.id);
  });

  it('deve lançar erro ao tentar remover produtor inexistente', async () => {
    repo.delete.mockResolvedValue({
      affected: 0,
      raw: [],
    });
    await expect(service.remove('uuid-inexistente')).rejects.toThrow(NotFoundException);
  });
});