## Contact Management API
a RESTful API that allows users to create, retrieve, update, and delete contact from a MongoDB database.

#### Features:

- Environment, Typescript, Nodemon setup
- MongoDB & Mongoose connect, Database creation
- Controllers creation
- Middlewares creation
- Token based authentication (Bearer)
- Postman testing
- Create, Read, Update Delete (CRUD) operations
- Encrypt and Decrypt phone number

#### Prerequisites

 - *Node version 16.x*

#### Cloning the Repository
clone the Repo 
```bash
git clone git@github.com:sgatana/contact-management-system.git
```
#### Install packages using:
```bash
npm i / npm install
# or
yarn / yarn install
```
## Folder Structure

| dir/file        | description                              |
| :-------------- | :--------------------------------------- |
| `src `          | contains application files               |
| `src/index.ts `     | root file / app configuration               |
| `src/config`    | contains env variables and db connection |
| `src/controllers `          | house all the controllers needed for the application               |
| `src/helpers `          | contains application files               |
| `src/middlewares `          | contains middleware needed for the application               |
| `src/models `          | contains db models and operations               |
| `src/routes `   | contains logical set of routes               |
| `src/schemas `  | contains model schemas               |

#### Routes
API's baseURL is [localhost:8080/v1](http://localhost:8080/v1)
|  Method         |  path           | description                              |
| :-------------- |:--------------| :----------------------------------- |
| POST  | `/auth/login `  |     logs in the user and generates access token          |
| POST  | `/auth/register `  |     register the user          |
| GET  (Authenticated)| `/contacts `  |     list all contacts          |
| POST (Authenticated) | `/contacts `  |     create contacts          |
| GET (Authenticated) | `/contacts/:id `  |     get contact by id          |
| PATCH (Authenticated) | `/contacts/:id `  |     update contact          |
| DELETE (Authenticated)  | `/contacts/:id `  |     deletes contact          |


#### Db connection
Mongo Db connection has been initialized and mongo atlas uri has been provided in the `env.ts` file found in config folder
Read more on how to create and connect to Mongo Atlas [here](https://www.mongodb.com/atlas/database)

Run the development server using:
```bash
npm run dev
# or
yarn dev
```
To run the tests, run `yarn test` or `npm run test`
- An admin user has been created to allow you interact with `protected /users routes`
- Open [http://localhost:8080](http://localhost:8080) on your postman or API platform of your choice 

## Test account
- use the following admin user details to log in and generate bearer token
```
{
    email: admin@gmail.com
    password: admin
}
```
## Endpoints
- Contacts Management endpoints (`v1/contacts`)   
    - contacts management endpoints are protected routes. One need to provide Bearer token in the authorization headers in order to interact with them
    - #### Methods
        Check swagger documentation to see the required payload, path and/or query params

        - POST `v1/contacts`  - Creates contact
        - GET `v1/contacts` - Get all contacts
        - GET `v1/contacts/:id` - Get contact by id
        - PATCH `v1/contacts:/id` - Update a contact
        - DELETE `v1/contacts:/id` - Deletes a contact


- User login endpoints (`v1/auth/login`)   
    - allow user to login and generate access token to be used when interacting with `contact management endpoints`.

        - POST `v1/auth/login`  - Logs in the user and generate access token.

#### Libraries

*N.B check `package.json` file to all packages used by the API*