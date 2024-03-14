import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { ERRORS } from '@src/common/ERROR';
import { TYPE_THING } from '@src/common/TYPE_THING';
import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { chestRopo } from '@service/db/fake/mock/chest.ropo';
import { EncodeService } from '@service/encode/encode.service';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { GetThingUsecase } from '@usecase/thing/get.thing.usecase';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';
import { IsAutorizedUsecase } from '@usecase/isAuthorized/isAuthorized.usecase';

describe('GetThingUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockEncodeService: MockProxy<EncodeService> = mock<EncodeService>();
  const mockIsAutorizedUsecase: MockProxy<IsAutorizedUsecase> =
    mock<IsAutorizedUsecase>();

  mockInversify.bddService = mockBddService;
  mockInversify.encodeService = mockEncodeService;
  mockInversify.isAutorizedUsecase = mockIsAutorizedUsecase;

  const usecase: GetThingUsecase = new GetThingUsecase(mockInversify);

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get a thing credential', async () => {
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
          crypto: '000'
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getThing.mockResolvedValue(thing);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        thing_id: thing.id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual(thing);
    });

    it('should get a thing NOTE', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: '65d4d015261e894a1da31a63',
        label: 'note',
        description: 'note',
        type: TYPE_THING.NOTE,
        note: {
          note: 'note'
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getThing.mockResolvedValue(thing);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        thing_id: thing.id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual(thing);
    });

    it('should get a thing CODE', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: '65d4d015261e894a1da31a63',
        label: 'code',
        description: 'code',
        type: TYPE_THING.CODE,
        code: {
          code: 'code'
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getThing.mockResolvedValue(thing);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        thing_id: thing.id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual(thing);
    });

    it('should get a thing TOTP', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: '65d4d015261e894a1da31a63',
        label: 'totp',
        description: 'totp',
        type: TYPE_THING.TOTP,
        totp: {
          secret: 'sdqsdqsd'
        },
        author_id: userRopo.id,
        chest_id: chestRopo.id,
        active: true,
      };
      mockBddService.getThing.mockResolvedValue(thing);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        thing_id: thing.id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual(thing);
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
