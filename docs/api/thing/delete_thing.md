[back](../tableOfContent.md)
* [Input](#input)
  * [DeleteThingResolverDto](#deletethingresolverdto-optionable-false)
* [Output](#output)
  * [ThingModelResolver](#thingmodelresolver-optionable-true)
  * [ThingCbResolverModel](#thingcbresolvermodel-optionable-true)
  * [ThingCodeResolverModel](#thingcoderesolvermodel-optionable-true)
  * [ThingCredentialResolverModel](#thingcredentialresolvermodel-optionable-true)
  * [ThingNoteResolverModel](#thingnoteresolvermodel-optionable-true)
  * [ThingTotpResolverModel](#thingtotpresolvermodel-optionable-true)
  * [UserModelResolver](#usermodelresolver-optionable-false)
  * [ChestModelResolver](#chestmodelresolver-optionable-false)
  * [[ChestMemberModelResolver]](#[chestmembermodelresolver]-optionable-true)
  * [UserModelResolver](#usermodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# mutation delete_thing
 
## Input
### [DeleteThingResolverDto](../assets/inputs/deletethingresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| thing_id |String |false | | | |
| chest_secret |String |false | | | 

## Output
### [ThingModelResolver](../assets/types/thingmodelresolver.md) `optionable: true`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| id |String |true | | |
| label |String |true | | |
| description |String |true | | |
| author_id |String |true | | |
| chest_id |String |true | | |
| type |String |true | | |
| cb |[ThingCbResolverModel](../assets/types/thingcbresolvermodel.md) |true | | |
| code |[ThingCodeResolverModel](../assets/types/thingcoderesolvermodel.md) |true | | |
| credential |[ThingCredentialResolverModel](../assets/types/thingcredentialresolvermodel.md) |true | | |
| note |[ThingNoteResolverModel](../assets/types/thingnoteresolvermodel.md) |true | | |
| totp |[ThingTotpResolverModel](../assets/types/thingtotpresolvermodel.md) |true | | |
| author |[UserModelResolver](../assets/types/usermodelresolver.md) |false | | |
| chest |[ChestModelResolver](../assets/types/chestmodelresolver.md) |false | | 
### [ThingCbResolverModel](../assets/types/thingcbresolvermodel.md) `optionable: true`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| code |String |false | | |
| label |String |false | | |
| number |String |false | | |
| expiration_date |String |false | | |
| crypto |String |false | | 
### [ThingCodeResolverModel](../assets/types/thingcoderesolvermodel.md) `optionable: true`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| code |String |false | | 
### [ThingCredentialResolverModel](../assets/types/thingcredentialresolvermodel.md) `optionable: true`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| id |String |false | | |
| password |String |false | | |
| address |String |true | | 
### [ThingNoteResolverModel](../assets/types/thingnoteresolvermodel.md) `optionable: true`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| note |String |false | | 
### [ThingTotpResolverModel](../assets/types/thingtotpresolvermodel.md) `optionable: true`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| secret |String |false | | 
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
| :----:  |:---:  |:--------:  |:----------:  |:--------:  
### [UserModelResolver](../assets/types/usermodelresolver.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  

## Errors
## Example
### Request
```graphql
mutation {
  delete_thing (
    dto: {
      thing_id: "Bob"
      chest_secret: "Bob"
    }
  ) {
    id
    label
    description
    author_id
    chest_id
    type
    cb {
      code
      label
      number
      expiration_date
      crypto
    }
    code {
      code
    }
    credential {
      id
      password
      address
    }
    note {
      note
    }
    totp {
      secret
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
    chest {
      id
      label
      description
      author_id
      members {
        ...
      }
      author {
        ...
      }
    }
  }
}
```
### Response
```json
{
  "data": {
    "delete_thing": {
      "id": "Bob",
      "label": "Bob",
      "description": "Bob",
      "author_id": "Bob",
      "chest_id": "Bob",
      "type": "Bob",
      "cb": {
        "code": "Bob",
        "label": "Bob",
        "number": "Bob",
        "expiration_date": "Bob",
        "crypto": "Bob"
      },
      "code": {
        "code": "Bob"
      },
      "credential": {
        "id": "Bob",
        "password": "Bob",
        "address": "Bob"
      },
      "note": {
        "note": "Bob"
      },
      "totp": {
        "secret": "Bob"
      },
      "author": {
        "id": "Bob",
        "code": "Bob",
        "name_first": "Bob",
        "name_last": "Bob",
        "description": "Bob",
        "mail": "Bob",
        "role": "Bob"
      },
      "chest": {
        "id": "Bob",
        "label": "Bob",
        "description": "Bob",
        "author_id": "Bob",
        "members": [
        {
          ...
        }
        ],
        "author": {
          ...
        }
      }
    }
  }
}
```