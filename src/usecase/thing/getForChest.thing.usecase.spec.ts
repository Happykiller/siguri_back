import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { TYPE_THING } from '@src/common/TYPE_THING';
import { Inversify } from '@src/inversify/investify';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { chestRopo } from '@service/db/fake/mock/chest.ropo';
import { EncodeService } from '@service/encode/encode.service';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';
import { IsAutorizedUsecase } from '@usecase/isAuthorized/isAuthorized.usecase';
import { GetThingsForChestUsecase } from '@usecase/thing/getForChest.thing.usecase';

describe('GetThingsForChestUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockEncodeService: MockProxy<EncodeService> = mock<EncodeService>();
  const mockIsAutorizedUsecase: MockProxy<IsAutorizedUsecase> =
    mock<IsAutorizedUsecase>();

  mockInversify.bddService = mockBddService;
  mockInversify.encodeService = mockEncodeService;
  mockInversify.isAutorizedUsecase = mockIsAutorizedUsecase;

  const usecase: GetThingsForChestUsecase = new GetThingsForChestUsecase(
    mockInversify,
  );

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get a things', async () => {
      // arrange
      mockBddService.getForChestThings.mockResolvedValue([thingChestRopo]);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        chest_id: thingChestRopo.chest_id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual([thingChestRopo]);
    });

    it('should get a thing CB', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: '65d4d015261e894a1da31a63',
        label: 'cb',
        description: 'cb',
        type: TYPE_THING.CB,
        cb: {
          label: 'test',
          number: '12345678899',
          expiration_date: '05/12',
          code: '1234',
          crypto: '000',
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getForChestThings.mockResolvedValue([thing]);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        chest_id: thingChestRopo.chest_id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual([thing]);
    });

    it('should get a thing NOTE', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: '65d4d015261e894a1da31a63',
        label: 'note',
        description: 'note',
        type: TYPE_THING.NOTE,
        note: {
          note: 'note',
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getForChestThings.mockResolvedValue([thing]);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        chest_id: thingChestRopo.chest_id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual([thing]);
    });

    it('should get a thing CODE', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: '65d4d015261e894a1da31a63',
        label: 'code',
        description: 'code',
        type: TYPE_THING.CODE,
        code: {
          code: 'code',
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getForChestThings.mockResolvedValue([thing]);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        chest_id: thingChestRopo.chest_id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual([thing]);
    });

    it('should get a thing TOTP', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: '65d4d015261e894a1da31a63',
        label: 'totp',
        description: 'totp',
        type: TYPE_THING.TOTP,
        totp: {
          secret: 'sdqsdqsd',
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getForChestThings.mockResolvedValue([thing]);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        chest_id: thingChestRopo.chest_id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual([thing]);
    });
  });
});
