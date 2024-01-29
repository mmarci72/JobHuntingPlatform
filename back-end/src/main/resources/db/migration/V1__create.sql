CREATE TYPE seniority as ENUM
(
    'INTERN'
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

CREATE TABLE project
(
	id            serial PRIMARY KEY,
	name          VARCHAR(255),
	description   VARCHAR(255),
	technologies  VARCHAR(255),
	creation_date DATE,
	unit_name     varchar(255),
	FOREIGN KEY (unit_name) REFERENCES unit (name)
);

CREATE TABLE preference
(
	username    varchar(255) PRIMARY KEY,
	preferences jsonb
);

CREATE TABLE project_position
(
	position_id              serial PRIMARY KEY,
	project_id               INT          NOT NULL,
	seniority_name           varchar(255) NOT NULL,
	role_name                varchar(255) NOT NULL,
	number_of_open_positions INT,
	farming                  INT,
	start_date               DATE,
	post_date                DATE,
	FOREIGN KEY (project_id) REFERENCES project (id),
	FOREIGN KEY (seniority_name) REFERENCES seniority (name),
	FOREIGN KEY (role_name) REFERENCES role (name)
);

CREATE TABLE comment
(
	id            serial PRIMARY KEY,
	position_id   INT          NOT NULL,
	data          varchar(255) NOT NULL,
	creation_date varchar(255) NOT NULL,
	username      varchar(255) NOT NULL,
	full_name     varchar(255) NOT NULL,
	FOREIGN KEY (position_id) REFERENCES project_position (position_id)
);

CREATE TABLE interests
(
	id          serial PRIMARY KEY,
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
