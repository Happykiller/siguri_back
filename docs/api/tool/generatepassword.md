[back](../tableOfContent.md)
* [Input](#input)
  * [GeneratePasswordResolverDto](#generatepasswordresolverdto-optionable-false)
* [Output](#output)
  * [GeneratePasswordModelResolver](#generatepasswordmodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query generatePassword
 
## Input
### [GeneratePasswordResolverDto](../assets/inputs/generatepasswordresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| length |Int |false | | | |
| specials |Boolean |true |true | | 

## Output
### [GeneratePasswordModelResolver](../assets/types/generatepasswordmodelresolver.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| password |String |false | | 

## Errors
## Example
### Request
```graphql
query {
  generatePassword (
    dto: {
      length: 0
      specials: true
    }
  ) {
    password
  }
}
```
### Response
```json
{
  "data": {
    "generatePassword": {
      "password": "Bob"
    }
  }
}
```