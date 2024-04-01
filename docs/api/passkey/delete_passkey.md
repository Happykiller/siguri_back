[back](../tableOfContent.md)
* [Input](#input)
  * [DeletePasskeyResolverDto](#deletepasskeyresolverdto-optionable-false)
* [Output](#output)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# mutation delete_passkey
 
## Input
### [DeletePasskeyResolverDto](../assets/inputs/deletepasskeyresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| passkey_id |String |false | | | 

## Output
The output is a **Boolean**
## Errors
## Example
### Request
```graphql
mutation {
  delete_passkey (
    dto: {
      passkey_id: "Bob"
    }
  )
}
```
### Response
```json
{
  "data": {
    "delete_passkey": true
  }
}
```