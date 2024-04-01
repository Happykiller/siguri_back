[back](../tableOfContent.md)
* [Output](#output)
  * [AuthModelResolver](#authmodelresolver-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query getSessionInfo
 
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
query {
  getSessionInfo {
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
    "getSessionInfo": {
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