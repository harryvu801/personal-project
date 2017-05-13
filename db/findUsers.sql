select * from users
join userbooks on userbooks.user_id = users.id
join books on books.bid = userbooks.book_id
where book_id = $1
