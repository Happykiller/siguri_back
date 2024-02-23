import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { ChestResolver } from '@presentation/chest/chest.resolver';
import { ChestMemberResolver } from '@presentation/chest/chestMember.resolver';

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
