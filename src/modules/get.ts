import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { USERS_DB, ENDPOINT } from '../helpers/constants';
export function getUser(req: IncomingMessage, res: ServerResponse) {
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
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Oops, this route does not exist!' }));  }
}