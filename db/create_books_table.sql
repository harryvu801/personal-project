create table if not exists Books (
id serial primary key,
title varchar(50),
author varchar(30),
isbn integer check(isbn > 999999999999),
class varchar (10),
condition text not null,
imgurl varchar(300)
)