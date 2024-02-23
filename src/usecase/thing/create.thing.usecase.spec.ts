import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { EncodeService } from '@service/encode/encode.service';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';
import { CreateThingUsecase } from '@usecase/thing/create.thing.usecase';

describe('CreateThingUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockEncodeService: MockProxy<EncodeService> = mock<EncodeService>();

  mockInversify.bddService = mockBddService;
  mockInversify.encodeService = mockEncodeService;

  const usecase: CreateThingUsecase = new CreateThingUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should create a thing credential', async () => {
      // arrange
      mockBddService.createThing.mockResolvedValue(thingChestRopo);
      mockEncodeService.encode.mockImplementation((dto) => dto.message);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        label: thingChestRopo.label,
        description: thingChestRopo.description,
        type: thingChestRopo.type,
        credential: thingChestRopo.credential,
        user_id: thingChestRopo.author_id,
        chest_id: thingChestRopo.chest_id,
        chest_secret: '',
      });
      // assert
      expect(response).toEqual(thingChestRopo);
    });
  });
});
