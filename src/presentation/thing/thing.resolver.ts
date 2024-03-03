import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { USER_ROLE } from '@presentation/guard/userRole';
import { Roles } from '@presentation/guard/roles.decorator';
import { RolesGuard } from '@presentation/guard/roles.guard';
import { GqlAuthGuard } from '@presentation/guard/auth.guard';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { CurrentSession } from '@presentation/guard/userSession.decorator';
import { UserModelResolver } from '@presentation/user/model/user.resolver.model';
import { ThingModelResolver } from '@presentation/thing/model/thing.resolver.model';
import { ChestModelResolver } from '@presentation/chest/model/chest.resolver.model';
import { GetThingResolverDto } from '@presentation/thing/dto/get.thing.resolver.dto';
import { CreateThingResolverDto } from '@presentation/thing/dto/create.thing.resolver.dto';
import { UpdateThingResolverDto } from '@presentation/thing/dto/update.thing.resolver.dto';
import { GetThingsForChestResolverDto } from '@presentation/thing/dto/getForChest.thing.resolver.dto';
import { DeleteThingResolverDto } from './dto/delete.thing.resolver.dto';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => ThingModelResolver)
export class ThingResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  @ResolveField((of) => UserModelResolver)
  async author(
    @Parent() thing: ThingModelResolver,
  ): Promise<UserModelResolver> {
    const user: UserModelResolver = await this.inversify.getUserUsecase.execute(
      {
        id: thing.author_id,
      },
    );
    return user;
  }

  @ResolveField((of) => ChestModelResolver)
  async chest(
    @Parent() thing: ThingModelResolver,
    @CurrentSession() session: UserSession,
  ): Promise<ChestModelResolver> {
    const chest: ChestModelResolver =
      await this.inversify.getChestUsecase.execute({
        id: thing.chest_id,
        user_id: session.id,
      });
    return chest;
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Mutation((returns) => ThingModelResolver)
  async create_thing(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: CreateThingResolverDto,
  ): Promise<ThingModelResolver> {
    return this.inversify.createThingUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Mutation((returns) => ThingModelResolver)
  async update_thing(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: UpdateThingResolverDto,
  ): Promise<ThingModelResolver> {
    return this.inversify.updateThingUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Mutation((returns) => ThingModelResolver, { nullable: true })
  async delete_thing(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: DeleteThingResolverDto,
  ): Promise<boolean> {
    this.inversify.deleteThingUsecase.execute({
      ...dto,
      user_id: session.id,
    });

    return null;
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => ThingModelResolver)
  async thing(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: GetThingResolverDto,
  ): Promise<ThingModelResolver> {
    return this.inversify.getThingUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => [ThingModelResolver])
  async thingsForChest(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: GetThingsForChestResolverDto,
  ): Promise<ThingModelResolver[]> {
    return this.inversify.getThingsForChestUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }
}
