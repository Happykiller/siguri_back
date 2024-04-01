[back](../tableOfContent.md)
* [Output](#output)
  * [SystemInfoResolverModel](#systeminforesolvermodel-optionable-false)
* [Errors](#errors)
* [Example](#example)
  * [Request](#request)
  * [Response](#response)

# query systemInfo
 
## Output
### [SystemInfoResolverModel](../assets/types/systeminforesolvermodel.md) `optionable: false`
| fields |types |nullable |descriptions |deprecated |
| :----:  |:---:  |:--------:  |:----------:  |:--------:  |
| version |String |false | | 

## Errors
## Example
### Request
```graphql
query {
  systemInfo {
    version
  }
}
```
### Response
```json
{
  "data": {
    "systemInfo": {
      "version": "Bob"
    }
  }
}
```