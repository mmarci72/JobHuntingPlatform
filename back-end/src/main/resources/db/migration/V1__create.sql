CREATE TYPE seniority as ENUM
(
    'INTERN',
	'JUNIOR',
	'SENIOR',
	'PROFESSIONAL',
	'ANY'
);

CREATE TYPE role as ENUM
(
	'SOFTWARE_ENGINEER',
	'TESTER',
	'PROJECT_MANAGER',
	'SOLUTION_ARCHITECT',
	'REQUIREMENT_ENGINEER'
);

CREATE TYPE industry_domain as ENUM
(
	'BANKING',
	'GROWTH_MARKETS',
	'T_AND_I',
	'PUBLIC_SECTOR',
	'INSURANCE'
);

CREATE CAST (varchar AS seniority) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS role) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS industry_domain) WITH INOUT AS IMPLICIT;


CREATE TABLE company
(
	id                   serial PRIMARY KEY,
	name                 VARCHAR(255),
	description          VARCHAR(255),
	founded              DATE,
	location             VARCHAR(255),
	size_min             INT,
	size_max             INT,
	industry_domain_name industry_domain,
	logo_file_name       varchar(255),
	creation_date        DATE DEFAULT now()
);


CREATE TABLE position
(
	position_id                  serial    PRIMARY KEY,
	company_id                   INT       NOT NULL,
	position_name                text 	   NOT NULL,
	start_date                   DATE,
	seniority_name               seniority NOT NULL,
	role_name                    role 	   NOT NULL,
	requirements_description     text 	   NOT NULL,
	position_description		     text 	   NOT NULL,
	responsibilities_description text 	   NOT NULL,
	salary_min					 INT 	   NOT NULL,
	salary_max					 INT,
	post_date                    DATE 	   DEFAULT now(),
	FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE position_technologies
(
	technology_id 	serial 		 PRIMARY KEY,
	position_id   	INT    		 NOT NULL,
	name 			varchar(255) NOT NULL
);

CREATE TABLE position_languages
(
	language_id 	serial 		 PRIMARY KEY,
	position_id   	INT    		 NOT NULL,
	name 			varchar(255) NOT NULL
);

CREATE TABLE technology
(
    id          serial PRIMARY KEY,
	position_id INT,
	name		varchar(255),
	FOREIGN KEY (position_id) REFERENCES position (position_id)

);

CREATE TABLE application
(
	id                serial       PRIMARY KEY,
	position_id       INT          NOT NULL,
	first_name	      varchar(255) NOT NULL,
	last_name	      varchar(255) NOT NULL,
	username          varchar(255) NOT NULL,
	email             varchar(255) NOT NULL,
	phone_number	  varchar(255) NOT NULL,
	linkedin	      varchar(255),
	github		      varchar(255),
	cover_letter_path varchar(255) NOT NULL,
	application_date  varchar(255) DEFAULT now(),
	FOREIGN KEY (position_id) REFERENCES position (position_id)
);

CREATE TABLE preference
(
	username    varchar(255) PRIMARY KEY,
	preferences jsonb
);

CREATE TABLE resume (
	id       serial PRIMARY KEY,
	username text	NOT NULL,
	resume_name  text NOT NULL
);

CREATE TABLE interests
(
	id          serial       PRIMARY KEY,
	position_id INT          NOT NULL,
	username    varchar(255) NOT NULL,
	unique (position_id, username)
);

CREATE TABLE user_notification
(
	username                   varchar(255) PRIMARY KEY,
	email_notification_enabled boolean,
	push_notification_enabled  boolean
);

CREATE TABLE subscription
(
	username          varchar(255) PRIMARY KEY,
	push_subscription jsonb
);

CREATE TABLE notification_queue
(
	position_id INT PRIMARY KEY
);
