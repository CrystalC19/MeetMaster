# MeetMaster

## Overview
MeetMaster is a full-stack web application designed to manage events. Users can create, read, update, and delete events through a RESTful API. The backend is built with Node.js, Express, and MongoDB, and the frontend is integrated to interact seamlessly with the backend using GraphQL.

## Features
 - Create Events: Users can create new events by providing details such as name, date, location, and description.
 - Read Events: Users can retrieve a list of all events or a single event by its ID.
 - Update Events: Users can update details of an existing event.
 - Delete Events: Users can delete events using their ID.
 - GraphQL Integration: Provides a GraphQL API endpoint for interacting with the backend.
 - Authentication: JWT-based authentication to secure API endpoints.

## Technology Used
 - Node.js
 - Express.js
 - MongoDB with Mongoose
 - Apollo Server (GraphQL)
   
Frontend
  - 
  - 
  - 
  - 
Other Tools
  - 
  - 
  - 
  - 
## Getting Started

### Prerequisites
Ensure you have the following installed:
  - Node.js (v14+)
  - MongoDB (local installation or MongoDB Atlas)
  - Git

### Installation
  1. Clone the repository
     ```bash
     git clone https://github.com/yourusername/MeetMaster.git
     cd MeetMaster
  2. Install server dependencies:
     ```bash
     cd server
     npm install
  3. Set up environment variables
     ```bash
     MONGODB_URI=mongodb://localhost:27017/meetMaster
     JWT_SECRET=your_jwt_secret
     PORT=3001
Replace `MONGODB_URI` with your MongoDB connection string if using MongoDB Atlas.

### Running the Application
  1. Start the MongoDB server

     If using a local MongoDB installation
     ```bash
     mongod
  2. Run the Server
     ```bash
     node server.js
  The server should start, and you should see an output confirming the API server is running on the specified port.
  3. Testing the API
Use Postman or cURL to test the CRUD operations:
 - Create Event: POST /api/events
 - Get All Events: GET /api/events
 - Get Event by ID: GET /api/events/:id
 - Update Event: PUT /api/events/:id
 - Delete Event: DELETE /api/events/:id

### GraphQL Endpoint
The GraphQL API is available at:
   ```bash
   http://localhost:3001/graphql
```
If enabled, you can interact with it using a GraphQL client like Apollo Client or the GraphQL Playground.

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code is well-documented and follows the existing coding conventions.
