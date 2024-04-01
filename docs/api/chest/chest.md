[back](../tableOfContent.md)
* [Input](#input)
  * [GetChestResolverDto](#getchestresolverdto-optionable-false)
* [Output](#output)
  * [ChestModelResolver](#chestmodelresolver-optionable-false)
  * [[ChestMemberModelResolver]](#[chestmembermodelresolver]-optionable-true)
  * [UserModelResolver](#usermodelresolver-optionable-false)
  * [UserModelResolver](#usermodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query chest
 
## Input
### [GetChestResolverDto](../assets/inputs/getchestresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| id |String |false | | | |
| secret |String |false | | | 

## Output
### [ChestModelResolver](../assets/types/chestmodelresolver.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| id |String |true | | |
| label |String |true | | |
| description |String |true | | |
| author_id |String |true | | |
| members |[[ChestMemberModelResolver]](../assets/types/chestmembermodelresolver.md) |true | | |
| author |[UserModelResolver](../assets/types/usermodelresolver.md) |false | | 
### [[ChestMemberModelResolver]](../assets/types/chestmembermodelresolver.md) `optionable: true`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| user_id |String |true | | |
| user |[UserModelResolver](../assets/types/usermodelresolver.md) |false | | 
### [UserModelResolver](../assets/types/usermodelresolver.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  
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
query {
  chest (
    dto: {
      id: "Bob"
      secret: "Bob"
    }
  ) {
    id
    label
    description
    author_id
    members {
      user_id
      user {
        ...
      }
    }
    author {
      id
      code
      name_first
      name_last
      description
      mail
      role
    }
  }
}
```
### Response
```json
{
  "data": {
    "chest": {
      "id": "Bob",
      "label": "Bob",
      "description": "Bob",
      "author_id": "Bob",
      "members": [
      {
        "user_id": "Bob",
        "user": {
          ...
        }
      }
      ],
      "author": {
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
}
```