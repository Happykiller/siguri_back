[back](../tableOfContent.md)
* [Input](#input)
  * [UpdPasswordAuthResolverDto](#updpasswordauthresolverdto-optionable-false)
* [Output](#output)
  * [AuthModelResolver](#authmodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# mutation update_password
 
## Input
### [UpdPasswordAuthResolverDto](../assets/inputs/updpasswordauthresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| old_value |String |false | | | |
| new_value |String |false | | | |
| conf_value |String |false | | | 

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
## Example
### Request
```graphql
mutation {
  update_password (
    dto: {
      old_value: "Bob"
      new_value: "Bob"
      conf_value: "Bob"
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
    "update_password": {
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