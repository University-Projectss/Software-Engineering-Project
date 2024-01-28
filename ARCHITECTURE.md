**Date:** 2024-01-22  
**Commit:** 0a85840

# Purpose

This is an online platform for a virtual medical clinic. Patients can create
tickets detailing their symptoms or queries. These tickets will be promptly
assigned to specialized doctors based on their availability and expertise.
Subsequently, doctors will provide comprehensive medical records, prescribe
necessary medications, or offer guidance on refining the ticket's
specialization, even referring patients to other specialists when needed.
Furthermore, they can share informative medical articles to empower and educate
patients.

As of the date of this document, the platform has achieved MVP status.

- Patients can create, edit, and close tickets, and doctors can respond to and reassign tickets.
- The medical specialty is inferred from the ticket description, powered by the OpenAI API.
- Registration and authentication is also implemented.

Planned features:

- Patient and doctor profiles
- Admin functionality
- Ticket attachments
- Ticket thread
- Blog

# Running

The codebase has a backend server and a frontend client.
The client requires the server to function.

## Backend

**Requirements:** Docker, Java 21, JWT key pair, OpenAI key  
Initial setup:

- Copy the `.env.example` file to `.env` and configure it with your secrets and API keys.
- Generate a key pair for JWT authentication:
  ```sh
  openssl genrsa -out src/main/resources/jwt.key 4096
  openssl rsa -in src/main/resources/jwt.key -pubout -outform PEM -out src/main/resources/jwt.pub
  ```

Start the database:

```sh
docker-compose up
```

Start the Spring server:

```sh
./gradlew bootRun
```

## Frontend

**Requirements:** Node  
Initial setup: `npm install`  
Start the client:

```sh
npm run start
```

## Building

Build the server:

```sh
./gradlew bootJar
```

The output is a JAR in `build/libs/`, which can be run using `java -jar`.

Build the client:

```sh
npm run build
```

The output is in `build/` and can be served statically.

# Entry points

When running locally, the client is accessible in a browser at `http://localhost:3000`.
The server uses port `8080` by default and can be communicated with at `http://localhost:8080`.

### Configuration

Environment variables containing secrets and API keys are defined in `backend/.env` and read by Spring and Docker.  
The server configuration is found in `backend/src/main/application.properties`.
The database container is configured in `backend/compose.yaml`.

# High level diagram of the architecture

## Data journey

![Screenshot](documentation/diagrama.png)

# Testing

## Backend

The backend contains unit tests that verify the behavior of most endpoints. To run the tests, execute `./gradlew test`.
Note that the database container needs to be running.

Most tests follow the structure:

- Create a test account and obtain an authentication token
- Insert test data into the database
- Perform a mock request to an endpoint
- Verify the response and the database state

Since almost every endpoint requires authentication, the `RequestTester` class assists with the boilerplate of creating
a test account and profile and performing authenticated request.

## Frontend

The frontend contains unit tests to make sure that the tickets are rendered correctly. More precisely, we ensure that the tickets displays the right information, the 3-dots menu behave
as expected, the tabs are styled as they should be and the case with no tickets is well handled.

Exemple of Ticket test structure:

- Create a mock ticket
- Render the ticket and check if the necessary content is displayed
- Render the ticket again and check if the 3-dots menu is initially closed and that it became visible after is clicked.

To run the tests, execute `npm run test`.

# CI

We use GitHub Actions for CI.  
The backend and the frontend each have a pipeline. The pipelines set up the environment, build the projects, and run
tests. This allows us to catch regressions before merging changes.

# Dependencies

## Backend

The server uses the Spring Boot framework, and most dependencies are Spring-related. The others are a Postgres JDBC
driver, Lombok, and an OpenAI API helper.

In addition, we make use of OpenAI's Chat Completions API to infer medical specialty from a patient-provided description
of their symptoms.

**Vulnerability:** The OpenAI API helper is less trustworthy and less important than the other dependencies and should
potentially be vendored or replaced with an in-house implementation.

## Frontend

- **React** for building user interface
- **Chackra UI, styled, framer-motion** for styling.
- **Axios** for API calls.
- **React Router** for routing.
- **Jest** for testing
- **React Icons** for icons
