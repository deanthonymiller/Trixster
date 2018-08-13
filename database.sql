-- CREATE TABLE person (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR (80) UNIQUE NOT NULL,
--     password VARCHAR (1000) NOT NULL
-- );

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL
);

CREATE TABLE "questions" (
    "id" SERIAL PRIMARY KEY,
    "question_text" VARCHAR (1000) NOT NULL,
    "person_id" INT REFERENCES "user"
);

CREATE TABLE "response" (
    "id" SERIAL PRIMARY KEY,
    "comments" VARCHAR (1000) NOT NULL,
    "person_id" INT REFERENCES "user",
    "questions_id" INT REFERENCES "questions"
);
