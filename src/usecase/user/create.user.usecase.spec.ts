import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { CryptService } from '@service/crypt/crypt.service';
import { CreateUserUsecase } from '@usecase/user/create.user.usecase';

describe('CreateUserUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockCryptService: MockProxy<CryptService> = mock<CryptService>();

  mockInversify.bddService = mockBddService;
  mockInversify.cryptService = mockCryptService;

  const usecase: CreateUserUsecase = new CreateUserUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should create a user', async () => {
      // arrange
      const data = {
        code: 'ropo',
        password: 'password',
        name_first: 'Robert',
        name_last: 'Paulson',
        description: 'password with secret secretKey',
        mail: 'r.paulson@bob.com',
      };
      const expected = {
        id: '65d4d015261e894a1da31a64',
        ...data,
        role: 'USER',
        active: true,
      };
      mockBddService.createUser.mockResolvedValue(expected);
      mockCryptService.crypt.mockReturnValue('password');
      // act
      const response = await usecase.execute(data);
      // assert
      expect(response).toEqual(expected);
    });
  });
});
