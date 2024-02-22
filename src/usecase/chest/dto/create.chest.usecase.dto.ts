import { CreateChestResolverDto } from '@src/presentation/chest/dto/create.chest.resolver.dto';

export interface CreateChestUsecaseDto extends CreateChestResolverDto {
  user_id: string;
}
