INSERT INTO company (name, founded, location, size_min , size_max, industry_domain_name, logo_file_name)
VALUES ('Company 1', 1999, 'Budapest, Hungary', 130, 250, 'GROWTH_MARKETS', 'ing-logo.webp');
INSERT INTO company (name, founded, location, size_min , size_max, industry_domain_name, logo_file_name)
VALUES ('Company 2', 2002, 'Eger, Hungary', 10, 30, 'INSURANCE', 'mbh-logo.webp');
INSERT INTO company (name, founded, location, size_min , size_max, industry_domain_name, logo_file_name)
VALUES ('Company 3', 2000, 'Budapest, Hungary', 1000, 1500, 'BANKING', 'metro-logo.webp');

INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
                     responsibilities_description, salary_min, salary_max)
VALUES (1, 'Expert Backend Engineer', '2024-05-20', 'SENIOR', 'SOFTWARE_ENGINEER',
        'Some description goes here that will be much longer than this',
        'position description goes here..............',
        'Write clean code ;)', 1500000, 1700000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min, salary_max)
VALUES (1, 'Tech Squad Lead', '2024-06-21', 'PROFESSIONAL', 'PROJECT_MANAGER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Manage team', 1500000, 1700000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min)
VALUES (2, 'Java Developer', '2024-03-10', 'JUNIOR', 'SOFTWARE_ENGINEER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Coding', 800000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min)
VALUES (3, 'Test Engineer', '2024-03-10', 'INTERN', 'TESTER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Test stuff', 400000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min)
VALUES (3, 'Test Engineer', '2024-03-10', 'INTERN', 'TESTER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Test stuff', 400000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min)
VALUES (3, 'Test Engineer', '2024-03-10', 'INTERN', 'TESTER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Test stuff', 400000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min, salary_max)
VALUES (1, 'Expert Backend Engineer', '2024-05-20', 'SENIOR', 'SOFTWARE_ENGINEER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Write clean code ;)', 1500000, 1700000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min, salary_max)
VALUES (1, 'Expert Backend Engineer', '2024-05-20', 'SENIOR', 'SOFTWARE_ENGINEER',
		'- 6+ years of software development experience in JVM stack
- Confidence in SQL – preferably MySQL
- Big Data and Microservice architecture experience is a plus
- Excellent communication and analytical skills
- Experience with CI (Jenkins), and cloud environments - preferably AWS',
		'At Instructure, we believe in the power of people to grow and succeed throughout their lives. Our goal is to amplify that power by creating intuitive products that simplify learning and personal development, facilitate meaningful relationships, and inspire people to go further in their education and careers. We do this by giving smart, creative, passionate people opportunities to create awesome. And that''s where you come in:

We are building the education platform of the future. As part of this platform, we own a product called Impact, which is responsible for providing analytics for schools and institutions about educational tool usage, and ways to improve the adoption rate for certain features with unique communication channels and support automation. On top of this
',
		'- Re-imagining an existing analytics product based on a modern tech stack and architecture
- Build up the service in AWS on top of JVM (Java, or Kotlin)
- Take ownership of the components created, by using Instructure#39;s CI/CD and monitoring tooling
- Working with an awesome multi-national team that has a strong presence in the Budapest office
',
        1500000, 1700000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min, salary_max)
VALUES (1, 'Expert Backend Engineer', '2024-05-20', 'SENIOR', 'SOFTWARE_ENGINEER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Write clean code ;)', 1500000, 1700000);
INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
					 responsibilities_description, salary_min, salary_max)
VALUES (1, 'Expert Backend Engineer', '2024-05-20', 'SENIOR', 'SOFTWARE_ENGINEER',
		'Some description goes here that will be much longer than this',
		'position description goes here..............',
		'Write clean code ;)', 1500000, 1700000);


INSERT INTO technology(position_id, name)
VALUES (1,'Spring');
INSERT INTO technology(position_id, name)
VALUES (1,'Javascript');
INSERT INTO technology(position_id, name)
VALUES (1,'Backend');
INSERT INTO technology(position_id, name)
VALUES (2,'Backend');
INSERT INTO technology(position_id, name)
VALUES (2,'Python');
INSERT INTO technology(position_id, name)
VALUES (2,'Typescript');
INSERT INTO technology(position_id, name)
VALUES (3,'Java');
INSERT INTO technology(position_id, name)
VALUES (4,'Testing');



INSERT INTO interests(position_id, userName)
values (1, 'ujvarim');


INSERT INTO position_technologies (position_id, name)
VALUES
(1, 'JavaScript'),
(1, 'React'),
(2, 'Python'),
(2, 'Django'),
(2, 'C#'),
(3, 'Java'),
(3, 'Spring Boot'),
(3, '.NET'),
(3, 'PHP'),
(5, 'Laravel'),
(6, 'Ruby'),
(6, 'Rails'),
(7, 'TypeScript'),
(7, 'Angular'),
(8, 'Swift'),
(8, 'iOS SDK'),
(9, 'Kotlin'),
(9, 'Android SDK'),
(9, 'SQL'),
(9, 'PostgreSQL');

INSERT INTO position_languages (position_id, name)
VALUES
(1, 'English'),
(1, 'French'),
(2, 'Hungarian'),
(2, 'English'),
(3, 'English'),
(3, 'Italian'),
(4, 'Hungarian'),
(4, 'German'),
(5, 'Russian'),
(6, 'English'),
(7, 'English'),
(8, 'English'),
(9, 'English');

