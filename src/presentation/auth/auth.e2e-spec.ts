import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { ApolloDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '@src/config';
import { USER_ROLE } from '@presentation/guard/userRole';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { AuthModule } from '@presentation/auth/auth.module';
import { JwtStrategy } from '@presentation/auth/jwt.strategy';

describe('AuthResolver (e2e)', () => {
  let app: NestApplication;
  const token: string = jwt.sign(
    {
      id: userRopo.id,
      code: userRopo.code,
      role: USER_ROLE.USER,
    },
    config.jwt.secret,
    {
      expiresIn: '24h', // expires in 24 hours
    },
  );
  const authorization: string = 'Bearer ' + token;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
      imports: [
        AuthModule,
        GraphQLModule.forRoot({
          autoSchemaFile: true,
          driver: ApolloDriver,
          context: ({ req, res }) => {
            return { req, res };
          },
        }),
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('auth', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          auth(
              dto: {
                login: "ropo"
                password: "password"
              }
          ){
            access_token
            id
            code
            name_first
            name_last
            description
            mail
          }
        }`,
      })
      .expect(({ body }) => {
        const data = body.data.auth;
        expect(data.id).toEqual('65d4d015261e894a1da31a64');
      })
      .expect(200);
  });

  it('getSessionInfo', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          getSessionInfo {
            access_token
            id
            code
            name_first
            name_last
            description
            mail
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.getSessionInfo;
        expect(data.id).toEqual('65d4d015261e894a1da31a64');
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
