import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { ERRORS } from '@src/common/ERROR';
import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { CryptService } from '@service/crypt/crypt.service';
import { chestRopo } from '@service/db/fake/mock/chest.ropo';
import { GetChestUsecase } from '@usecase/chest/get.chest.usecase';

describe('GetChestUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockCryptService: MockProxy<CryptService> = mock<CryptService>();

  mockInversify.bddService = mockBddService;
  mockInversify.cryptService = mockCryptService;

  const usecase: GetChestUsecase = new GetChestUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get a chest', async () => {
      // arrange
      mockBddService.getChest.mockResolvedValue(chestRopo);
      mockCryptService.crypt.mockReturnValue(chestRopo.secret);
      // act
      const response = await usecase.execute({
        id: chestRopo.id,
        user_id: userRopo.id,
        secret: 'password',
      });
      // assert
      expect(response).toEqual(chestRopo);
    });

    it('should not found', async () => {
      // arrange
      mockBddService.getChest.mockResolvedValue(null);
      // act
      let error;
      try {
        await usecase.execute({
          id: chestRopo.id,
          user_id: userRopo.id,
          secret: 'password',
        });
      } catch (e) {
        error = e.message;
      }
      // assert
      expect(error).toEqual(ERRORS.GET_CHEST_USECASE_CHEST_NOT_FOUND);
    });

    it('should wrong secret', async () => {
      // arrange
      mockBddService.getChest.mockResolvedValue(chestRopo);
      mockCryptService.crypt.mockReturnValue('wrong secret');
      // act
      let error;
      try {
        await usecase.execute({
          id: chestRopo.id,
          user_id: userRopo.id,
          secret: 'password',
        });
      } catch (e) {
        error = e.message;
      }
      // assert
      expect(error).toEqual(ERRORS.GET_CHEST_USECASE_WRONG_SECRET);
    });

    it('should no member', async () => {
      // arrange
      mockBddService.getChest.mockResolvedValue(chestRopo);
      mockCryptService.crypt.mockReturnValue(chestRopo.secret);
      // act
      let error;
      try {
        await usecase.execute({
          id: chestRopo.id,
          user_id: '42',
          secret: 'password',
        });
      } catch (e) {
        error = e.message;
      }
      // assert
      expect(error).toEqual(ERRORS.GET_CHEST_USECASE_USER_NOT_IN_MEMBERS);
    });
  });
});
