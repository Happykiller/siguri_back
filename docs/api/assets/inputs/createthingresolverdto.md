[back](../../tableOfContent.md)


```graphql
input CreateThingResolverDto {
  label: String!
  description: String
  chest_id: String!
  chest_secret: String!
  type: String!
  cb: CreateThingCbResolverDto
  code: CreateThingCodeResolverDto
  note: CreateThingNoteResolverDto
  credential: CreateThingCredentialResolverDto
  totp: CreateThingTotpResolverDto
}
```
