INSERT INTO company (name, founded, location, size_min , size_max, industry_domain)
VALUES ('Company 1', '1999-02-13', 'Budapest, Hungary', 130, 250, 'GROWTH_MARKETS');
INSERT INTO company (name, founded, location, size_min , size_max, industry_domain)
VALUES ('Company 2', '2002-06-20', 'Eger, Hungary', 10, 30, 'INSURANCE');
INSERT INTO company (name, founded, location, size_min , size_max, industry_domain)
VALUES ('Company 3', '2000-02-13', 'Budapest, Hungary', 1000, 1500, 'BANKING');

INSERT INTO position(company_id, position_name, start_date, seniority, role, requirements_description, offer_description,
                     responsibilities_description, salary_min, salary_max)
VALUES (0, 'Expert Backend Engineer', '2024-05-20', 'SENIOR', 'SOFTWARE_ENGINEER',
        'Some description goes here that will be much longer than this',
        'Offer description goes here..............',
        'Write clean code ;)', 1500000, 1700000);
INSERT INTO position(company_id, position_name, start_date, seniority, role, requirements_description, offer_description,
					 responsibilities_description, salary_min, salary_max)
VALUES (0, 'Tech Squad Lead', '2024-06-21', 'PROFESSIONAL', 'PROJECT_MANAGER',
		'Some description goes here that will be much longer than this',
		'Offer description goes here..............',
		'Manage team', 1500000, 1700000);
INSERT INTO position(company_id, position_name, start_date, seniority, role, requirements_description, offer_description,
					 responsibilities_description, salary_min)
VALUES (1, 'Java Developer', '2024-03-10', 'JUNIOR', 'SOFTWARE_ENGINEER',
		'Some description goes here that will be much longer than this',
		'Offer description goes here..............',
		'Coding', 800000);
INSERT INTO position(company_id, position_name, start_date, seniority, role, requirements_description, offer_description,
					 responsibilities_description, salary_min)
VALUES (2, 'Test Engineer', '2024-03-10', 'INTERN', 'TESTER',
		'Some description goes here that will be much longer than this',
		'Offer description goes here..............',
		'Test stuff', 400000);


INSERT INTO technology(position_id, name)
VALUES (0,'Spring');
INSERT INTO technology(position_id, name)
VALUES (0,'Javascript');
INSERT INTO technology(position_id, name)
VALUES (0,'Backend');
INSERT INTO technology(position_id, name)
VALUES (1,'Backend');
INSERT INTO technology(position_id, name)
VALUES (1,'Python');
INSERT INTO technology(position_id, name)
VALUES (1,'Typescript');
INSERT INTO technology(position_id, name)
VALUES (2,'Java');
INSERT INTO technology(position_id, name)
VALUES (3,'Testing');



INSERT INTO interests(position_id, userName)
values (1, 'ujvarim')
