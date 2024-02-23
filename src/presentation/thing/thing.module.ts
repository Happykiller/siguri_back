import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { ThingResolver } from '@presentation/thing/thing.resolver';

@Module({
  imports: [],
  providers: [
    ThingResolver,
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class ThingModule {}
