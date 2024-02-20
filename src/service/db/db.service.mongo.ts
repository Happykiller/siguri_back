import * as mongoDB from "mongodb";

import { Db, MongoClient } from "mongodb";

import { BddService } from "@service/db/db.service";
import { UserDbModel } from "@service/db/model/user.db.model";
import { CreateUserDbDto } from "./dto/create.user.db.dto";

export const collections: { games?: mongoDB.Collection } = {}

export class BddServiceMongo implements BddService {

  DB_CONN_STRING="mongodb://root:password@localhost:27017/"
  DB_NAME="siguri"
  client: MongoClient
  db: Db

  constructor() {
    this.client = new mongoDB.MongoClient(this.DB_CONN_STRING);
  }

  async initConnection() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.DB_NAME);
      console.log(`Successfully connected to database: ${this.db.databaseName}`);
    }
  }

  async test(): Promise<boolean> {
    await this.initConnection();
    return Promise.resolve(true);
  }
  
  async getAllUser(): Promise<UserDbModel[]> {
    await this.initConnection();
    const usersCollection = this.db.collection("users");

    // Query for a movie that has the title 'The Room'
    const query = {};
    const options = {};
    // Execute query
    const results = usersCollection.find(query, options);

    const users:UserDbModel[] = [];
    // Print returned documents
    for await (const doc of results) {
      users.push({
        code: doc.code
      })
    }

    return users;
  }

  async createUser(dto: CreateUserDbDto): Promise<UserDbModel> {
    await this.initConnection();
    const usersCollection = this.db.collection("users");

    const result = await usersCollection.insertOne(dto);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    return Promise.resolve(dto);
  }
}