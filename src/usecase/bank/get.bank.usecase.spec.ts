import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { ERRORS } from '@src/common/ERROR';
import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { bankRopo } from '@service/db/fake/mock/bank.ropo';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { CryptService } from '@service/crypt/crypt.service';
import { GetBankUsecase } from '@usecase/bank/get.bank.usecase';

describe('GetBankUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockCryptService: MockProxy<CryptService> = mock<CryptService>();

  mockInversify.bddService = mockBddService;
  mockInversify.cryptService = mockCryptService;

  const usecase: GetBankUsecase = new GetBankUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get a bank', async () => {
      // arrange
      mockBddService.getBank.mockResolvedValue(bankRopo);
      mockCryptService.crypt.mockReturnValue(bankRopo.secret);
      // act
      const response = await usecase.execute({
        id: bankRopo.id,
        user_id: userRopo.id,
        secret: 'password',
      });
      // assert
      expect(response).toEqual(bankRopo);
    });

    it('should not found', async () => {
      // arrange
      mockBddService.getBank.mockResolvedValue(null);
      // act
      let error;
      try {
        await usecase.execute({
          id: bankRopo.id,
          user_id: userRopo.id,
          secret: 'password',
        });
      } catch (e) {
        error = e.message;
      }
      // assert
      expect(error).toEqual(ERRORS.GET_BANK_USECASE_BANK_NOT_FOUND);
    });

    it('should wrong secret', async () => {
      // arrange
      mockBddService.getBank.mockResolvedValue(bankRopo);
      mockCryptService.crypt.mockReturnValue('wrong secret');
      // act
      let error;
      try {
        await usecase.execute({
          id: bankRopo.id,
          user_id: userRopo.id,
          secret: 'password',
        });
      } catch (e) {
        error = e.message;
      }
      // assert
      expect(error).toEqual(ERRORS.GET_BANK_USECASE_WRONG_SECRET);
    });

    it('should no member', async () => {
      // arrange
      mockBddService.getBank.mockResolvedValue(bankRopo);
      mockCryptService.crypt.mockReturnValue(bankRopo.secret);
      // act
      let error;
      try {
        await usecase.execute({
          id: bankRopo.id,
          user_id: '42',
          secret: 'password',
        });
      } catch (e) {
        error = e.message;
      }
      // assert
      expect(error).toEqual(ERRORS.GET_BANK_USECASE_USER_NOT_IN_MEMBERS);
    });
  });
});
