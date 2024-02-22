import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { ChestResolver } from '@src/presentation/chest/chest.resolver';
import { ChestMemberResolver } from '@src/presentation/chest/chestMember.resolver';

@Module({
  imports: [],
  providers: [
    ChestResolver,
    ChestMemberResolver,
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class ChestModule {}
