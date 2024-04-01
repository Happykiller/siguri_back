[back](../../tableOfContent.md)


```graphql
input UpdateThingResolverDto {
  thing_id: String!
  label: String!
  description: String
  chest_secret: String!
  cb: CreateThingCbResolverDto
  code: CreateThingCodeResolverDto
  note: CreateThingNoteResolverDto
  credential: CreateThingCredentialResolverDto
  totp: CreateThingTotpResolverDto
}
```
