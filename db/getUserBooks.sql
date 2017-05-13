select * from userbooks
join books on userbooks.book_id = books.bid
where user_id = $1
