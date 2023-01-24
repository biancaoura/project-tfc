import ILogin from '../../interfaces/ILogin';
import IUser from '../../interfaces/IUser';

export const validUser: IUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

export const validLogin: ILogin = {
  email: 'user@user.com',
  password: 'secret_user',
};

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjc0NTIyMTI0LCJleHAiOjE2NzUxMjY5MjR9.jf5_kwuqIqk_oIZSOrfH0ll0HFf6Sh6bQJnWZSU9SPY';

export const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiaW52YWxpZCIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjc0NTIzODI3LCJleHAiOjE2NzUxMjg2Mjd9.PL30oIZIZRUTrZXOva6G4Zyf89Cc0ywOdDejRQf986w';