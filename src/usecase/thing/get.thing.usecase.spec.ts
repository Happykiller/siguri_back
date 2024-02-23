import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { ERRORS } from '@src/common/ERROR';
import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { EncodeService } from '@service/encode/encode.service';
import { GetThingUsecase } from '@usecase/thing/get.thing.usecase';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';

describe('GetThingUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockEncodeService: MockProxy<EncodeService> = mock<EncodeService>();

  mockInversify.bddService = mockBddService;
  mockInversify.encodeService = mockEncodeService;

  const usecase: GetThingUsecase = new GetThingUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get a thing', async () => {
      // arrange
      mockBddService.getThing.mockResolvedValue(thingChestRopo);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        thing_id: thingChestRopo.id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual(thingChestRopo);
    });

    it('should not found', async () => {
      // arrange
      mockBddService.getThing.mockResolvedValue(null);
      // act
      let error;
      try {
        await usecase.execute({
          thing_id: thingChestRopo.id,
          user_id: userRopo.id,
          chest_secret: 'password',
        });
      } catch (e) {
        error = e.message;
      }
      // assert
      expect(error).toEqual(ERRORS.GET_THING_USECASE_THING_NOT_FOUND);
    });
  });
});
