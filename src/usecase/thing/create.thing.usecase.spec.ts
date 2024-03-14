import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { EncodeService } from '@service/encode/encode.service';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';
import { CreateThingUsecase } from '@usecase/thing/create.thing.usecase';
import { ThingDbModel } from '../../service/db/model/thing.db.model';
import { TYPE_THING } from '../../common/TYPE_THING';
import { userRopo } from '../../service/db/fake/mock/user.ropo';
import { chestRopo } from '../../service/db/fake/mock/chest.ropo';

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

    it('should create a thing cb', async () => {
      // arrange
      const thing: ThingDbModel = {
        id: thingChestRopo.id,
        label: thingChestRopo.label,
        description: thingChestRopo.description,
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
      mockBddService.createThing.mockResolvedValue(thing);
      mockEncodeService.encode.mockImplementation((dto) => dto.message);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        label: thingChestRopo.label,
        description: thingChestRopo.description,
        type: TYPE_THING.CB,
        cb: {
          label: 'test',
          number: '12345678899',
          expiration_date: '05/12',
          code: '1234',
          crypto: '000'
        },
        user_id: thingChestRopo.author_id,
        chest_id: thingChestRopo.chest_id,
        chest_secret: '',
      });
      // assert
      expect(response).toEqual(thing);
    });
  });

  it('should create a thing note', async () => {
    // arrange
    const thing: ThingDbModel = {
      id: thingChestRopo.id,
      label: thingChestRopo.label,
      description: thingChestRopo.description,
      type: TYPE_THING.NOTE,
      note: {
        note: 'note'
      },
      author_id: userRopo.id,
      chest_id: chestRopo.id,
      active: true,
    };
    mockBddService.createThing.mockResolvedValue(thing);
    mockEncodeService.encode.mockImplementation((dto) => dto.message);
    mockEncodeService.decode.mockImplementation((dto) => dto.message);
    // act
    const response = await usecase.execute({
      label: thingChestRopo.label,
      description: thingChestRopo.description,
      type: TYPE_THING.NOTE,
      note: {
        note: 'note'
      },
      user_id: thingChestRopo.author_id,
      chest_id: thingChestRopo.chest_id,
      chest_secret: '',
    });
    // assert
    expect(response).toEqual(thing);
  });

  it('should create a thing code', async () => {
    // arrange
    const thing: ThingDbModel = {
      id: thingChestRopo.id,
      label: thingChestRopo.label,
      description: thingChestRopo.description,
      type: TYPE_THING.CODE,
      code: {
        code: 'code'
      },
      author_id: userRopo.id,
      chest_id: chestRopo.id,
      active: true,
    };
    mockBddService.createThing.mockResolvedValue(thing);
    mockEncodeService.encode.mockImplementation((dto) => dto.message);
    mockEncodeService.decode.mockImplementation((dto) => dto.message);
    // act
    const response = await usecase.execute({
      label: thingChestRopo.label,
      description: thingChestRopo.description,
      type: TYPE_THING.CODE,
      code: {
        code: 'code'
      },
      user_id: thingChestRopo.author_id,
      chest_id: thingChestRopo.chest_id,
      chest_secret: '',
    });
    // assert
    expect(response).toEqual(thing);
  });

  it('should create a thing TOTP', async () => {
    // arrange
    const thing: ThingDbModel = {
      id: thingChestRopo.id,
      label: thingChestRopo.label,
      description: thingChestRopo.description,
      type: TYPE_THING.TOTP,
      totp: {
        secret: 'dfsdf'
      },
      author_id: userRopo.id,
      chest_id: chestRopo.id,
      active: true,
    };
    mockBddService.createThing.mockResolvedValue(thing);
    mockEncodeService.encode.mockImplementation((dto) => dto.message);
    mockEncodeService.decode.mockImplementation((dto) => dto.message);
    // act
    const response = await usecase.execute({
      label: thingChestRopo.label,
      description: thingChestRopo.description,
      type: TYPE_THING.TOTP,
      totp: {
        secret: 'dfsdf'
      },
      user_id: thingChestRopo.author_id,
      chest_id: thingChestRopo.chest_id,
      chest_secret: '',
    });
    // assert
    expect(response).toEqual(thing);
  });

});
