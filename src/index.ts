import * as dotenv from 'dotenv';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

// Load env variables
dotenv.config();

// In-memory database
type User = {
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>,
}
const USERS_DB: User[] = [
];
// API endpoints
const ENDPOINTS = {
  users: '/api/users',
}

// create server
const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === ENDPOINTS.users && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(USERS_DB));
  } else if (req.url?.startsWith(ENDPOINTS.users) && req.method === 'GET') {
    const id: string = req.url.split('/')[3];
    if (!uuidValidate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Ooops! UserId is invalid (not uuid)' }));
    } else {
      const user = USERS_DB.find(user => user.id === id);
      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Oops, User with the provided userId does not exist!' }));
      }
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
  } else if (req.url?.startsWith(ENDPOINTS.users) && req.method === 'PUT') {
    const id: string = req.url.split('/')[3];
    if (!uuidValidate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Ooops! UserId is invalid (not uuid)' }));
    } else {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const updatedUserData: Partial<User> = JSON.parse(body);
        const userIndex = USERS_DB.findIndex(user => user.id === id);
        if (userIndex === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Oops, User with the provided userId does not exist!' }));
        } else {
          const updatedUser = { ...USERS_DB[userIndex], ...updatedUserData };
          USERS_DB[userIndex] = updatedUser;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedUser));
        }
      });
  }
} else if (req.url?.startsWith(ENDPOINTS.users) && req.method === 'DELETE') {
  const id: string = req.url.split('/')[3];
  if (!uuidValidate(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Ooops! UserId is invalid (not uuid)' }));
  } else {
    const userIndex = USERS_DB.findIndex(user => user.id === id);
    if (userIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Oops, User with the provided userId does not exist!' }));
    } else {
      USERS_DB.splice(userIndex, 1);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  }
} else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Oops, this route does not exist!' }));
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});