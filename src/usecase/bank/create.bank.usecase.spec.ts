import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { bankRopo } from '@service/db/fake/mock/bank.ropo';
import { CryptService } from '@service/crypt/crypt.service';
import { CreateBankUsecase } from '@usecase/bank/create.bank.usecase';

describe('CreateBankUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockCryptService: MockProxy<CryptService> = mock<CryptService>();

  mockInversify.bddService = mockBddService;
  mockInversify.cryptService = mockCryptService;

  const usecase: CreateBankUsecase = new CreateBankUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should create a bank', async () => {
      // arrange
      mockBddService.createBank.mockResolvedValue(bankRopo);
      mockCryptService.crypt.mockReturnValue(bankRopo.secret);
      // act
      const response = await usecase.execute({
        label: bankRopo.label,
        description: bankRopo.description,
        user_id: bankRopo.author_id,
        secret: 'password',
      });
      // assert
      expect(response).toEqual(bankRopo);
    });
  });
});
