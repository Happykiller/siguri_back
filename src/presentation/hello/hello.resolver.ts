import { Query, Resolver } from '@nestjs/graphql';
import { HelloModelResolver } from './model/hello.resolver.model';

@Resolver((of) => HelloModelResolver)
export class HelloResolver {
  @Query((returns) => HelloModelResolver)
  async hello(): Promise<HelloModelResolver> {
    return {
      message: 'Hello World',
    };
  }
}
