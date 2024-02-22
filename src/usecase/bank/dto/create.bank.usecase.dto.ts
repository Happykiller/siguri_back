import { CreateBankResolverDto } from '@presentation/bank/dto/create.bank.resolver.dto';

export interface CreateBankUsecaseDto extends CreateBankResolverDto {
  user_id: string;
}
