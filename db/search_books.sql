select * from books
where lower(title) like lower($1) or lower(author) like lower($1) or lower(class) like lower($1)
