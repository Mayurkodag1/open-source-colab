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

### Forgot Password Request

**Endpoint:** `POST /api/auth/forgotpassword`

**Description:** Requests a password reset token to be sent to the user's email. Needs the .env file to be configured with the correct email and password. Check the .env.example file for an example configuration.

**Request Body:**

```json
{
  "email": "string"
}
```

**Response:**

```json
{
  "success": true,
  "data": "Email Sent"
}
```

### Reset Password

**Endpoint:** `PUT /api/auth/resetpassword/:resettoken`

**Description:** Resets the user's password using a valid reset token.

**Request Body:**

```json
{
  "password": "string"
}
```

**Response:**

```json
{
  "success": true,
  "data": "Password reset successful"
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
```

## Project Search (Contributor)

### Search Projects

**Endpoint:** `GET /api/contributor/projects/search`

**Description:** Searches for projects based on keywords and skills. Accessible by Contributors. Requires a valid token in the Authorization header.

**Query Parameters:**

- `keyword`: (Optional) A string to search for in project titles and descriptions.
- `skills`: (Optional) A comma-separated string of skills to filter by.

**Example Request:**

```
GET /api/contributor/projects/search?keyword=react&skills=javascript,css
```

**Response:**

```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "maintainer": "string", // User ID of the maintainer
    "skills": ["string"], // Array of skills
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
]
```

## Maintainer Features

### Projects

#### Create Project

**Endpoint:** `POST /api/maintainer/projects`

**Description:** Creates a new open source project. Accessible by Maintainers. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "status": "string" // e.g., "Open", "In Progress", "Closed"
}
```

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "maintainer": "string", // User ID of the maintainer
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
}
```

#### Get All Projects

**Endpoint:** `GET /api/maintainer/projects`

**Description:** Retrieves all projects created by the logged-in maintainer. Accessible by Maintainers and Contributors. Requires a valid token in the Authorization header.

**Response:**

```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "maintainer": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
]
```

#### Get Project by ID

**Endpoint:** `GET /api/maintainer/projects/:id`

**Description:** Retrieves a single project by its ID. Accessible by Maintainers and Contributors. Requires a valid token in the Authorization header.

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "maintainer": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0,
  "hasChat": "boolean" // Indicates if a chat exists for this project
}
```

#### Update Project by ID

**Endpoint:** `PUT /api/maintainer/projects/:id`

**Description:** Updates a project by its ID. Accessible by Maintainers who own the project. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "status": "string" // e.g., "Open", "In Progress", "Closed"
}
```

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "maintainer": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
}
```

#### Delete Project by ID

**Endpoint:** `DELETE /api/maintainer/projects/:id`

**Description:** Deletes a project by its ID. Accessible by Maintainers who own the project. Requires a valid token in the Authorization header.

**Response:**

```json
{
  "id": "string" // ID of the deleted project
}
```

### Issues

#### Get All Issues

Gets a list of all issues across all projects.

**URL:** `/api/maintainer/issues`
**Method:** `GET`
**Authentication:** Required (Maintainer)

**Success Response:**
*   **Code:** `200 OK`
*   **Content:** `[ { ...issue object... }, ... ]`

**Issue Object Fields:**
*   `_id` (string): The issue ID.
*   `project` (object): The project the issue belongs to.
*   `title` (string): The title of the issue.
*   `description` (string): A description of the issue.
*   `status` (string): The current status of the issue (e.g., 'Open', 'Closed').
*   `priority` (string): The priority of the issue (e.g., 'High', 'Medium', 'Low').
*   `createdBy` (object): The user who created the issue.
*   `createdAt` (string): The timestamp when the issue was created.
*   `updatedAt` (string): The timestamp when the issue was last updated.
*   `__v` (number): Version key.

#### Create Issue

**Endpoint:** `POST /api/maintainer/projects/:projectId/issues`

**Description:** Creates a new issue for a specific project. Accessible by Maintainers and Contributors. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "status": "string", // e.g., "Open", "In Progress", "Resolved"
  "priority": "string" // e.g., "Low", "Medium", "High"
}
```

**Response:**

```json
{
  "_id": "string",
  "project": "string", // Project ID the issue belongs to
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "createdBy": "string", // User ID of the creator
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
}
```

#### Get All Issues for a Project

**Endpoint:** `GET /api/maintainer/projects/:projectId/issues`

**Description:** Retrieves all issues for a specific project. Accessible by Maintainers and Contributors. Requires a valid token in the Authorization header.

**Response:**

```json
[
  {
    "_id": "string",
    "project": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "priority": "string",
    "createdBy": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
]
```

#### Get Issue by ID for a Project

**Endpoint:** `GET /api/maintainer/projects/:projectId/issues/:issueId`

**Description:** Retrieves a single issue by its ID for a specific project. Accessible by Maintainers and Contributors. Requires a valid token in the Authorization header.

**Response:**

```json
{
  "_id": "string",
  "project": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "createdBy": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0,
  "hasChat": "boolean" // Indicates if a chat exists for this issue
}
```

#### Update Issue by ID for a Project

**Endpoint:** `PUT /api/maintainer/projects/:projectId/issues/:issueId`

**Description:** Updates an issue by its ID for a specific project. Accessible by Maintainers and Contributors. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "status": "string", // e.g., "Open", "In Progress", "Resolved"
  "priority": "string" // e.g., "Low", "Medium", "High"
}
```

**Response:**

```json
{
  "_id": "string",
  "project": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "createdBy": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
}
```

#### Delete Issue by ID for a Project

**Endpoint:** `DELETE /api/maintainer/projects/:projectId/issues/:issueId`

**Description:** Deletes an issue by its ID for a specific project. Accessible by Maintainers who own the project. Requires a valid token in the Authorization header.

**Response:**

```json
{
  "id": "string" // ID of the deleted issue
}
#### Get All Issues (Maintainer)

**Endpoint:** `GET /api/maintainer/issues`

**Description:** Retrieves all issues across all projects for the logged-in maintainer. Accessible by Maintainers. Requires a valid token in the Authorization header.

**Response:**

```json
[
  {
    "_id": "string",
    "project": "string", // Project ID the issue belongs to
    "title": "string",
    "description": "string",
    "status": "string",
    "priority": "string",
    "createdBy": "string", // User ID of the creator
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
]
```
## Contribution Tracking

### Get Total Contribution Counts

**Endpoint:** `GET /api/users/:userId/contributions/counts`

**Description:** Retrieves the total contribution counts for a specific user (maintainer or contributor).

**Access:** Private (Requires a valid token in the Authorization header)

**URL Parameters:**

- `userId`: (Required) The ID of the user whose contribution counts are requested.

**Response:**

```json
{
  "totalContributions": "number", // Sum of relevant contribution events based on user role
  "projectContributions": "number" // Count of projects created by the user (only relevant for maintainers)
}
```

### Get Contribution Events

**Endpoint:** `GET /api/users/:userId/contributions`

**Description:** Retrieves a paginated list of contribution events for a specific user.

**Access:** Private (Requires a valid token in the Authorization header)

**URL Parameters:**

- `userId`: (Required) The ID of the user whose contribution events are requested.

**Query Parameters:**

- `page`: (Optional) The page number for pagination (default: 1).
- `limit`: (Optional) The number of events per page (default: 10).

**Response:**

```json
{
  "contributionEvents": [
    {
      "_id": "string",
      "user": "string", // User ID who performed the action
      "project": { // Populated Project object
        "_id": "string",
        "title": "string",
        // ... other project fields
      },
      "eventType": "string", // e.g., 'maintainer_issue_created', 'contributor_issue_resolved', 'maintainer_project_created'
      "eventDetails": { // Details specific to the event type
        // ... e.g., issueId, issueTitle, projectId, projectTitle
      },
      "timestamp": "string",
      "__v": 0
    }
  ],
  "totalCount": "number", // Total number of contribution events for the user
  "currentPage": "number",
  "totalPages": "number"
}
```

## Chat

### Send Project Message

**Endpoint:** `POST /api/chat/project/:projectId`

**Description:** Sends a message to the chat for a specific project. Accessible by project maintainers and contributors associated with issues in the project. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "content": "string"
}
```

**Response:**

```json
{
  "_id": "string",
  "sender": {
    "_id": "string"
  },
  "project": "string",
  "content": "string",
  "timestamp": "string"
}
```

### Get Project Messages

**Endpoint:** `GET /api/chat/project/:projectId`

**Description:** Retrieves all messages for a specific project chat. Accessible by project maintainers and contributors associated with issues in the project. Requires a valid token in the Authorization header.

**Response:**

```json
[
  {
    "_id": "string",
    "sender": {
      "_id": "string"
    },
    "project": "string",
    "content": "string",
    "timestamp": "string"
  }
]
```

### Send Issue Message

**Endpoint:** `POST /api/chat/issue/:issueId`

**Description:** Sends a message to the chat for a specific issue. Accessible by the issue reporter and the maintainer of the project the issue belongs to. Requires a valid token in the Authorization header.

**Request Body:**

```json
{
  "content": "string"
}
```

**Response:**

```json
{
  "_id": "string",
  "sender": {
    "_id": "string"
  },
  "issue": "string",
  "content": "string",
  "timestamp": "string"
}
```

### Get Issue Messages

**Endpoint:** `GET /api/chat/issue/:issueId`

**Description:** Retrieves all messages for a specific issue chat. Accessible by the issue reporter and the maintainer of the project the issue belongs to. Requires a valid token in the Authorization header.

**Response:**

```json
[
  {
    "_id": "string",
    "sender": {
      "_id": "string"
    },
    "issue": "string",
    "content": "string",
    "timestamp": "string"
  }
]
```

## Admin APIs

These APIs are for administrative purposes and currently have no authentication or token checks.

### Dashboard Pie Chart Data

**Endpoint:** `GET /api/admin/dashboard/pie-chart`

**Description:** Retrieves counts of total contributors, maintainers, projects, and issues for the admin dashboard pie chart.

**Response:**

```json
{
  "totalContributors": "number",
  "totalMaintainers": "number",
  "totalProjects": "number",
  "totalIssues": "number"
}
```

### Get All Contributors

**Endpoint:** `GET /api/admin/contributors`

**Description:** Retrieves a list of all contributors with their ID and name.

**Response:**

```json
[
  {
    "_id": "string",
    "firstName": "string",
    "lastName": "string"
  }
]
```

### Get Contributor Details by ID

**Endpoint:** `GET /api/admin/contributors/:id`

**Description:** Retrieves the full details of a specific contributor by ID.

**Response:**

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "contributor",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
  // ... other potential user fields
}
```

### Get All Maintainers

**Endpoint:** `GET /api/admin/maintainers`

**Description:** Retrieves a list of all maintainers with their ID and name.

**Response:**

```json
[
  {
    "_id": "string",
    "firstName": "string",
    "lastName": "string"
  }
]
```

### Get Maintainer Details by ID

**Endpoint:** `GET /api/admin/maintainers/:id`

**Description:** Retrieves the full details of a specific maintainer by ID.

**Response:**

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "maintainer",
  "createdAt": "string",
  "updatedAt": "string",
  "__v": 0
  // ... other potential user fields
}
```

### Search Contributors

**Endpoint:** `GET /api/admin/contributors/search`

**Description:** Searches for contributor users based on name, email, or skills. Accessible by Admin. Requires a valid token in the Authorization header.

**Query Parameters:**

- `name`: (Optional) A string to search for in contributor names (case-insensitive partial match).
- `email`: (Optional) A string to search for in contributor emails (case-insensitive partial match).
- `skills`: (Optional) A comma-separated string of skills to filter by. Contributors must possess all specified skills to be included in the results.

**Example Request:**

```
GET /api/admin/contributors/search?name=john&skills=javascript,react
```

**Response:**

```json
[
  {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "contributor",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
]
```

### Search and Filter Maintainers

**Endpoint:** `GET /api/admin/maintainers/search`

**Description:** Searches and filters maintainer users based on provided criteria. Accessible by Admins. Requires a valid token in the Authorization header.

**Query Parameters:**

- `query`: (Optional) A string to search for in first name, last name, or email.
- `firstName`: (Optional) Filter by first name (case-insensitive).
- `lastName`: (Optional) Filter by last name (case-insensitive).
- `email`: (Optional) Filter by email (case-insensitive).
- `startDate`: (Optional) Filter by registration date on or after this date (YYYY-MM-DD).
- `endDate`: (Optional) Filter by registration date on or before this date (YYYY-MM-DD).
- `lastLoginStartDate`: (Optional) Filter by last login date on or after this date (YYYY-MM-DD).
- `lastLoginEndDate`: (Optional) Filter by last login date on or before this date (YYYY-MM-DD).

**Example Request:**

```
GET /api/admin/maintainers/search?query=john&startDate=2023-01-01&lastLoginEndDate=2024-12-31
```

**Response:**

```json
[
  {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "maintainer",
    "date": "string",
    "lastLogin": "string"
  }
]
```

### Delete Maintainer

**Endpoint:** `DELETE /api/admin/maintainers/:id`

**Description:** Deletes a maintainer user by ID. Accessible by Admins. Requires a valid token in the Authorization header.

**URL Parameters:**

- `id`: (Required) The ID of the maintainer to delete.

**Response:**

```json
{
  "message": "Maintainer deleted successfully"
}
```

### Delete Contributor

**Endpoint:** `DELETE /api/admin/contributors/:id`

**Description:** Deletes a contributor user by their ID. Accessible by Admins. (Authentication not implemented as per instructions)

**URL Parameters:**

- `id`: (Required) The ID of the contributor to delete.

**Response:**

```json
{
  "message": "Contributor removed successfully"
}
```

### Export Contributors

**Endpoint:** `GET /api/admin/contributors/export`

**Description:** Exports all contributor data, including portfolio details, in CSV format. Accessible by Admin. Requires a valid token in the Authorization header.

**Access:** Admin

**Response:** A CSV file containing contributor data.

```csv
_id,name,email,createdAt,updatedAt,skills,githubUrl,linkedinUrl,websiteUrl,bio
```
