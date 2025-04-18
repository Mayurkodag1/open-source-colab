# API Documentation


## Authentication

### Contributor Registration

**Endpoint:** `POST /api/auth/contributor/register`

**Description:** Registers a new contributor user.

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**Response:**

```json
{
  "token": "string"
}
```

### Contributor Login

**Endpoint:** `POST /api/auth/contributor/login`

**Description:** Logs in an existing contributor user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "string"
}
```

### Maintainer Registration

**Endpoint:** `POST /api/auth/maintainer/register`

**Description:** Registers a new maintainer user.

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**Response:**

```json
{
  "token": "string"
}
```

### Maintainer Login

**Endpoint:** `POST /api/auth/maintainer/login`

**Description:** Logs in an existing maintainer user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "string"
}