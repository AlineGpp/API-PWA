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


create table people_program(
	people integer not null, 
	program integer not null, 
	foreign key (people) references people (id),
	foreign key (program) references program (id)
)