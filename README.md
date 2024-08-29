# DB: final-project-api

## MVP

- Create user (auth)
- Show all posts (only cards)
- Search posts by Posts Categories and Users (nickname)
- (userLogged?) Create post
- (userLogged?) Delete post
- (userLogged?) Edit my posts details
- (userLogged?) Show all my posts 
- (userLogged?) Show all my liked posts
- (userLogged?) Like other user post
- (userLogged?) Show details of all posts
- (userLogged?) Show details of post and comments asociated
- (userLogged?) Create Comments on posts 
- (userLogged?) Edit my Comments 
- (userLogged?) Delete my Comments 
- (userLogged?) Like other user Comment 


## MODELS

- User
  - Firstname `String` 
  - Lastname `String`
  - Nick `String`
  - Email `String`, unique
  - Birth `Date` 
  - Country `String`
  - Phone `Number`
  - Avatar `String`

- Post
  - Owner `ObjectId`, required
  - Images `[String]`
  - Description `String`
  - Date `Date` 
  - Comments `[ObjectIds]`
  - Categories `[String]`, enum
  - Likes `[ObjectId]`

- Comment
  - Owner `ObjectId`, required
  - Post `ObjectId`, required
  - Text `String`
  - Likes `[ObjectId]`


