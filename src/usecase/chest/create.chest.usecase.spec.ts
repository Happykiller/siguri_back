import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { chestRopo } from '@src/service/db/fake/mock/chest.ropo';
import { CryptService } from '@service/crypt/crypt.service';
import { CreateChestUsecase } from '@usecase/chest/create.chest.usecase';

describe('CreateChestUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockCryptService: MockProxy<CryptService> = mock<CryptService>();

  mockInversify.bddService = mockBddService;
  mockInversify.cryptService = mockCryptService;

  const usecase: CreateChestUsecase = new CreateChestUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should create a chest', async () => {
      // arrange
      mockBddService.createChest.mockResolvedValue(chestRopo);
      mockCryptService.crypt.mockReturnValue(chestRopo.secret);
      // act
      const response = await usecase.execute({
        label: chestRopo.label,
        description: chestRopo.description,
        user_id: chestRopo.author_id,
        secret: 'password',
      });
      // assert
      expect(response).toEqual(chestRopo);
    });
  });
});
