 CREATE TABLE "cohorts" (
	"id" serial NOT NULL,
	"name" varchar(150) NOT NULL UNIQUE,
	CONSTRAINT "cohorts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"access" integer NOT NULL,
	"organization" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "units" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"unitOrder" integer NOT NULL,
	"subtitle" varchar(255) NOT NULL,
	CONSTRAINT "units_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "content" (
	"id" serial NOT NULL,
	"lessons_id" integer NOT NULL,
	"content" varchar(400) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" varchar(350) NOT NULL,
	"contentOrder" integer NOT NULL,
	"isSurvey" BOOLEAN NOT NULL,
	"isRequired" BOOLEAN,
	CONSTRAINT "content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users_content" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"content_id" integer NOT NULL,
	"isComplete" BOOLEAN NOT NULL,
	"media" varchar(300) NOT NULL,
	"comment" TEXT NOT NULL,
	CONSTRAINT "users_content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "lessons" (
	"id" serial NOT NULL,
	"units_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"lessonOrder" integer NOT NULL,
	CONSTRAINT "lessons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users_units" (
	"id" serial NOT NULL,
	"users_id" integer NOT NULL,
	"units_id" integer NOT NULL,
	CONSTRAINT "users_units_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users_cohorts" (
	"id" serial NOT NULL,
	"cohorts_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "users_cohorts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users_content" ADD CONSTRAINT "users_content_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_content" ADD CONSTRAINT "users_content_fk1" FOREIGN KEY ("content_id") REFERENCES "content"("id");

ALTER TABLE "lessons" ADD CONSTRAINT "lessons_fk0" FOREIGN KEY ("units_id") REFERENCES "units"("id") ON DELETE CASCADE;

ALTER TABLE "users_units" ADD CONSTRAINT "users_units_fk0" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "users_units" ADD CONSTRAINT "users_units_fk1" FOREIGN KEY ("units_id") REFERENCES "units"("id");

ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk0" FOREIGN KEY ("cohorts_id") REFERENCES "cohorts"("id");
ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "content" ADD CONSTRAINT "content_fk0" FOREIGN KEY ("lessons_id") REFERENCES "lessons"("id") ON DELETE CASCADE;

INSERT INTO "units" ("name", "unitOrder", "subtitle")
VALUES('Unit 1', 1, 'describe unit 1'), ('Unit 2', 2, 'this is about unit 2');

INSERT INTO "lessons" ("name", "description", "lessonOrder", "units_id")
VALUES('Lesson 1', '1st description', 1, 1), ('Lesson 2', 'description for 2', 2, 1), ('Lesson 3', 'about lesson 3', 3, 1);

INSERT INTO "content" ("content", "title", "description", "contentOrder", "isSurvey", "isRequired", "lessons_id")
VALUES ('Video 1', 'Video 1', 'about the first video', 1, false, false, 1), ('Video 2', 'Video 2', 'describe second video', 2, false, false, 1), ('Survey 1', 'Survey 1', 'about the first survey', 3, true, false, 1);

INSERT INTO "users" ("email", "password", "firstName", "lastName", "access", "organization" )
VALUES ('babyknow@baby.com', 'Babyknow', 'Baby', 'Know', 3, 'BabyKnow'), ('pimpin@baby.com', 'Pimpin', 'Snoop', 'Dogg', 0, 'LA'), ('heisenberg@baby.com', 'Science', 'Walter', 'White', 0, 'Chemistry'), ('bigboned@baby.com', 'HippyHater', 'Eric', 'Cartman', 0, 'Shakeys'), ('middleearth@baby.com', 'Myprecious', 'Bilbo', 'Baggins', 0, 'Burglar'), ('coach@baby.com', 'Tenessewhiskey', 'Ted', 'Lasso', 0, 'Richmond FC');