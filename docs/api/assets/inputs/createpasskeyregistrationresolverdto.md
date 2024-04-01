[back](../../tableOfContent.md)


```graphql
input CreatePasskeyRegistrationResolverDto {
  username: String!
  credential: CreatePasskeyRegistrationCredentialResolverDto!
  authenticatorData: String!
  clientData: String!
  attestationData: String!
}
```
