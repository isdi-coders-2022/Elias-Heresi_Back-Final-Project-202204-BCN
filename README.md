# Bonanza app: Improve your well-being (Back-end)

## **Endpoints**

- POST ('users/register/'): Register a new user to the database
- POST ('users/login/'): Login a user to the network, delivering a token
- GET ('diary/'): Obtain a complete list of the user's entries
- GET ('diary/?page=X?perPage=Y'): Obtain a Y entries, of X page number of the user's entries
- GET ('diary/?startDate=X?endDate=Y'): Obtain entries between X and Y dates
- GET ('diary/detail/:id'): Obtain detailed information of entry
- POST ('diary/): Post new entry to database
- DELETE ('diary/:id): Delete diary entry from database
- PUT ('diary/:id): Edit diary entry from database
- GET ('information/:pageid'): Get detailed information for pageId

## **Database structure**

- Users<br>
  `[ { username: string , password: string, name: string },... ]`
- Diaries<br>
  `[ { username: string , diary: [{id: string, P: number, E: number, R: number, M: number, A: number, wellBeing: number, safety: number, commentary: string}, ...] },...]`
- Content<br>
  `{home: string, p: string, e: string, r: string, m: string, a: string}`
