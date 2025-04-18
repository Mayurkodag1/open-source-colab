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
```

## Portfolio

### Create Portfolio

**Endpoint:** `POST /api/contributor/portfolios`

**Description:** Creates a new portfolio for the logged-in contributor. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "summary": "string",
  "skills": ["string"],
  "projects": "string",
  "socialLinks": {
    "linkedin": "string",
    "github": "string"
  }
}
```

**Response:**

```json
{
  "user": "string",
  "summary": "string",
  "skills": ["string"],
  "projects": "string",
  "socialLinks": {
    "linkedin": "string",
    "github": "string"
  },
  "_id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
}
```

### Get Portfolio

**Endpoint:** `GET /api/contributor/portfolios`

**Description:** Retrieves the portfolio for the logged-in contributor. Requires a valid token in the Authorization header.

**Response:**

```json
{
  "user": "string",
  "summary": "string",
  "skills": ["string"],
  "projects": "string",
  "socialLinks": {
    "linkedin": "string",
    "github": "string"
  },
  "_id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
}
```

### Update Portfolio

**Endpoint:** `PUT /api/contributor/portfolios`

**Description:** Updates the portfolio for the logged-in contributor. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "summary": "string",
  "skills": ["string"],
  "projects": "string",
  "socialLinks": {
    "linkedin": "string",
    "github": "string"
  }
}
```

**Response:**

```json
{
  "user": "string",
  "summary": "string",
  "skills": ["string"],
  "projects": "string",
  "socialLinks": {
    "linkedin": "string",
    "github": "string"
  },
  "_id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
}
```

### Delete Portfolio

**Endpoint:** `DELETE /api/contributor/portfolios`

**Description:** Deletes the portfolio for the logged-in contributor. Requires a valid token in the Authorization header.

**Response:**

```json
{
  "message": "Portfolio deleted successfully"
}