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
	"content" varchar(400) NOT NULL UNIQUE,
	"title" varchar(200) NOT NULL UNIQUE,
	"description" varchar(350) NOT NULL,
	"isSurvey" BOOLEAN NOT NULL,
	"isRequired" BOOLEAN NOT NULL,
	CONSTRAINT "content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "lessons_content" (
	"id" serial NOT NULL,
	"lessons_id" integer NOT NULL,
	"content_id" integer NOT NULL,
	"contentOrder" integer NOT NULL,
	CONSTRAINT "lessons_content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_lessons_content" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"lessons_content_id" integer NOT NULL,
	"isComplete" BOOLEAN NOT NULL,
	"media" varchar(300) NOT NULL,
	"comment" TEXT NOT NULL,
	CONSTRAINT "users_lessons_content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "lessons" (
	"id" serial NOT NULL,
	"units_id" integer NOT NULL REFERENCES "units" ON DELETE CASCADE,
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







ALTER TABLE "lessons_content" ADD CONSTRAINT "lessons_content_fk0" FOREIGN KEY ("lessons_id") REFERENCES "lessons"("id");
ALTER TABLE "lessons_content" ADD CONSTRAINT "lessons_content_fk1" FOREIGN KEY ("content_id") REFERENCES "content"("id");

ALTER TABLE "users_lessons_content" ADD CONSTRAINT "users_lessons_content_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_lessons_content" ADD CONSTRAINT "users_lessons_content_fk1" FOREIGN KEY ("lessons_content_id") REFERENCES "lessons_content"("id");

ALTER TABLE "lessons" ADD CONSTRAINT "lessons_fk0" FOREIGN KEY ("units_id") REFERENCES "units"("id");

ALTER TABLE "users_units" ADD CONSTRAINT "users_units_fk0" FOREIGN KEY ("users_id") REFERENCES "users"("id");
ALTER TABLE "users_units" ADD CONSTRAINT "users_units_fk1" FOREIGN KEY ("units_id") REFERENCES "units"("id");

ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk0" FOREIGN KEY ("cohorts_id") REFERENCES "cohorts"("id");
ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");