[back](../../tableOfContent.md)


```graphql
type Query {
  users: [UserModelResolver!]!
  user(dto: GetUserResolverDto!): UserModelResolver!
  auth(dto: AuthAuthResolverDto!): AuthModelResolver!
  auth_passkey(dto: PasskeyAuthResolverDto!): AuthModelResolver!
  getSessionInfo: AuthModelResolver!
  generatePassword(dto: GeneratePasswordResolverDto!): GeneratePasswordModelResolver!
  get_totp_code(dto: GetTotpCodeToolResolverDto!): String!
  thing(dto: GetThingResolverDto!): ThingModelResolver!
  thingsForChest(dto: GetThingsForChestResolverDto!): [ThingModelResolver!]!
  chest(dto: GetChestResolverDto!): ChestModelResolver!
  chestsForUser: [ChestModelResolver!]!
  hello: HelloModelResolver!
  systemInfo: SystemInfoResolverModel!
  passkeys_for_user: [PasskeyResolverModel!]!
}
```
