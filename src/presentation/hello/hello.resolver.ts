import { Query, Resolver } from '@nestjs/graphql';
import { HelloModelResolver } from './model/hello.resolver.model';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => HelloModelResolver)
export class HelloResolver {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => HelloModelResolver)
  async hello(): Promise<HelloModelResolver> {
    return {
      message: 'Hello World',
    };
  }
}
