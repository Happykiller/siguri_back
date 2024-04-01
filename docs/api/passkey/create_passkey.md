[back](../tableOfContent.md)
* [Input](#input)
  * [CreatePasskeyResolverDto](#createpasskeyresolverdto-optionable-false)
  * [CreatePasskeyRegistrationResolverDto](#createpasskeyregistrationresolverdto-optionable-false)
  * [CreatePasskeyRegistrationCredentialResolverDto](#createpasskeyregistrationcredentialresolverdto-optionable-false)
* [Output](#output)
  * [PasskeyResolverModel](#passkeyresolvermodel-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# mutation create_passkey
 
## Input
### [CreatePasskeyResolverDto](../assets/inputs/createpasskeyresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| label |String |false | | | |
| hostname |String |false | | | |
| challenge |String |false | | | |
| registration |[CreatePasskeyRegistrationResolverDto](../assets/inputs/createpasskeyregistrationresolverdto.md) |false | | | 
### [CreatePasskeyRegistrationResolverDto](../assets/inputs/createpasskeyregistrationresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| username |String |false | | | |
| credential |[CreatePasskeyRegistrationCredentialResolverDto](../assets/inputs/createpasskeyregistrationcredentialresolverdto.md) |false | | | |
| authenticatorData |String |false | | | |
| clientData |String |false | | | |
| attestationData |String |false | | | 
### [CreatePasskeyRegistrationCredentialResolverDto](../assets/inputs/createpasskeyregistrationcredentialresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| id |String |false | | | |
| publicKey |String |false | | | |
| algorithm |String |false | | | 

## Output
### [PasskeyResolverModel](../assets/types/passkeyresolvermodel.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| id |String |false | | |
| label |String |false | | |
| user_id |String |false | | |
| hostname |String |false | | |
| user_code |String |false | | |
| challenge |String |false | | |
| credential_id |String |false | | 

## Errors
## Example
### Request
```graphql
mutation {
  create_passkey (
    dto: {
      label: "Bob"
      hostname: "Bob"
      challenge: "Bob"
      registration: {
        username: "Bob"
        credential: {
          id: "Bob"
          publicKey: "Bob"
          algorithm: "Bob"
        }
        authenticatorData: "Bob"
        clientData: "Bob"
        attestationData: "Bob"
      }
    }
  ) {
    id
    label
    user_id
    hostname
    user_code
    challenge
    credential_id
  }
}
```
### Response
```json
{
  "data": {
    "create_passkey": {
      "id": "Bob",
      "label": "Bob",
      "user_id": "Bob",
      "hostname": "Bob",
      "user_code": "Bob",
      "challenge": "Bob",
      "credential_id": "Bob"
    }
  }
}
```