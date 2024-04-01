[back](../../tableOfContent.md)


```graphql
type ChestModelResolver {
  id: String
  label: String
  description: String
  author_id: String
  members: [ChestMemberModelResolver!]
  author: UserModelResolver!
}
```
