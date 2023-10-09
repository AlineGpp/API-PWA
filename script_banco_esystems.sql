create table program (
   id integer not null primary key, 
   description varchar (50) not null,
   fulldescription text, 
   image text, 
   alert character,
   address text
);

create table people (
	id integer not null primary key,
	name varchar (50) not null,
	sex character,
	address varchar (100) not null,
	complement varchar (30) not null,
	district varchar (30) not null,
	zip_code varchar (8) not null,
	telephone varchar (10) not null,
	celular varchar (10) not null,
	e_mail varchar (40) not null,
    profession 	 integer,
	login varchar (15) not null,
	password varchar (50) not null,
	people_type character
)


CREATE TABLE people_program (
    people INTEGER NOT NULL, 
    program INTEGER NOT NULL, 
    FOREIGN KEY (people) REFERENCES people (id),
    FOREIGN KEY (program) REFERENCES program (id),
    PRIMARY KEY (people, program)
);
