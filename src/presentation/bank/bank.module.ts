import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { BankResolver } from '@presentation/bank/bank.resolver';
import { BankMemberResolver } from '@presentation/bank/bankMember.resolver';

@Module({
  imports: [],
  providers: [
    BankResolver,
    BankMemberResolver,
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class BankModule {}
