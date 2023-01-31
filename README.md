# TFC Project

## Summary

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#additional-info">Additional Info</a></li>
  </ol>
</details>

## About The Project

Trybe Futebol Club,

A website that contains information about Brazilian football matches and team rankings.

The services are integrated through `Docker` (frontend, backend and database)


> This is a project developed as part of my studies to help me learn about OOP, SOLID principles and connection between frontend and backend

### Built With

[![TypeScript][TypeScript.io]][TypeScript-url]

[![NodeJS][NodeJS.io]][NodeJS-url]

[![Express][Express.io]][Express-url]

[![JWT][JWT.io]][JWT-url]

[![MySQL][MySQL.io]][MySQL-url]

[![Sequelize][Sequelize.io]][Sequelize-url]

[![Dotenv][Dotenv.io]][Dotenv-url]

[![Jest][Jest.io]][Jest-url]

[![Mocha][Mocha.io]][Mocha-url]

[![Chai][Chai.io]][Chai-url]

[![Docker][Docker.io]][Docker-url]


## Getting Started
To run this project, the use of Docker is required

### Installation

1. Clone the repo
```
  git clone git@github.com:biancaoura/project-tfc.git
```
2. Go to the repository
```
cd project-tfc
```
3. Run the services
```
  npm run compose:up -- --build
```

## Usage

The `npm run compose:up` script will create the database and start the `frontend` and `backend` services.

You can check the website at `localhost:3000/login`
- and test the app using the login:
  - email: `user@user.com`
  - password: `secret_user`

It's possible to:
- create new matches
- edit matches in progress
- finish matches


## Additional Info
- This is a project developed at Trybe

> `frontend`, `seeders` and `docker-compose` files provided by Trybe

[TypeScript.io]: https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
[Express.io]: https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white
[Express-url]: https://expressjs.com
[Sequelize.io]: https://img.shields.io/badge/sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org
[JWT.io]: https://img.shields.io/badge/jwt-000000?style=flat-square&logo=jsonwebtokens&logoColor=white
[JWT-url]: https://jwt.io
[NodeJS.io]: https://img.shields.io/badge/node.js-339933?style=flat-square&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[MySQL.io]: https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com
[Dotenv.io]: https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black
[Dotenv-url]: https://www.dotenv.org
[Jest.io]: https://img.shields.io/badge/jest-C21325?style=flat-square&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io
[Mocha.io]: https://img.shields.io/badge/mocha-8D6748?style=flat-square&logo=mocha&logoColor=white
[Mocha-url]: https://mochajs.org
[Chai.io]: https://img.shields.io/badge/chai-A30701?style=flat-square&logo=chai&logoColor=white
[Chai-url]: https://www.chaijs.com
[Docker.io]: https://img.shields.io/badge/docker-2496ED?style=flat-square&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com
