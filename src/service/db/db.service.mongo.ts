import * as mongoDB from 'mongodb';

import { Collection, Db, MongoClient } from 'mongodb';

import { BddService } from '@service/db/db.service';
import { UserDbModel } from '@service/db/model/user.db.model';
import { CreateUserDbDto } from '@service/db/dto/create.user.db.dto';
import inversify, { Inversify } from '@src/inversify/investify';

export const collections: { games?: mongoDB.Collection } = {}

export class BddServiceMongo implements BddService {

  DB_CONN_STRING='mongodb://root:password@localhost:27017/'
  DB_NAME='siguri'
  client: MongoClient
  db: Db
  inversify: Inversify;

  constructor(
    inversify: Inversify
  ) {
    this.client = new mongoDB.MongoClient(this.DB_CONN_STRING);
    this.inversify = inversify;
  }

  async initConnection() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.DB_NAME);
      this.inversify.loggerService.log('info', `Successfully connected to database: ${this.db.databaseName}`);
    }
  }

  async getUsersCollection(): Promise<Collection> {
    await this.initConnection();
    return this.db.collection('users');
  }

  async test(): Promise<boolean> {
    await this.initConnection();
    return Promise.resolve(true);
  }
  
  async getAllUser(): Promise<UserDbModel[]> {
    // Query for a movie that has the title 'The Room'
    const query = {};
    const options = {};
    // Execute query
    const results = (await this.getUsersCollection()).find(query, options);

    const users:UserDbModel[] = [];
    // Print returned documents
    for await (const doc of results) {
      users.push({
        id: doc._id.toString(),
        code: doc.code,
        password: doc.password,
        name_first: doc.name_first,
        name_last: doc.name_last,
        description: doc.description,
        mail: doc.mail,
        role: doc.role
      })
    }

    return users;
  }

  async createUser(dto: CreateUserDbDto): Promise<UserDbModel> {
    const result = await (await this.getUsersCollection()).insertOne({
      ... dto,
      role: 'USER',
    });

    return Promise.resolve({
      id: result.insertedId.toString(),
      ... dto,
      role: 'USER'
    });
  }
}