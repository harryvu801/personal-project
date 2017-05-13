insert into users (first_name, last_name, email, pic, authid) values ($1, $2, $3, $4, $5) returning id, first_name, last_name, email, imgurl, authid
