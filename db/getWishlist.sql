select * from wishlist
join books on wishlist.book_id = books.bid
where user_id = $1
