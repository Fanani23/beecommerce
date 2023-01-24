# Seed Ecommerce App - Backend

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Demo]
  - [x] [API Reference - Users](#api-reference---users)
  - [ ] [API Reference - Message](#api-reference---message)
- [Related Project](#related-project)
- [Contact](#contact)

## About The Project

Seed Ecommerce App is web base application used to buy or sell some products as marketplace. User as seller can add, edit, and delete product as user want it. And user as customer can view and buy some product what user like. This application built with Node JS and React JS as frontend framework.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Fanani23/beecommerce.git
```

Go to the project directory

```bash
  cd beecommerceapp
```

Install dependencies

```bash
  npm install
```

Setup .env copy from .env.example

```bash
  DB_USER=
  DB_HOST=
  DB_NAME=
  DB_PASS=
  DB_PORT=

  JWT_KEY=
  PORT=

  MAIL_USERNAME=
  MAIL_PASSWORD=

  OAUTH_CLIENTID=
  OAUTH_CLIENT_SECRET=
  OAUTH_REFRESH_TOKEN=

  PHOTO_CLOUD_NAME=
  PHOTO_KEY=
  PHOTO_SECRET=
```

Start the server

```bash
  npm run dev
```

## Demo

API deploy

```bash
https://beecommerce-tan.vercel.app/
```

## API Reference - Users

<details>
<summary>Show</summary>
<br>

#### Register

```
  POST /users/register
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `name`     | `string` | **Required**. name              |
| `email`    | `string` | **Required**. with format email |
| `password` | `string` | **Required**. password          |

#### Login

```
  POST /users/login
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `password` | `string` | **Required**. password          |

#### Verification

```
  GET /users/verification
```

</details>

#### Edit profile user

```
  PUT /users/profile
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field   | Type     | Description         |
| :------ | :------- | :------------------ |
| `name`  | `string` | **Required**. name  |
| `email` | `string` | **Required**. city  |
| `photo` | `file`   | **Required**. photo |

#### Get profile

```
  GET /users/profile
```

</details>

#### Forgot password

```
  POST /users/forgot-password
```

</details>

#### Reset password

```
  POST /users/reset-password/:token
```

</details>

#### Post product

```
  POST /products
```

</details>

#### Get products

```
  GET /products
```

</details>

#### Get product detail

```
  GET /products/detail/:id
```

</details>

#### Edit products

```
  PUT /products/:id
```

</details>

#### Delete products

```
  DELETE /products/:id
```

</details>

#### Archive product

```
  PUT /products/archive/:id
```

</details>

#### Arctivate product

```
  PUT /products/activate/:id
```

</details>

#### Get archive product

```
  GET /products/archive/
```

</details>

#### Get sold product

```
  GET /products/sold
```

</details>

#### Create order

```
  POST /orders
```

</details>

#### Edit status order

```
  PUT /status:/id
```

</details>

#### Get order

```
  Get /orders
```

</details>

#### Get order seller

```
  GET /orders/seller
```

</details>

#### Get detail order

```
  GET /orders/detail/:id
```

</details>

#### Create bag (cart)

```
  POST /bag
```

</details>

#### Get bag (cart)

```
  GET /bag
```

</details>

#### Delete bag (cart)

```
  DELETE /bag/delete/:id
```

</details>

#### Delete bag (cart) all

```
  DELETE /bag/delete/all
```

</details>

## Related Project

- [`Backend Project Telegram `](https://github.com/Fanani23/beecommerce)
- [`REST API Telegram`](https://beecommerce-tan.vercel.app/)

## Contact

Contributors names and contact info Fullstack Developers

- Pramudia Syahrul Fanani [@imoody](https://github.com/Fanani23/)
