[back](../tableOfContent.md)
* [Input](#input)
  * [AuthAuthResolverDto](#authauthresolverdto-optionable-false)
* [Output](#output)
  * [AuthModelResolver](#authmodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query auth
 
## Input
### [AuthAuthResolverDto](../assets/inputs/authauthresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| login |String |false | |User code for the session | |
| password |String |false | |Password for the session | 

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
  auth (
    dto: {
      login: "Bob"
      password: "Bob"
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
    "auth": {
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