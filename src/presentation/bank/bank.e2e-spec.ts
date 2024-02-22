import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { ApolloDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '@src/config';
import { USER_ROLE } from '@presentation/guard/userRole';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { BankModule } from '@presentation/bank/bank.module';
import { JwtStrategy } from '@presentation/auth/jwt.strategy';
import { bankRopo } from '../../service/db/fake/mock/bank.ropo';

describe('BankResolver (e2e)', () => {
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
        BankModule,
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

  it('create_bank', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `mutation {
          create_bank (
            dto: {
              label: "test"
              description: "description"
              secret: "secret"
            }
          ) {
            id
            label
            description
            author_id
            author {
              id
              code
            }
            members {
              user_id
              user {
                id
                code
              }
            }
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.create_bank;
        expect(data.id).toBeDefined();
      })
      .expect(200);
  });

  it('bank', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          bank (
            dto: {
              id: "65d4d015261e894a1da31a65"
              secret: "secret"
            }
          ) {
            id
            label
            description
            author_id
            author {
              id
              code
            }
            members {
              user_id
              user {
                id
                code
              }
            }
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.bank;
        expect(data.id).toEqual(bankRopo.id);
      })
      .expect(200);
  });

  it('banksForUser', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          banksForUser {
            id
            label
            description
            author_id
            author {
              id
              code
            }
            members {
              user_id
              user {
                id
                code
              }
            }
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.banksForUser;
        expect(data[0].id).toEqual(bankRopo.id);
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
