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
	"unitOrder" serial NOT NULL,
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
	"contentOrder" serial NOT NULL,
	"isSurvey" BOOLEAN DEFAULT FALSE,
	"isRequired" BOOLEAN DEFAULT FALSE,
	CONSTRAINT "content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_content" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"content_id" integer NOT NULL,
	"isComplete" BOOLEAN DEFAULT FALSE,
	"media" varchar(300),
	"comment" TEXT,
	CONSTRAINT "users_content_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "lessons" (
	"id" serial NOT NULL,
	"units_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"lessonOrder" serial NOT NULL,
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
	"cohorts_id" integer DEFAULT 1,
	"user_id" integer NOT NULL,
	CONSTRAINT "users_cohorts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users_content" ADD CONSTRAINT "users_content_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "users_content" ADD CONSTRAINT "users_content_fk1" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE;


ALTER TABLE "lessons" ADD CONSTRAINT "lessons_fk0" FOREIGN KEY ("units_id") REFERENCES "units"("id") ON DELETE CASCADE;

ALTER TABLE "users_units" ADD CONSTRAINT "users_units_fk0" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "users_units" ADD CONSTRAINT "users_units_fk1" FOREIGN KEY ("units_id") REFERENCES "units"("id") ON DELETE CASCADE;

ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk0" FOREIGN KEY ("cohorts_id") REFERENCES "cohorts"("id") ON DELETE CASCADE;
ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "content" ADD CONSTRAINT "content_fk0" FOREIGN KEY ("lessons_id") REFERENCES "lessons"("id") ON DELETE CASCADE;

INSERT INTO "units" ("name", "subtitle")
VALUES('Unit 1', 'Age 0-3 Months'), ('Unit 2', 'Age 4-6 Months'), ('Unit 3', 'Age 7-9 Months'), ('Unit 4', 'Age 10-12 Months'), ('Prenatal Course', 'The first months of life with your baby');


INSERT INTO "lessons" ("name", "description", "units_id")
VALUES('Speech, Language and Play', 'Speech, Language and Play', 1), ('ABCs for Grown Ups', 'Affirmations for Well-Being: Attitude', 1), ('New Parent Advice', 'Learning about your baby cries', 1), ('ABCs for Grown Ups', 'Affirmations for Well-Being: Beautiful', 2), ('Fine Motor/Sensory', 'Small details are essential for stimulation', 2), ('ABCs for Grown-Ups', 'Affirmations for Well-Being: Care', 2);


INSERT INTO "content" ("content", "title", "description", "isSurvey", "isRequired", "lessons_id")
VALUES ('Video 1', 'Speech', 'Speech is important in a baby life', false, true, 1), ('Video 2', 'Play', 'Play is so important', false, true, 1), ('Survey 1', 'End of Lesson Survey', 'Please complete after the lesson', true, false, 1), ('Video 1', 'Vision', 'Engaging the baby gaze', false, true, 2), ('Video 2', 'Gross Motor', 'Testing the full range of motion', false, true, 2), ('Survey 1', 'End of Lesson Survey', 'Please complete after the lesson', true, false, 2), ('Video 1', 'Play Based Learning', 'How to engage with their surroundings', false, true, 3), ('Video 2', 'School Readiness', 'Basic learning strategies', false, true, 3), ('Survey 1', 'End of Lesson Survey', 'Please complete after the lesson', true, false, 3);

INSERT INTO "users" ("email", "password", "firstName", "lastName", "access", "organization" )
VALUES ('thisbabyknows@gmail.com', '$2a$10$cY0xmRTmMIOEvpWg4cH0c.HabDOSGZdnO6/QJfovDBhtsgJpxqfkC', 'Baby', 'Know', 3, 'BabyKnow');

insert into users (email, password, "firstName", "lastName", access, organization) values ('kgreatbatch0@bbc.co.uk', 'Vlf86NuAed', 'Kerby', 'Greatbatch', 0, 'Universidad de Ciencias y Humanidades');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gvonderdell1@google.ru', 'n3Nm9z1X', 'Gunilla', 'Vonderdell', 0, 'Saitama Medical School');
insert into users (email, password, "firstName", "lastName", access, organization) values ('cmccloch2@list-manage.com', 'xBzhmS', 'Cleo', 'McCloch', 0, 'University of the Netherlands Antilles, Curacao');
insert into users (email, password, "firstName", "lastName", access, organization) values ('schopping3@github.com', 'AVqIzAvjmT0', 'Shandee', 'Chopping', 0, 'Deutsch-Ordens Fachhochschule Riedlingen, Hochschule für Wirtschaft');
insert into users (email, password, "firstName", "lastName", access, organization) values ('nkrzyzanowski4@ca.gov', '1GTCBYm7d', 'Nissie', 'Krzyzanowski', 0, 'Indian Institute of Technology, Roorkee');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hbaack5@zdnet.com', 'ZC4hsckszJ', 'Hinda', 'Baack', 0, 'Suez Canal University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('kwilden6@unicef.org', 'B4dpLPNR', 'Kittie', 'Wilden', 0, 'Universidad Católica Nuestra Senora de la Asunción');

INSERT INTO "cohorts" ("name")
VALUES ('BabyKnow');

INSERT INTO "cohorts" ("name")
VALUES
 ('Amethyst'), 
 ('Childbirth Education'), 
 ('Ms. Johnson 1st Period'),
 ('Community Education'),
 ('Parent-Child Coalition'), 
 ('All Parents Together'),
 ('Mr. Talagio 2nd Period Health'),
 ('Health Class @ MNHS');

INSERT INTO "users_cohorts" ("cohorts_id", "user_id")
VALUES (1, 1), (2, 2), (3, 3), (1, 4), (2, 5), (3, 6), (1, 7);

INSERT INTO "users_units" ("users_id", "units_id")
VALUES(4, 1), (5, 1), (4, 2);

--USERS: New Registrants--

insert into users (email, password, "firstName", "lastName", access, organization) values ('mwenban7@amazon.co.uk', 'lkZeuKyF', 'Maximilianus', 'Wenban', 0, 'Université Euro-Afrique');
insert into users (email, password, "firstName", "lastName", access, organization) values ('dhaglington8@pbs.org', '4HSvGsxWx24', 'Doria', 'Haglington', 0, 'Agricultural University of Tirane');
insert into users (email, password, "firstName", "lastName", access, organization) values ('bbiddlestone9@usda.gov', 'HBWtnWjN6', 'Bentley', 'Biddlestone', 0, 'Okinawa University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('cburnella@ebay.com', 'kkKBJyryeTSN', 'Conny', 'Burnell', 0, 'Baghdad College of Economic Sciences University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('boflahertyb@mysql.com', 'H9gP2c', 'Bern', 'O'' Flaherty', 0, 'Goucher College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hjosephsc@comcast.net', 'DNfbkyyj92P', 'Herb', 'Josephs', 0, 'Swansea Metropolitan University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('mkobesd@fc2.com', 'rDS53ank11', 'Marice', 'Kobes', 0, 'Webster University North Florida');
insert into users (email, password, "firstName", "lastName", access, organization) values ('bkermeene@unesco.org', 'nvYOCV', 'Barton', 'Kermeen', 0, 'Universidad de Bologna - Representación en Buenos Aires');
insert into users (email, password, "firstName", "lastName", access, organization) values ('medensorf@google.com.br', 'kgFB4xrST', 'Marybelle', 'Edensor', 0, 'Centro Regional Universitário de Espiríto Santo do Pinhal');
insert into users (email, password, "firstName", "lastName", access, organization) values ('rbeswetherickg@creativecommons.org', 'yEYfWT', 'Renee', 'Beswetherick', 0, 'Zayed University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('jwimpeyh@163.com', 'MnZNf2AVBp', 'Jacinta', 'Wimpey', 0, 'Tashkent State Technical University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('maylesburyi@si.edu', 'ZjwE0Mo7QD', 'Marcelo', 'Aylesbury', 0, 'Schiller International University, Heidelberg');
insert into users (email, password, "firstName", "lastName", access, organization) values ('moxshottj@mail.ru', '7hS0CUL', 'Melina', 'Oxshott', 0, 'University of Maine, Machias');
insert into users (email, password, "firstName", "lastName", access, organization) values ('ndahlbomk@newsvine.com', 'AdWPAyVihuD', 'Nicolas', 'Dahlbom', 0, 'Universidade Fernando Pessoa');
insert into users (email, password, "firstName", "lastName", access, organization) values ('rhanburyl@booking.com', 'ldRE7Ag5', 'Roseline', 'Hanbury', 0, 'Pennsylvania State University - Altoona');
insert into users (email, password, "firstName", "lastName", access, organization) values ('bmountjoym@toplist.cz', 'tpFzDFraW1dG', 'Birch', 'Mountjoy', 0, 'Viterbo College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('nalphegen@clickbank.net', 'cB4heXV', 'Nike', 'Alphege', 0, 'Islamic University College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('twildso@alibaba.com', 'TRzTYv', 'Tyler', 'Wilds', 0, 'University of Wollongong');
insert into users (email, password, "firstName", "lastName", access, organization) values ('mgreensidep@geocities.com', 'ccyGYY4Ht', 'Mufi', 'Greenside', 0, 'University of New South Wales');
insert into users (email, password, "firstName", "lastName", access, organization) values ('lcorrieaq@virginia.edu', 'MIiSrNHYk1K', 'Laura', 'Corriea', 0, 'Bangladesh University of Professionals');
insert into users (email, password, "firstName", "lastName", access, organization) values ('atrillor@fda.gov', 'AEJcCShdV', 'Alfonso', 'Trillo', 0, 'St. Petersburg State University of Technology and Design');
insert into users (email, password, "firstName", "lastName", access, organization) values ('rbuckseys@google.es', 'Y3yskrv', 'Raymond', 'Bucksey', 0, 'Oregon State University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('sbeevort@slate.com', 'FUQxb1Q', 'Salome', 'Beevor', 0, 'Blue Mountain College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('kdudneyu@miitbeian.gov.cn', 'lVYqEK', 'Kally', 'Dudney', 0, 'Melaka Islamic University College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('cbunyanv@1und1.de', '9FJNgBtjT', 'Chad', 'Bunyan', 0, 'North Ossetian State University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('dvosew@t-online.de', 'rgHYGD4CH2lF', 'Dominick', 'Vose', 0, 'Tashkent School of Finance');
insert into users (email, password, "firstName", "lastName", access, organization) values ('uhubbartx@biblegateway.com', 'laoJQppeGWS', 'Ursola', 'Hubbart', 0, 'Blackburn College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('claverenzy@networksolutions.com', 'JThyppGGLY', 'Cecile', 'Laverenz', 0, 'Universidad Autonoma del Sur');
insert into users (email, password, "firstName", "lastName", access, organization) values ('ksilversz@icio.us', 'sXw0Uocl2x', 'Kellen', 'Silvers', 0, 'Instituto Superior Politécnico Gaya');
insert into users (email, password, "firstName", "lastName", access, organization) values ('bwisson10@webmd.com', 'NMbjZvMFc', 'Buddy', 'Wisson', 0, 'Courtauld Institute of Art, University of London');
insert into users (email, password, "firstName", "lastName", access, organization) values ('fstpierre11@multiply.com', 'incqVBeB', 'Frieda', 'St. Pierre', 0, 'Swansea Metropolitan University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('tdelacroix12@cbslocal.com', 'KXQf81vgBVj', 'Trudy', 'Delacroix', 0, 'Tbilisi State Medical University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hsedgeman13@nbcnews.com', 'TbVVvL', 'Hally', 'Sedgeman', 0, 'Isfahan University of Technology');
insert into users (email, password, "firstName", "lastName", access, organization) values ('otakkos14@marriott.com', 'Lvp5ks3sLC', 'Olivette', 'Takkos', 0, 'Sido Kanhu Murmu University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('jgetsham15@wikispaces.com', '4stt5vLqwgdd', 'Jacquie', 'Getsham', 0, 'Libya Open University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('jcubuzzi16@engadget.com', 'KIH6cScIv', 'Jarrid', 'Cubuzzi', 0, 'Hajee Mohammad Danesh Science and Technology University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('chrinchishin17@harvard.edu', 'nY3nUMbqEoS', 'Cassandre', 'Hrinchishin', 0, 'Universitas Nasional Jakarta');
insert into users (email, password, "firstName", "lastName", access, organization) values ('ehubber18@flavors.me', '2tZctav7mL', 'Emile', 'Hubber', 0, 'Universidad de Puerto Rico, Arecibo');
insert into users (email, password, "firstName", "lastName", access, organization) values ('achell19@google.de', 'KFafcmPH2', 'Anne', 'Chell', 0, 'Targu-Mures University of Theatre');
insert into users (email, password, "firstName", "lastName", access, organization) values ('mbollum1a@ibm.com', 'LCpnl4FU', 'Mirelle', 'Bollum', 0, 'University of Dar Es Salaam');
insert into users (email, password, "firstName", "lastName", access, organization) values ('coles1b@kickstarter.com', '2pUAPut', 'Carri', 'Oles', 0, 'Universidad Monsenor Oscar Arnulfo Romeo');
insert into users (email, password, "firstName", "lastName", access, organization) values ('abane1c@rambler.ru', 'QzJzyI', 'Aretha', 'Bane', 0, 'Universidad Nacional Experimental de los Llanos Occidentales "Ezequiel Zamora"');
insert into users (email, password, "firstName", "lastName", access, organization) values ('afarady1d@hud.gov', 'D9Repi', 'Ara', 'Farady', 0, 'Argosy University - Hawaii');
insert into users (email, password, "firstName", "lastName", access, organization) values ('wtummons1e@illinois.edu', 'ZVbPoU', 'Wynnie', 'Tummons', 0, 'Sylhet International University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gpilgrim1f@bigcartel.com', '6kp2LdI', 'Grover', 'Pilgrim', 0, 'Kwangju University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('npoter1g@flickr.com', 'ynMxEKcy', 'Nikolas', 'Poter', 0, 'Kyrgyz State Technical University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('unewtown1h@google.cn', 'GbvY6ublP3x', 'Uta', 'Newtown', 0, 'Universitas Muhammadiyah Jember');
insert into users (email, password, "firstName", "lastName", access, organization) values ('jbeste1i@artisteer.com', 'qcNCOzg3', 'Jeannie', 'Beste', 0, 'Purbanchal University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gdoward1j@purevolume.com', 'vbJScF2uYp8n', 'Greer', 'Doward', 0, 'Institute for Advanced Studies Lucca');
insert into users (email, password, "firstName", "lastName", access, organization) values ('iellyatt1k@ihg.com', 'OzGoRJlwshy', 'Izak', 'Ellyatt', 0, 'Al Rasheed University College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('tjakubowski1l@va.gov', 'L374LJiyRX', 'Taryn', 'Jakubowski', 0, 'Concordia University, Austin');
insert into users (email, password, "firstName", "lastName", access, organization) values ('shuey1m@shareasale.com', 'dIX3Fu', 'Sebastian', 'Huey', 0, 'Illinois State University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gjentet1n@msu.edu', 'RINBKD', 'Glennis', 'Jentet', 0, 'Andong National University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('aguiver1o@adobe.com', 'RvkLBx', 'Arliene', 'Guiver', 0, 'Universidad del Noroeste');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hdarko1p@unesco.org', 'uP31goDI552', 'Hamilton', 'Darko', 0, 'Technical University of Kenya');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hdonne1q@miibeian.gov.cn', 'cVRQftZaAh', 'Hodge', 'Donne', 0, 'University of Southeastern Philippines');
insert into users (email, password, "firstName", "lastName", access, organization) values ('jkimmons1r@lycos.com', 'CLjkqFp7W7kY', 'Jemie', 'Kimmons', 0, 'Royal University of Phnom Penh');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hbernucci1s@tinyurl.com', 'ayaAFq', 'Hollyanne', 'Bernucci', 0, 'Technological University (Pathein)');
insert into users (email, password, "firstName", "lastName", access, organization) values ('dspittal1t@liveinternet.ru', 'fiA9bR', 'Druci', 'Spittal', 0, 'Academy of Economics in Katowice');
insert into users (email, password, "firstName", "lastName", access, organization) values ('psewley1u@topsy.com', 'mCtzQGDv2r5', 'Phillis', 'Sewley', 0, 'Shanghai Second Medical University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('sscholefield1v@linkedin.com', 'GYjv56f6Rzlb', 'Stanton', 'Scholefield', 0, 'Northern Virginia Community College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('tmitchenson1w@reference.com', 'JIVaA9c0wl', 'Thorn', 'Mitchenson', 0, 'Université Abdelmalek Essadi');
insert into users (email, password, "firstName", "lastName", access, organization) values ('bdobell1x@wufoo.com', 'RVgKazO', 'Barris', 'Dobell', 0, 'Mountain View College');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gperfect1y@jalbum.net', 'WQuMDs2rd', 'Gary', 'Perfect', 0, 'Nagasaki Prefectural University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('tpoundford1z@harvard.edu', 'fF748PFe', 'Tommi', 'Poundford', 0, 'Open University of Israel');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gruckert20@nifty.com', 'hJrZtOyXVd', 'Gibbie', 'Ruckert', 0, 'Suwon Catholic University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('kdriutti21@discuz.net', 'yKNrt0X8ql', 'Kiri', 'Driutti', 0, 'Universidad de Puerto Rico, Utuado');
insert into users (email, password, "firstName", "lastName", access, organization) values ('pamaya22@barnesandnoble.com', 'FaBx1bsT', 'Pegeen', 'Amaya', 0, 'Universidade Lusófona de Humanidades e Technologias');
insert into users (email, password, "firstName", "lastName", access, organization) values ('crodrigues23@columbia.edu', 'GTsWH07geE', 'Cherlyn', 'Rodrigues', 0, 'Ferdowsi University of Mashhad');
insert into users (email, password, "firstName", "lastName", access, organization) values ('aamyes24@drupal.org', 'vCKn6Sgdw5RU', 'Antonetta', 'Amyes', 0, 'Xi''an Academy of Fine Art');
insert into users (email, password, "firstName", "lastName", access, organization) values ('smullany25@china.com.cn', 'XC4lGJxKPFo6', 'Sal', 'Mullany', 0, 'Northwood University, Texas Campus');
insert into users (email, password, "firstName", "lastName", access, organization) values ('kgallaccio26@oracle.com', 'FfyOMF', 'Kerwinn', 'Gallaccio', 0, 'Universidad de Castilla La Mancha');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hjacobsz27@cmu.edu', 'TVCt4EjY', 'Haley', 'Jacobsz', 0, 'Tianjin Polytechnic University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('ostretton28@a8.net', 'jkI3YitIVlLQ', 'Olivette', 'Stretton', 0, 'Károl Gáspár University of the Reformed Church');
insert into users (email, password, "firstName", "lastName", access, organization) values ('ycordsen29@so-net.ne.jp', 'BA2oYXjSHq', 'Yvon', 'Cordsen', 0, 'Universitat de Lleida');
insert into users (email, password, "firstName", "lastName", access, organization) values ('nparrish2a@utexas.edu', '5tXRuNbMFz', 'Noreen', 'Parrish', 0, 'Universidad Andina del Cusco');
insert into users (email, password, "firstName", "lastName", access, organization) values ('kmilnthorpe2b@devhub.com', 'Q3Gqe2A32zo', 'Kerby', 'Milnthorpe', 0, 'Palm Beach Atlantic University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('adomenge2c@hexun.com', 'clck2lkbTaF', 'Agathe', 'Domenge', 0, 'University College of the Fraser Valley');
insert into users (email, password, "firstName", "lastName", access, organization) values ('ecarlesi2d@homestead.com', '6iNYJPEW8Qd', 'Ellary', 'Carlesi', 0, 'Université de Perpignan');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gdingsdale2e@blogger.com', 'CsUi0hU', 'Galen', 'Dingsdale', 0, 'Philadelphia College of Bible');
insert into users (email, password, "firstName", "lastName", access, organization) values ('mcoggell2f@google.it', 'YcnpkE', 'Margie', 'Coggell', 0, 'New York University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hrapinett2g@biblegateway.com', 'mYVXEP7u0GZP', 'Hillel', 'Rapinett', 0, 'Universidad de Sevilla');
insert into users (email, password, "firstName", "lastName", access, organization) values ('bolohan2h@accuweather.com', 's0EkkPnkt', 'Bailie', 'Olohan', 0, 'Liaoning University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('syearns2i@shutterfly.com', 'DI2xJ8', 'Solly', 'Yearns', 0, 'Darul Takzim Institute of Technology');
insert into users (email, password, "firstName", "lastName", access, organization) values ('gollander2j@eventbrite.com', 'UZwnP5vc', 'Gustav', 'Ollander', 0, 'Saginaw Valley State University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('jlatehouse2k@netscape.com', 'JVPsGau', 'Jake', 'Latehouse', 0, 'Immaculata University');
insert into users (email, password, "firstName", "lastName", access, organization) values ('hackerman2l@gnu.org', 'dyTrpc', 'Hurleigh', 'Ackerman', 0, 'Islamic Azad University, Karaj');
insert into users (email, password, "firstName", "lastName", access, organization) values ('baslin2m@boston.com', 'QraqLWs1OwTs', 'Barnabas', 'Aslin', 0, 'University of Sassari');
insert into users (email, password, "firstName", "lastName", access, organization) values ('agudgion2n@joomla.org', 'W6o8E8LSC', 'Amara', 'Gudgion', 0, 'University of Connecticut Health Center');
insert into users (email, password, "firstName", "lastName", access, organization) values ('lsnooks2o@nytimes.com', 'wGvBzR82eNTX', 'Lacee', 'Snooks', 0, 'Perm State Academy of Agriculture');
insert into users (email, password, "firstName", "lastName", access, organization) values ('lwhitemarsh2p@go.com', 'GIFBfQiS7fs', 'Lukas', 'Whitemarsh', 0, 'Norwegian State Academy of Music');
insert into users (email, password, "firstName", "lastName", access, organization) values ('btallman2q@people.com.cn', 'x87k56HI', 'Beatrisa', 'Tallman', 0, 'Universiteit Doesburg (UNDO)');
insert into users (email, password, "firstName", "lastName", access, organization) values ('bfittall2r@whitehouse.gov', 'nykFgLqhaok', 'Burl', 'Fittall', 0, 'University of Minnesota - Duluth');

