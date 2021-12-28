# directory-service

Hanbit Directory Service is a facade/BFF for Hanbit Directory App (both web and mobile).
It acts as a proxy for [Planning Center](https://www.planningcenter.com/), where all Hanbit members are registered and maintained.

## URLs

GET /members - returns all members
GET /members/id - returns a specific member or not found

## How to debug

* `npm run build:watch`: Typescript build in watch mode
* `firebase emulators:start --inspect-functions`: Start firebase emulator with debug mode
* Click on "Debug" profile on VS Code
* Hit http://localhost:5001/hanbit-directory-dev/us-central1/members from Postman
