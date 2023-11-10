# Job hunting site

## Aim of the project

The application aims to simplify the job hunting and recruitment process for job seekers and recruiters.
When done, it will provide a simple interface where recruiters can easily post new job opportunities for their company and see all the applicant for the open positions and job seekers can apply for a job with a click of a button.

Recruiters can:

- post new jobs
- manage applicants
- manage existing jobs
- receive automatic emails when there is a new application for a job

Employees can:

- browse job postings
- subscribe to email and push notifications
- manage their notification preferences
- upload their resume
- apply to jobs

## Used technologies

The project uses the following technology stack:

- Java Spring for the back-end
- Angular for the front-end
- PostgreSQL for the database
- Flyway for database migrations
- Mailhog for intercepting email messages
- Keycloak for authentication and authorization management
- Docker for containerizing the above services
  
## Steps for building the project

To build the project, Docker and Java 19 have to be previously installed.

Take the following simple steps:

1. Clone this repository
2. From the root of the project run `./gradlew back-end:assemble`
3. From the root of the project run `docker compose up --build -d`
4. Once the build is complete, the following ports will be in use:
	- 80: Angular front-end
	- 8081: Spring back-end
	- 8090: keycloak admin console
	- 8025: mailhog web ui


