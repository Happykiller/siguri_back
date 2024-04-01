[back](../tableOfContent.md)
* [Output](#output)
  * [[UserModelResolver]](#[usermodelresolver]-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query users
 
## Output
### [[UserModelResolver]](../assets/types/usermodelresolver.md) `optionable: false`
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
  users {
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
    "users": [
      {
        "id": "Bob",
        "code": "Bob",
        "name_first": "Bob",
        "name_last": "Bob",
        "description": "Bob",
        "mail": "Bob",
        "role": "Bob"
      }
    ]
  }
}
```