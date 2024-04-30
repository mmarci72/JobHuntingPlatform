ALTER SEQUENCE company_id_seq RESTART WITH 1;
ALTER SEQUENCE position_position_id_seq RESTART WITH 1;

INSERT INTO company (name, founded, location, size_min , size_max, industry_domain_name, logo_file_name)
VALUES ('Secret Sauce Partners, Inc.', 2010, 'Budapest, Hungary', 20, 50, 'GROWTH_MARKETS', 'secret-sauce-logo.jpg');
INSERT INTO company (name, founded, location, size_min , size_max, industry_domain_name, logo_file_name)
VALUES ('Company 2', 2002, 'Eger, Hungary', 10, 30, 'INSURANCE', 'mbh-logo.jpg');
INSERT INTO company (name, founded, location, size_min , size_max, industry_domain_name, logo_file_name)
VALUES ('Company 3', 2000, 'Budapest, Hungary', 1000, 1500, 'BANKING', 'metro-logo.jpg');

INSERT INTO position(company_id, position_name, start_date, seniority_name, role_name, requirements_description, position_description,
                     responsibilities_description, salary_min, salary_max)
VALUES (1, 'Senior Frontend Engineer', '2024-05-20', 'SENIOR', 'SOFTWARE_ENGINEER',
        'Must-haves

- At least 5 years experience in frontend development positions
- Experience with modern frontend frameworks, especially with React
- Ability to build things from scratch
- Fluency with web technologies
- An eye for a good product and user experience
- A strong notion of clean code and good coding practices
- A strong testing culture
Bonus points

- Experience with modern frontend frameworks (such as Svelte)
- You have done cross-site JavaScript development
- You have used cloud services before
- You mentored fellow colleagues and helped them improve their skills
- You are active on GitHub and have contributed back to open-source projects',
        'We are looking for a Senior Frontend Engineer to grow our team where there is room for everyone to improve their core skills and also get better at mentoring and leadership. ' ||
        'The Senior Frontend Engineer role is part of our frontend team; the team responsible for building, running, and maintaining all the frontend aspects of our services. ' ||
        'As a member of a small team, you must be experienced in some areas to be productive from day one.
         Everything else is fair game and you will have the opportunity to learn on the job.',
        '1. Build and maintain the next generation of our frontend library.
2. Maintain our existing frontend integration written in React/Redux.
3. Participate in architecture discussions and contribute to technical and architectural decision-making
4. Collaborate with Product Management to define and iterate to develop and perfect our products
5. Improve your own and your fellow developers'' skills through design kick-offs, pairing sessions, and code reviews', 1500000, 1700000);
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
VALUES (1, 'Expert Frontend Engineer', '2024-05-20', 'EXPERT', 'SOFTWARE_ENGINEER',
		'Must-haves

- At least 5 years experience in frontend development positions
- Experience with modern frontend frameworks, especially with React
- Ability to build things from scratch
- Fluency with web technologies
- An eye for a good product and user experience
- A strong notion of clean code and good coding practices
- A strong testing culture
Bonus points

- Experience with modern frontend frameworks (such as Svelte)
- You have done cross-site JavaScript development
- You have used cloud services before
- You mentored fellow colleagues and helped them improve their skills
- You are active on GitHub and have contributed back to open-source projects',
		'We are looking for an Expert Frontend Engineer to grow our team where there is room for everyone to improve their core skills and also get better at mentoring and leadership. ' ||
		'The Expert Frontend Engineer role is part of our frontend team; the team responsible for building, running, and maintaining all the frontend aspects of our services. ' ||
		'As a member of a small team, you must be experienced in some areas to be productive from day one. ' ||
		'Everything else is fair game and you will have the opportunity to learn on the job.',
		'1. Build and maintain the next generation of our frontend library.
2. Maintain our existing frontend integration written in React/Redux.
3. Participate in architecture discussions and contribute to technical and architectural decision-making
4. Collaborate with Product Management to define and iterate to develop and perfect our products
5. Improve your own and your fellow developers skills through design kick-offs, pairing sessions, and code reviews', 1500000, 1700000);
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

INSERT INTO technology(position_id, name)
VALUES (1,'Redux');
INSERT INTO technology(position_id, name)
VALUES (1,'AWS');
INSERT INTO technology(position_id, name)
VALUES (1,'Git');
INSERT INTO technology(position_id, name)
VALUES (1,'REST');
INSERT INTO technology(position_id, name)
VALUES (1,'Svelte');
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
(1,'Redux'),
(1,'AWS'),
(1,'Git'),
(1,'REST'),
(1,'Svelte'),
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
(1, 'Hungarian'),
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

