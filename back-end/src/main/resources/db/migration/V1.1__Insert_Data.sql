INSERT INTO unit (name)
values ('BANKING');
INSERT INTO unit (name)
values ('GROWTH_MARKETS');
INSERT INTO unit (name)
values ('T_AND_I');
INSERT INTO unit (name)
values ('PUBLIC_SECTOR');
INSERT INTO unit (name)
values ('INSURANCE');

INSERT INTO project (name, description, creation_date, technologies, unit_name)
VALUES ('Project 1',
		'Desc 1',
		'2022-01-01', 'Java, Angular', 'BANKING');
INSERT INTO project (name, description, creation_date, technologies, unit_name)
VALUES ('Project 2',
		'Desc 2',
		'2022-04-10', 'Spring, React, OpenShift', 'GROWTH_MARKETS');
INSERT INTO project (name, description, creation_date, technologies, unit_name)
VALUES ('Project 3',
		'Desc 3',
		'2023-01-12', 'Java, Spring, Angular, Azure', 'INSURANCE');

INSERT INTO project_position(project_id, seniority_name, role_name, number_of_open_positions, farming,
							 start_date, post_date)
VALUES (1, 'SENIOR', 'SOFTWARE_ENGINEER', 1, 100, '2023-02-01', '2023-01-23');
INSERT INTO project_position(project_id, seniority_name, role_name, number_of_open_positions, farming,
							 start_date, post_date)
VALUES (2, 'PROFESSIONAL', 'SOFTWARE_ENGINEER', 2, 60, '2023-02-10', '2022-01-20');
INSERT INTO project_position(project_id, seniority_name, role_name, number_of_open_positions, farming,
							 start_date, post_date)
VALUES (3, 'SENIOR', 'SOLUTION_ARCHITECT', 1, 80, '2023-01-12', '2023-01-03');
INSERT INTO project_position(project_id, seniority_name, role_name, number_of_open_positions, farming,
							 start_date, post_date)
VALUES (2, 'JUNIOR', 'REQUIREMENT_ENGINEER', 1, 100, '2023-02-20', '2022-01-20');
INSERT INTO project_position(project_id, seniority_name, role_name, number_of_open_positions, farming,
							 start_date, post_date)
VALUES (1, 'ANY', 'SOFTWARE_ENGINEER', 1, 20, '2023-02-01', '2023-01-23');

INSERT INTO comment(position_id, data, creation_date, userName, full_name)
VALUES (1, 'I can only recommend this project', '2022-02-03', 'ujvmarcell', 'Marcell Újvári');
INSERT INTO comment(position_id, data, creation_date, userName, full_name)
VALUES (2, 'This project is a little bit overwhelming, but might be for you if you are up for the challenge', '2023-04-03',
		'user', 'Test User');
INSERT INTO comment(position_id, data, creation_date, userName, full_name)
VALUES (3, 'I really enjoy working on this project', '2022-08-03', 'ujvarim', 'Marcell Újvári');

INSERT INTO interests(position_id, userName)
values (1, 'ujvarim')
