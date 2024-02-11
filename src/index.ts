
import { v4 as uuidv4 } from 'uuid';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
// In-memory database
type User = {
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>,
}
let USERS_DB: User[] = [
  {id: 'id1', username: 'Mememe Mumumu', age: 20, hobbies: ['music', 'sleep']},
];
// API endpoints
const ENDPOINTS = {
  users: '/api/users',
  user: `/api/users/{userId}`
}
console.log(ENDPOINTS.user.split('/')[3]);

// create server
const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === ENDPOINTS.users && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(USERS_DB));
  } else if (req.url?.startsWith(ENDPOINTS.users) && req.method === 'GET') {
    const id: string = req.url.split('/')[3];
    const user = USERS_DB.find(user => user.id === id);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Oops, I cannot find that user:(' }));
    }
  } else if (req.url === ENDPOINTS.users && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const newUserData: Partial<User> = JSON.parse(body);
      if (!newUserData.username || !newUserData.age || !newUserData.hobbies) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Oops! Request body must contain username, age, and hobbies' }));
      } else {
        newUserData.id = uuidv4();
        const newUser = {
          id: newUserData.id,
          username: newUserData.username,
          age: newUserData.age,
          hobbies: newUserData.hobbies
        }
        USERS_DB.push(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      }

    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Oops, I cannot find that route:(' }));
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});