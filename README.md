# Bonanza app: Improve your well-being (Back-end)

## **Endpoints**

- POST ('user/register/'): Register a new user to the database
- POST ('user/login/'): Login a user to the network, delivering a token
- GET ('diary/entries?startDate=X&endDate=Y&page=X&perPage=Y'): Obtain a complete list of the user's entries, with optional parameters of date filters and pagination
- DELETE ('diary/delete): Delete diary entry from database
- POST ('diary/): Post new entry to database
- PATCH ('diary/edit/:entryId): Edit diary entry from database
- GET ('diary/byId/:entryId'): Get detailed information for pageId
- GET ('diary/detail/:id'): Obtain detailed information of entry

## **Database structure**

- Users<br>
  `[ { username: string , password: string, name: string },... ]`
- Entries<br>
  `{id: objectId, username: string, date: Date, positiveEmotion: number, engagement: number, relationships: number, meaning: number, accomplishments: number, vitality: number, wellBeing: number, commentary: string, image: string, backup: string}`
- Content<br>
  `{home: string, p: string, e: string, r: string, m: string, a: string}`
