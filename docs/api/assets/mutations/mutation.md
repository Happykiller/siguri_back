[back](../../tableOfContent.md)


```graphql
type Mutation {
  create_user(dto: CreateUserResolverDto!): UserModelResolver!
  update_password(dto: UpdPasswordAuthResolverDto!): AuthModelResolver!
  create_thing(dto: CreateThingResolverDto!): ThingModelResolver!
  update_thing(dto: UpdateThingResolverDto!): ThingModelResolver!
  delete_thing(dto: DeleteThingResolverDto!): ThingModelResolver
  create_chest(dto: CreateChestResolverDto!): ChestModelResolver!
  update_chest(dto: UpdateChestResolverDto!): ChestModelResolver!
  join_chest(dto: JoinChestResolverDto!): ChestModelResolver
  leave_chest(dto: LeaveChestResolverDto!): ChestModelResolver
  create_passkey(dto: CreatePasskeyResolverDto!): PasskeyResolverModel!
  delete_passkey(dto: DeletePasskeyResolverDto!): Boolean!
}
```
