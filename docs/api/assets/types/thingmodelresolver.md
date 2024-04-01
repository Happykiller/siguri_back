[back](../../tableOfContent.md)


```graphql
type ThingModelResolver {
  id: String
  label: String
  description: String
  author_id: String
  chest_id: String
  type: String
  cb: ThingCbResolverModel
  code: ThingCodeResolverModel
  credential: ThingCredentialResolverModel
  note: ThingNoteResolverModel
  totp: ThingTotpResolverModel
  author: UserModelResolver!
  chest: ChestModelResolver!
}
```
