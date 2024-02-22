import { GetChestResolverDto } from '@src/presentation/chest/dto/get.chest.resolver.dto';

export interface GetChestUsecaseDto extends GetChestResolverDto {
  user_id: string;
}
