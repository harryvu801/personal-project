create table if not exists Books (
bid serial primary key,
title varchar(50),
author varchar(50),
isbn integer check(isbn > 999999999999),
summary text,
publisher varchar(50),
subject varchar(30),
imgurl varchar(300),
)
