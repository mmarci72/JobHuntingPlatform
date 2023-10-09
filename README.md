# Project Opportunities

## Aim of the project

The project aims to help employees browse and manage available opportunities within the company.

When first visiting the page, you'll have to register with your username and a preferred password.
If you are a Career Coach then you'll automatically get the necessary role for the website.

Career Coaches can:

- add new projects
- add new positions
- manage existing positions

Employees can:

- browse projects and positions
- subscribe to email and push notifications
- manage their notification preferences
- sign up to positions, notifying the employee's career coach by doing so

## Used technologies

The project uses the following technology stack:

- Java Spring for the back-end
- Angular for the front-end
- PostgreSQL for the database
- Flyway for database migrations
- Mailhog for intercepting email messages
- Keycloak for authentication and authorization management
- Docker for containerizing the above services
- Azure Container Registry for storing docker images
- LDAP to get information of employees from their username and to automatically authenticate Career Coaches

## Steps for building the project

To build the project, Docker and Java 19 have to be previously installed.

Take the following simple steps:

1. Clone this repository
2. From the root of the project run `./gradlew back-end:assemble`
3. From the root of the project run `docker compose up --build -d`
4. Once the build is complete, the following ports will be in use:
	- 80: Angular front-end
	- 8080: Spring back-end
	- 8090: keycloak admin console
	- 8025: mailhog web ui


