select * from messages
join users on messages.sender = users.id
where recipient = $1
