# MERN

## React Build

`npm run build`

Generate a `dist` folder -> standalone -> deploy

- js file -> React + App
  - App.jsx -> Combine with all the `imports` -> new JS file
    - Combines -> compiles with Babel + Treeshaking (prunes unused stuff)
    - Bundling -> webpack
    - Minification

## Project Planning

Trello

- user stories
- wireframes
  - URL (React Router)
  - Components
    - fetch -> URL, verb
- Data (Google Sheet)
  - 2 Models + User
    - embedded / referencing
  - CRUD?
- Libraries
  - React?
  - CSS?
  - others?

## Sign up

URL for backend? - /api/users [POST] body -> user
Resource - users

## AuthN & AuthZ

## Part2 -> Part 5

### Doing sign-up

Start from React

- Create SignUp Component
  - JSX for the form
  - form -> controlled / uncontrolled/ form submit
- call the user-service -> user-api
  - Call a fetch -> /api/users [POST]

Continue in Express (end result -> user in db)

- link server.js to routes
- create route for /api/users [POST]
- create controller
  - extract body from req
  - create user from the body -> db
- create schema / model for User

### Do list All users

React

- react router route - /users
- create component - AllUsersComponent
  - list - <ul>
  - useEffect() -> users-service (getAllUsers) -> users-api (fetchAllUsers) -> /api/users [GET]

Express

- /api/users -> server.js -> routes/users.js -> GET
- controller.users (index) -> User model -> find() -> res.json()

### Login

React

- route - /login
- Component
  - form with username & password + login button
  - press button -> onClick / form submit
    - users-service()
    - users-api() -> fetch /api/users/login [POST] with body -> { username, password }
    - check response
      - 200 -> setState, navigate
      - 401 -> show error message

Express - bcrypt

- /api/users/login -> server.js -> routes/users -> controller/users (login)
- login() in controllers
  - extract body from req
  - const user = User.findOne({ username})
  - check password (form) with the hash version (user.password) -> if ...
    - pass -> 200 + JWT token
    - fail -> 401

## Secret Stuff [security]

Specific clothes in wardrobe

React??

Before Login

- /wardrobe
- ClothesComponent
  - check user state??
    - no user -> ???

After Login

- click Link in Landing Page -> /wardrobe
- See all the clothes -> ClothesComponent
- fetch (with the JWT token) -> express -> /api/clothes

Express??

check user state?

- yes -> see button -> navigate
- no -> 401??

Database

- make some changes???

## JWT

A.B.C -> A(header) is red, B(payload) is purple, C(signature) is blue

encryption = plaintext -> algo + key -> encrypted text? + decryption

encoding + decoding

JWT verification

hashing

- "simon" -> hashing algo -> AGDJDUJSHDG
- same input -> same output
- diff input -> not have same output
- fast
- one way

## Sign Up -> Create User

React -> fetch [POST] with body { .... }

Express

- /api/users -> controller
- controller
  - extract body from req -> const data = req.body
  - data.password = hash(data.password)
  - User.create(data)

## Wed

password in db is cleartext -> hashing (bcrypt)

use JWT and create the token

- sign -> Create
- verify
