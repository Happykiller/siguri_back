import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { ApolloDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '@src/config';
import { USER_ROLE } from '@presentation/guard/userRole';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { chestRopo } from '@service/db/fake/mock/chest.ropo';
import { JwtStrategy } from '@presentation/auth/jwt.strategy';
import { ChestModule } from '@presentation/chest/chest.module';

describe('ChestModule (e2e)', () => {
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
        ChestModule,
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

  it('#create_chest', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `mutation {
          create_chest (
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
        const data = body.data.create_chest;
        expect(data.id).toBeDefined();
      })
      .expect(200);
  });

  it('#chest', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          chest (
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
        const data = body.data.chest;
        expect(data.id).toEqual(chestRopo.id);
      })
      .expect(200);
  });

  it('#chestsForUser', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          chestsForUser {
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
        const data = body.data.chestsForUser;
        expect(data[0].id).toEqual(chestRopo.id);
      })
      .expect(200);
  });

  it('#join_chest', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `mutation {
          join_chest (
            dto: {
              chest_id: "${chestRopo.id}"
            }
          ) {
            id
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.join_chest;
        expect(data).toBeNull();
      })
      .expect(200);
  });

  it('#leave_chest', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `mutation {
          leave_chest (
            dto: {
              chest_id: "${chestRopo.id}"
            }
          ) {
            id
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.leave_chest;
        expect(data).toBeNull();
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
