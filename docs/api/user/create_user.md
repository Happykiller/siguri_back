[back](../tableOfContent.md)
* [Input](#input)
  * [CreateUserResolverDto](#createuserresolverdto-optionable-false)
* [Output](#output)
  * [UserModelResolver](#usermodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# mutation create_user
 
## Input
### [CreateUserResolverDto](../assets/inputs/createuserresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| code |String |false | |Code of the user | |
| name_first |String |false | | | |
| name_last |String |false | | | |
| description |String |false | | | |
| mail |String |false | | | |
| password |String |false | | | 

## Output
### [UserModelResolver](../assets/types/usermodelresolver.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| id |String |true | | |
| code |String |true | | |
| name_first |String |true | | |
| name_last |String |true | | |
| description |String |true | | |
| mail |String |true | | |
| role |String |true | | 

## Errors
## Example
### Request
```graphql
mutation {
  create_user (
    dto: {
      code: "Bob"
      name_first: "Bob"
      name_last: "Bob"
      description: "Bob"
      mail: "Bob"
      password: "Bob"
    }
  ) {
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
    "create_user": {
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