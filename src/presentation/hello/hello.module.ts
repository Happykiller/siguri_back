import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { HelloResolver } from '@presentation/hello/hello.resolver';

@Module({
  imports: [],
  providers: [
    HelloResolver,
    {
      useValue: inversify,
      provide: 'Inversify'
    }
  ],
})
export class HelloModule {}