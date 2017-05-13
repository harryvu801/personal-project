create table if not exists users (
id serial primary key,
first_name varchar(20),
last_name varchar(30),
email varchar(50),
imgurl varchar(200),
authid text
)
