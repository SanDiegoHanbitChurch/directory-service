# directory-service

Hanbit Directory Service is a facade/BFF for Hanbit Directory App (both web and mobile).
It acts as a proxy for [Planning Center](https://www.planningcenter.com/), where all Hanbit members are registered and maintained.

## Environments

| Environment | Host |
|-------------|------|
| Dev         | https://us-central1-hanbit-directory-dev.cloudfunctions.net/ |

## URLs

| Method | Route                          | Status Code / Response         | Note                                   |
| ------ | -------------------------------| -------------------------------| -------------------------------------- |
| GET    | /v1/members                    | 200 Member[]                   | returns all members                    |
| GET    | /v1/members/:id                | 200 Member <br> 404 Not Found  | returns a specific member or not found |
| GET    | /v1/members?query=searchTerm   | 200 Member[]                   | returns matching members or empty result |

## Response Schema

### Member

| Field | Type | Required |
|-------|------|----------|
| id    | uuid | yes      |
| name  | string | yes    |
| avatar | string (url) | yes |
| phone | string |  no |
| email | string |  no |
| address | Address | no |

## How to debug

- `npm run build:watch`: Typescript build in watch mode
- `firebase emulators:start --inspect-functions`: Start firebase emulator with debug mode
- Click on "Debug" profile on VS Code
- Hit http://localhost:5001/hanbit-directory-dev/us-central1/members from Postman
