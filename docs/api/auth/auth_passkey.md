[back](../tableOfContent.md)
* [Input](#input)
  * [PasskeyAuthResolverDto](#passkeyauthresolverdto-optionable-false)
* [Output](#output)
  * [AuthModelResolver](#authmodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query auth_passkey
 
## Input
### [PasskeyAuthResolverDto](../assets/inputs/passkeyauthresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| user_code |String |false | | | |
| credentialId |String |false | | | |
| authenticatorData |String |false | | | |
| clientData |String |false | | | |
| signature |String |false | | | |
| userHandle |String |false | | | 

## Output
### [AuthModelResolver](../assets/types/authmodelresolver.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| access_token |String |false |Session token | |
| id |String |false |Id of the user | |
| code |String |false |Code of the user | |
| name_first |String |false | | |
| name_last |String |false | | |
| description |String |false | | |
| mail |String |false | | |
| role |String |false | | 

## Errors
* `Credentials wrong` Credentials wrong
## Example
### Request
```graphql
query {
  auth_passkey (
    dto: {
      user_code: "Bob"
      credentialId: "Bob"
      authenticatorData: "Bob"
      clientData: "Bob"
      signature: "Bob"
      userHandle: "Bob"
    }
  ) {
    access_token
    id
    code
    name_first
    name_last
    description
    mail
    role
  }
}
```
### Response
```json
{
  "data": {
    "auth_passkey": {
      "access_token": "Bob",
      "id": "Bob",
      "code": "Bob",
      "name_first": "Bob",
      "name_last": "Bob",
      "description": "Bob",
      "mail": "Bob",
      "role": "Bob"
    }
  }
}
```