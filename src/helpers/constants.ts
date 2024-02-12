export type User = {
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>,
}
export const USERS_DB: User[] = [
];
// API endpoints
export const ENDPOINT = {
  users: '/api/users',
}
console.log(ENDPOINT.users.split('/')[3]);