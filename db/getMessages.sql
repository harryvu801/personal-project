select * from messages
join users on messages.recipient = users.id
where sender = $1 
