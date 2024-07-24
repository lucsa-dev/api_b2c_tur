import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { UserTestMock } from './utils/userTest.utils';
import { UserEntity } from './entities/user.entity';

describe('UsersService unit tests', () => {
  let service: UsersService;
  let expectOutputUser: UserEntity;
  let mockUserRepository: any;
  let userTestUtils: UserTestMock;

  beforeEach(async () => {
    userTestUtils = new UserTestMock();
    expectOutputUser = userTestUtils.generateMock();

    mockUserRepository = {
      create: jest.fn().mockResolvedValue(Promise.resolve(expectOutputUser)),
      findAll: jest.fn().mockResolvedValue(Promise.resolve([expectOutputUser])),
      findOne: jest.fn().mockResolvedValue(Promise.resolve(expectOutputUser)),
      findOneById: jest
        .fn()
        .mockResolvedValue(Promise.resolve(expectOutputUser)),
      update: jest.fn().mockResolvedValue(Promise.resolve(expectOutputUser)),
      remove: jest.fn().mockResolvedValue(Promise.resolve(expectOutputUser)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: () => mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const expectInputUser = {
        name: 'josh doe',
        email: 'josh@gmail.com',
        cpf: '040.199.951.33',
        phone: '85994949494',
        password: '12345',
      };

      const newUser = await service.create(expectInputUser);

      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(newUser).toEqual(expectOutputUser);
    });
  });

  it('should return a list of users', async () => {
    const listUsers = await service.findAll();

    expect(mockUserRepository.findAll).toHaveBeenCalled();
    expect(listUsers).toEqual([expectOutputUser]);
  });

  it('should return a user', async () => {
    const user = await service.findOne(expectOutputUser.email);

    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(user).toEqual(expectOutputUser);
  });

  it('should update a user', async () => {
    const expectInputUser = {
      name: 'josh doe',
    };

    const user = await service.update(expectOutputUser.id, expectInputUser);

    expect(mockUserRepository.update).toHaveBeenCalled();
    expect(user).toEqual(expectOutputUser);
  });

  it('should remove a user', async () => {
    const user = await service.remove(expectOutputUser.id);

    expect(mockUserRepository.remove).toHaveBeenCalled();
    expect(user).toEqual(expectOutputUser);
  });
});
