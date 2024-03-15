import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { ApolloDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '@src/config';
import { USER_ROLE } from '@presentation/guard/userRole';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { JwtStrategy } from '@presentation/auth/jwt.strategy';
import { ThingModule } from '@presentation/thing/thing.module';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';

describe('ThingResolver (e2e)', () => {
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
        ThingModule,
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

  it('create_thing', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `mutation {
          create_thing (
            dto: {
              label: "thing"
              description: "description"
              chest_id: "${thingChestRopo.chest_id}"
              chest_secret: "secret"
              type: "CREDENTIAL"
              credential: {
                id: "login"
                password: "password"
                address: "http://localhost/"
              }
            }
          ) {
            id
            label
            description
            author {
              id
              code
            }
            chest {
              id
              label
            }
            type
            cb {
              code
              label
              number
              expiration_date
              crypto
            }
            code {
              code
            }
            credential {
              id
              password
              address
            }
            note {
              note
            }
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.create_thing;
        expect(data.id).toBeDefined();
      })
      .expect(200);
  });

  it('thing', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          thing (
            dto: {
              thing_id: "${thingChestRopo.id}"
              chest_secret: "secret"
            }
          ) {
            id
            label
            description
            author {
              id
              code
            }
            chest {
              id
              label
            }
            type
            cb {
              code
              label
              number
              expiration_date
              crypto
            }
            code {
              code
            }
            credential {
              id
              password
              address
            }
            note {
              note
            }
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.thing;
        expect(data.id).toEqual(thingChestRopo.id);
      })
      .expect(200);
  });

  it('thingsForUser', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          thingsForChest (
            dto: {
              chest_id: "${thingChestRopo.chest_id}"
              chest_secret: "secret"
            }
          ) {
            id
            label
            description
            author {
              id
              code
            }
            chest {
              id
              label
            }
            type
            cb {
              code
              label
              number
              expiration_date
              crypto
            }
            code {
              code
            }
            credential {
              id
              password
              address
            }
            note {
              note
            }
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.thingsForChest;
        expect(data[0].id).toEqual(thingChestRopo.id);
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
