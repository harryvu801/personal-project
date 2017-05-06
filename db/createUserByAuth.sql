insert into users (first_name, last_name, email, authid) values ($1, $2, $3, $4) returning first_name, last_name, email, authid
