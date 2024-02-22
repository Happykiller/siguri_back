import { GetBankResolverDto } from '@presentation/bank/dto/get.bank.resolver.dto';

export interface GetBankUsecaseDto extends GetBankResolverDto {
  user_id: string;
}
