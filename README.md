# crud-api

#### How to run this app
To run this app you should perform the following commands in your IDE's terminal:
1. git clone https://github.com/Jkhvatova/crud-api.git
2. git checkout develop
3. npm i

Then you should rename .env.example file to .env

3. npm run start:dev

After this you will see message with port used in your terminal.

#### How to use this app

You can use PostMan to manipulate in-memory database.

PORT is the number of the current port, used by app (for example, http://localhost:4000).

1. to GET all users:
```
GET http://localhost:PORT/api/users
```
2. to GET user with id (id must be a valid uuid):
```
GET http://localhost:PORT/api/users/id
```
3. to POST user to database you should enter user's data object in a raw format to body, name, age and hobbies (an array of strings) are required fields
{"username": "Mary", "age": 3, "hobbies": ["eat", "sleep"]}

```
POST http://localhost:PORT/api/users
```

4. to PUT user data you should get user with id (id must be a valid uuid), then put changed object to raw body {"username": "Mary", "age": 23, "hobbies": ["eat", "sleep", "work"]}:
```
GET http://localhost:PORT/api/users/id
```

4. to DELETE user from database you should get user with id (id must be a valid uuid):
```
DELETE http://localhost:PORT/api/users/id
```

#### How to test this app

npm run test