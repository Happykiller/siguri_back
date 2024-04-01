[back](../tableOfContent.md)
* [Output](#output)
  * [[PasskeyResolverModel]](#[passkeyresolvermodel]-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query passkeys_for_user
 
## Output
### [[PasskeyResolverModel]](../assets/types/passkeyresolvermodel.md) `optionable: false`
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
query {
  passkeys_for_user {
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
    "passkeys_for_user": [
      {
        "id": "Bob",
        "label": "Bob",
        "user_id": "Bob",
        "hostname": "Bob",
        "user_code": "Bob",
        "challenge": "Bob",
        "credential_id": "Bob"
      }
    ]
  }
}
```