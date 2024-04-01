[back](../tableOfContent.md)
* [Input](#input)
  * [GetTotpCodeToolResolverDto](#gettotpcodetoolresolverdto-optionable-false)
* [Output](#output)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query get_totp_code
 
## Input
### [GetTotpCodeToolResolverDto](../assets/inputs/gettotpcodetoolresolverdto.md) `optionable: false`
| fields |types |optionable |default |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:-----:  |:----------:  |:--------:  |
| secret |String |false | | | 

## Output
The output is a **String**
## Errors
## Example
### Request
```graphql
query {
  get_totp_code (
    dto: {
      secret: "Bob"
    }
  )
}
```
### Response
```json
{
  "data": {
    "get_totp_code": "Bob"
  }
}
```