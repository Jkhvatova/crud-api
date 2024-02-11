//import { UUID, randomUUID } from 'crypto';
import { v4 as uuid } from "uuid";
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
// In-memory database
type User = {
  id: string | typeof uuid,
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
  if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(USERS_DB));
  } else if (req.url?.startsWith('/api/users/') && req.method === 'GET') {
    const id: string = req.url.split('/')[3];
    const user = USERS_DB.find(user => user.id === id);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user not found' }));
    }
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});